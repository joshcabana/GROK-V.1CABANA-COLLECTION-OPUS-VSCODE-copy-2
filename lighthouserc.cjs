module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        "index.html",
        "products/mens-boxer-brief-black.html"
      ],
      staticDistDir: "dist",
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
