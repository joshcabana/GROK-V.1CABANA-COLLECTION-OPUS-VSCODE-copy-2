#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');

const root = process.cwd();
const notesPath = path.join(root, 'docs', 'operations', 'session-notes.md');
const releaseJsonPath = path.join(root, 'reports', 'releases', 'latest.json');
const liveInspectionPath = path.join(root, 'reports', 'releases', 'live-inspection.latest.md');
const visualInspectionPath = path.join(root, 'reports', 'releases', 'visual-inspection.latest.md');

const run = (command) => cp.execSync(command, { cwd: root, encoding: 'utf8' }).trim();
const exists = (p) => fs.existsSync(p);

const now = new Date();
const timestamp = now.toLocaleString('en-AU', {
  timeZone: 'Australia/Sydney',
  hour12: false,
});

const branch = run('git rev-parse --abbrev-ref HEAD');
const status = run('git status --short') || '(clean)';
const head = run('git log --oneline -n 1');

let previewUrl = '(none)';
if (exists(releaseJsonPath)) {
  try {
    const parsed = JSON.parse(fs.readFileSync(releaseJsonPath, 'utf8'));
    if (parsed.previewUrl) previewUrl = parsed.previewUrl;
  } catch {
    // Keep default value.
  }
}

const lines = [];
lines.push('');
lines.push(`## ${timestamp} AEDT`);
lines.push('');
lines.push('### Automated Checkpoint');
lines.push(`- Branch: \`${branch}\``);
lines.push(`- HEAD: \`${head}\``);
lines.push(`- Working tree: \`${status.replace(/\n/g, ' | ')}\``);
lines.push(`- Latest preview URL: ${previewUrl}`);
lines.push(`- Live inspection report present: ${exists(liveInspectionPath) ? 'yes' : 'no'}`);
lines.push(`- Visual inspection report present: ${exists(visualInspectionPath) ? 'yes' : 'no'}`);
lines.push('');
lines.push('### Next Safe Action');
lines.push('- Run `pnpm run verify:release` before any deploy and update this checkpoint afterward.');
lines.push('');

fs.mkdirSync(path.dirname(notesPath), { recursive: true });
if (!exists(notesPath)) {
  fs.writeFileSync(notesPath, '# CABANA Session Notes\n');
}
fs.appendFileSync(notesPath, lines.join('\n'));

console.log(`[session-checkpoint] Updated ${notesPath}`);
