const fs = require("fs");
const path = require("path");

const dir = path.join(process.cwd(), ".lighthouseci");
if (!fs.existsSync(dir)) {
  console.error("No .lighthouseci directory found. Run `npm run lhci:ci` first.");
  process.exit(1);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"))
  .map((f) => path.join(dir, f));

if (!files.length) {
  console.error("No LHCI LHR files found in .lighthouseci/.");
  process.exit(1);
}

function load(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function topOpps(lhr, limit = 8) {
  const audits = lhr.audits || {};
  return Object.values(audits)
    .filter((a) => a && a.details && a.details.type === "opportunity" && a.details.overallSavingsMs)
    .sort((a, b) => b.details.overallSavingsMs - a.details.overallSavingsMs)
    .slice(0, limit);
}

function show(lhr) {
  console.log(`\n=== ${lhr.finalUrl} ===\n`);
  for (const a of topOpps(lhr)) {
    const ms = Math.round(a.details.overallSavingsMs);
    console.log(`- ${a.title} — est savings: ${ms}ms`);
    const items = a.details.items || [];
    const offenders = items
      .map((it) => it.url || it.source || (it.node && it.node.snippet))
      .filter(Boolean)
      .slice(0, 5);
    for (const o of offenders) console.log(`    • ${o}`);
  }
}

const lh = files.map(load);
const home = lh.find((l) => {
  if (!l.finalUrl) return false;
  try {
    const url = new URL(l.finalUrl);
    return url.pathname === "/";
  } catch {
    return false;
  }
});
const product = lh.find((l) => {
  if (!l.finalUrl) return false;
  try {
    const url = new URL(l.finalUrl);
    return url.pathname === "/products/mens-boxer-brief-black";
  } catch {
    return false;
  }
});

if (home) show(home);
if (product) show(product);
