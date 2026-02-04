module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: "npx http-server dist -p 4173 -c-1",
      startServerReadyPattern: "Available on",
      url: [
        "http://127.0.0.1:4173/",
        "http://127.0.0.1:4173/products/mens-boxer-brief-black.html"
      ],
      settings: { preset: "perf", formFactor: "mobile", chromeFlags: "--no-sandbox" }
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.9 }],
        "categories:accessibility": ["warn", { minScore: 0.95 }]
      }
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" }
  }
};