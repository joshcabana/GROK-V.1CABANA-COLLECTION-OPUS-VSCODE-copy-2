const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const writeBaseline = args.includes('--write-baseline');
const presetArg = args.find((arg) => arg.startsWith('--preset='));
const preset = presetArg ? presetArg.split('=')[1] : process.env.CABANA_LHCI_PRESET || '';
const normalizedPreset = preset === 'mobile' || preset === 'desktop' ? preset : '';
const lhciPort = Number(process.env.CABANA_LHCI_PORT || 3000);

const lighthouseDir = path.join(process.cwd(), '.lighthouseci');
const manifestPath = path.join(lighthouseDir, 'manifest.json');
let manifestEntries = [];
if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifestEntries = manifest
    .filter((entry) => entry.jsonPath && fs.existsSync(entry.jsonPath))
    .map((entry) => ({
      url: entry.url,
      jsonPath: entry.jsonPath,
      source: 'manifest',
    }));
}

const collectFromLhrFiles = () => {
  const files = fs
    .readdirSync(lighthouseDir)
    .filter((name) => name.startsWith('lhr-') && name.endsWith('.json'))
    .map((name) => path.join(lighthouseDir, name));

  const entries = [];
  for (const jsonPath of files) {
    try {
      const lhr = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const url = lhr.finalUrl || lhr.requestedUrl;
      if (!url) continue;
      entries.push({ url, jsonPath, source: 'lhr' });
    } catch {
      // skip unreadable LHR files
    }
  }
  return entries;
};

const isLhciTargetUrl = (url) =>
  !!url &&
  (url.startsWith(`http://localhost:${lhciPort}`) || url.startsWith(`http://127.0.0.1:${lhciPort}`));

let entries = manifestEntries.filter((entry) => isLhciTargetUrl(entry.url));

if (!entries.length) {
  entries = collectFromLhrFiles().filter((entry) => isLhciTargetUrl(entry.url));
}

if (!entries.length) {
  console.error(`No LHCI JSON entries for localhost:${lhciPort} found in manifest or LHR files.`);
  process.exit(1);
}

const getFormFactor = (lhr) =>
  lhr.configSettings?.extraHeaders?.['x-lhci-preset'] ||
  lhr.configSettings?.formFactor ||
  lhr.configSettings?.emulatedFormFactor ||
  lhr.configSettings?.settings?.formFactor ||
  'unknown';

const safeRead = (entry) => {
  try {
    const lhr = JSON.parse(fs.readFileSync(entry.jsonPath, 'utf8'));
    if (!lhr.categories || !lhr.categories.performance) return null;
    return lhr;
  } catch {
    return null;
  }
};

const metrics = (lhr) => {
  const audits = lhr.audits;
  return {
    performance: lhr.categories.performance.score,
    accessibility: lhr.categories.accessibility?.score,
    seo: lhr.categories.seo?.score,
    bestPractices: lhr.categories['best-practices']?.score,
    fcp: audits['first-contentful-paint']?.displayValue,
    lcp: audits['largest-contentful-paint']?.displayValue,
    tbt: audits['total-blocking-time']?.displayValue,
    cls: audits['cumulative-layout-shift']?.displayValue,
  };
};

const isValidScore = (score) => typeof score === 'number' && Number.isFinite(score);

