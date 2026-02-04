const fs = require("fs/promises");
const path = require("path");

const ROOT = process.cwd();
const SRC_PAGES = path.join(ROOT, "src", "pages");
const PARTIALS = path.join(ROOT, "src", "partials");
const DIST = path.join(ROOT, "dist");

async function rmAndRecreate(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function readText(p) {
  return fs.readFile(p, "utf8");
}

async function writeText(p, content) {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, content, "utf8");
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function injectPartials(html, header, footer) {
  return html
    .replace("<!-- @include:header -->", header)
    .replace("<!-- @include:footer -->", footer);
}

async function copyDir(src, dest) {
  await fs.cp(src, dest, { recursive: true });
}

async function main() {
  await rmAndRecreate(DIST);

  const header = await readText(path.join(PARTIALS, "header.html"));
  const footer = await readText(path.join(PARTIALS, "footer.html"));

  const files = await walk(SRC_PAGES);
  const htmlFiles = files.filter((f) => f.endsWith(".html"));

  for (const inFile of htmlFiles) {
    const rel = path.relative(SRC_PAGES, inFile);
    const outFile = path.join(DIST, rel);
    const html = await readText(inFile);
    const injected = injectPartials(html, header, footer);
    await writeText(outFile, injected);
  }

  for (const d of ["assets", "css", "js"]) {
    const srcDir = path.join(ROOT, d);
    try {
      await fs.access(srcDir);
      await copyDir(srcDir, path.join(DIST, d));
    } catch (_) {}
  }

  for (const f of ["site.webmanifest", "sitemap.xml", "favicon.ico", "robots.txt", "sw.js", "offline.html", "404.html"]) {
    const srcFile = path.join(ROOT, f);
    try {
      await fs.access(srcFile);
      await fs.copyFile(srcFile, path.join(DIST, f));
    } catch (_) {}
  }

  console.log("✅ HTML build complete → dist/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
