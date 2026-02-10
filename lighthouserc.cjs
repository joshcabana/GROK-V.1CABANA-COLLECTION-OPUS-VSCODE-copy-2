const preset = process.env.CABANA_LHCI_PRESET || 'mobile';
const isDesktop = preset === 'desktop';
const lhciPort = Number(process.env.CABANA_LHCI_PORT || 3000);
const chromePath = process.env.CABANA_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const mobileSettings = {
  formFactor: 'mobile',
  screenEmulation: {
    mobile: true,
    width: 360,
    height: 640,
    deviceScaleFactor: 2,
    disabled: false,
  },
  throttling: {
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
  },
  emulatedUserAgent:
    'Mozilla/5.0 (Linux; Android 10; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
};

const urls = [
  `http://localhost:${lhciPort}/`,
  `http://localhost:${lhciPort}/products`,
  `http://localhost:${lhciPort}/products/mens-boxer-brief-black`,
  `http://localhost:${lhciPort}/cart`,
];

module.exports = {
  ci: {
    collect: {
      startServerCommand: `pnpm run build && PORT=${lhciPort} pnpm run start`,
      startServerReadyPattern: 'Local:\\s+http://localhost|Ready in|Ready on|started server on',
      startServerReadyTimeout: 180000,
      url: urls,
      numberOfRuns: 3,
      chromePath,
      settings: {
        onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
        preset: isDesktop ? 'desktop' : undefined,
        ...(isDesktop ? {} : mobileSettings),
        extraHeaders: {
          'x-lhci-preset': isDesktop ? 'desktop' : 'mobile',
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
