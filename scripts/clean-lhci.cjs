const fs = require('fs');
const path = require('path');

const lighthouseDir = path.join(process.cwd(), '.lighthouseci');

if (!fs.existsSync(lighthouseDir)) {
  fs.mkdirSync(lighthouseDir, { recursive: true });
  console.log(`Created ${lighthouseDir}`);
  process.exit(0);
}

const entries = fs.readdirSync(lighthouseDir);
if (!entries.length) {
  console.log('No LHCI artifacts to clean.');
  process.exit(0);
}

for (const name of entries) {
  const entryPath = path.join(lighthouseDir, name);
  fs.rmSync(entryPath, { recursive: true, force: true });
}

console.log(`Cleaned ${entries.length} LHCI artifact(s).`);
