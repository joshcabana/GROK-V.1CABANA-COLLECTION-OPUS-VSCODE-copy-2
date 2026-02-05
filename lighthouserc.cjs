module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: 'Ready on|started server on',
      url: ['http://localhost:3000/'],
      numberOfRuns: 1,
      chromePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      settings: {
        onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