const prepared = entries
  .map((entry) => ({ entry, mtime: fs.statSync(entry.jsonPath).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime)
  .map(({ entry, mtime }) => {
    const lhr = safeRead(entry);
    if (!lhr) return null;
    const formFactor = getFormFactor(lhr);
    if (normalizedPreset && formFactor !== normalizedPreset) return null;
    return {
      entry,
      mtime,
      metrics: metrics(lhr),
    };
  })
  .filter(Boolean);

if (!prepared.length) {
  const label = normalizedPreset ? `${normalizedPreset}` : 'all';
  console.error(`No LHCI JSON entries matched preset "${label}".`);
  process.exit(1);
}

const groupedByUrl = new Map();
for (const candidate of prepared) {
  if (!groupedByUrl.has(candidate.entry.url)) {
    groupedByUrl.set(candidate.entry.url, []);
  }
  groupedByUrl.get(candidate.entry.url).push(candidate);
}

const unstableRoutes = [];
const missingScoreRoutes = [];
const selected = [];

for (const [url, candidates] of groupedByUrl.entries()) {
  const validCount = candidates.filter((candidate) => isValidScore(candidate.metrics.performance)).length;
  const latestValid = candidates.find((candidate) => isValidScore(candidate.metrics.performance)) || null;

  selected.push(latestValid || candidates[0]);

  if (validCount !== candidates.length) {
    unstableRoutes.push({ url, validCount, total: candidates.length });
  }

  if (!latestValid) {
    missingScoreRoutes.push({ url, total: candidates.length });
  }
}

if (unstableRoutes.length) {
  console.warn('Some LHCI runs returned invalid performance scores; using the latest valid run per route.');
  unstableRoutes.forEach(({ url, validCount, total }) => {
    console.warn(`${url} valid runs: ${validCount}/${total}`);
  });
}

const summary = selected.map(({ entry, metrics }) => ({
  url: entry.url,
  metrics,
}));

const outputDir = path.join(process.cwd(), 'reports', 'lighthouse');
fs.mkdirSync(outputDir, { recursive: true });

const suffix = normalizedPreset ? `.${normalizedPreset}` : '';
const baselinePath = path.join(outputDir, `baseline${suffix}.json`);
let baseline = null;
if (fs.existsSync(baselinePath)) {
  baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
}

const normaliseRouteKey = (rawUrl) => {
  try {
    const parsed = new URL(rawUrl);
    const pathname = parsed.pathname.replace(/\/+$/, '');
    return pathname || '/';
  } catch {
    return String(rawUrl || '');
  }
};

const baselineByRoute = new Map(
  (baseline || []).map((entry) => [normaliseRouteKey(entry.url), entry.metrics]),
);

const compare = (current, base) => {
  if (!base) return '';
  if (!isValidScore(current.performance) || !isValidScore(base.performance)) return 'n/a';
  const delta = (current.performance - base.performance).toFixed(2);
  const sign = Number(delta) > 0 ? '+' : '';
  return `${sign}${delta}`;
};

const dashboardLines = [];
dashboardLines.push('# Lighthouse Performance Dashboard');
dashboardLines.push('');
dashboardLines.push(`Generated: ${new Date().toISOString()}`);
dashboardLines.push('');
dashboardLines.push('| URL | Perf | A11y | SEO | BP | FCP | LCP | TBT | CLS | Δ Perf |');
dashboardLines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |');

summary.forEach((item) => {
  const base = baselineByRoute.get(normaliseRouteKey(item.url)) || null;
  const delta = compare(item.metrics, base);
  dashboardLines.push(
    `| ${item.url} | ${item.metrics.performance} | ${item.metrics.accessibility} | ${item.metrics.seo} | ${item.metrics.bestPractices} | ${item.metrics.fcp} | ${item.metrics.lcp} | ${item.metrics.tbt} | ${item.metrics.cls} | ${delta} |`
  );
});

const dashboardPath = path.join(outputDir, `dashboard${suffix}.md`);
fs.writeFileSync(dashboardPath, dashboardLines.join('\n'));

if (writeBaseline) {
  fs.writeFileSync(baselinePath, JSON.stringify(summary, null, 2));
  console.log(`Baseline written to ${baselinePath}`);

  if (missingScoreRoutes.length) {
    console.warn('Baseline includes routes missing valid performance scores:');
    missingScoreRoutes.forEach(({ url, total }) => {
      console.warn(`${url} valid runs: 0/${total}`);
    });
  }
}

console.log(`Dashboard written to ${dashboardPath}`);

if (!writeBaseline && baseline) {
  const missingScores = summary
    .map((item) => {
      const base = baselineByRoute.get(normaliseRouteKey(item.url));
      if (!base || !isValidScore(base.performance)) return null;
      if (isValidScore(item.metrics.performance)) return null;
      return { url: item.url };
    })
    .filter(Boolean);

  const drops = summary
    .map((item) => {
      const base = baselineByRoute.get(normaliseRouteKey(item.url));
      if (!base) return null;
      if (!isValidScore(item.metrics.performance) || !isValidScore(base.performance)) return null;
      return {
        url: item.url,
        delta: item.metrics.performance - base.performance,
      };
    })
    .filter(Boolean)
    .filter((item) => item.delta <= -0.03);

  if (missingScores.length || drops.length) {
    console.error('Performance regression detected:');
    missingScores.forEach((item) => console.error(`${item.url} missing valid performance score`));
    drops.forEach((d) => console.error(`${d.url} Δ ${d.delta.toFixed(2)}`));
    process.exit(2);
  }
}
