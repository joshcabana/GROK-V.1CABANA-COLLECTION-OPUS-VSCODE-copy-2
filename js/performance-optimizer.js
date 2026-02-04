// performance-optimiser.js
// Performance optimisation script for CABANA website

// 1. Resource Hints - Add to document head
function addResourceHints() {
  const hints = [
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
  ];

  hints.forEach((hint) => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossorigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// 2. Optimise Font Loading
function optimiseFontLoading() {
  // Add font-display: swap to Google Fonts if not already present
  const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
  if (fontLink && !fontLink.href.includes('display=swap')) {
    fontLink.href += '&display=swap';
  }
}

// 3. Enhanced Lazy Loading for Images
function setupEnhancedLazyLoading() {
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img) => {
    // Check if image is below the fold
    const rect = img.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      img.setAttribute('loading', 'lazy');
    }

    // Add error handling for missing images
    img.addEventListener('error', function () {
      console.warn('Failed to load image:', this.src);
      this.style.display = 'none';
    });
  });
}

// 4. Initialise AOS Animation Library
function initialiseAOS() {
  // Load AOS animation library
  const aosScript = document.createElement('script');
  aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
  aosScript.onload = function () {
    const aosCSS = document.createElement('link');
    aosCSS.rel = 'stylesheet';
    aosCSS.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    document.head.appendChild(aosCSS);

    // Initialise AOS with optimised settings
    AOS.init({
      duration: 1200,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
      disable: function () {
        // Disable on mobile for better performance
        var maxWidth = 768;
        return window.innerWidth < maxWidth;
      },
    });
  };
  document.body.appendChild(aosScript);
}

// 5. Preload Critical Resources
function preloadCriticalResources() {
  // Removed non-essential image preloads to reduce network contention and improve TTI
  const criticalResources = [];

  criticalResources.forEach((resource) => {
    // Only preload if not already preloaded
    if (!document.querySelector(`link[href="${resource.href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.as === 'font') link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
}

// 6. Optimise Impact Counter Animation
function optimiseCounterAnimations() {
  const counters = document.querySelectorAll('.impact-number');

  // Use Intersection Observer to trigger animations only when visible
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach((counter) => observer.observe(counter));
  }
}

// Optimised counter animation function
function animateCounter(element) {
  const text = element.textContent;
  const target = parseFloat(text.replace(/[^0-9.]/g, ''));
  const prefix = text.replace(/[0-9.,]/g, '');

  if (isNaN(target)) return;

  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.floor(progress * target);

    if (prefix.includes('$')) {
      element.textContent = '$' + current.toLocaleString();
    } else if (prefix.includes('%')) {
      element.textContent = current + '%';
    } else {
      element.textContent = prefix + current.toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// 7. Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          console.log('Service Worker registered successfully');
        })
        .catch((error) => {
          console.log('Service Worker registration optional:', error);
        });
    });
  }
}

// 8. Memory Management
function setupMemoryManagement() {
  // Clean up event listeners on page unload
  window.addEventListener('beforeunload', () => {
    // Cancel any ongoing animations
    if (window.animationFrameId) {
      cancelAnimationFrame(window.animationFrameId);
    }
  });
}

// Initialise all optimisations
function initialisePerformanceOptimisations() {
  addResourceHints();
  optimiseFontLoading();
  setupEnhancedLazyLoading();
  preloadCriticalResources();
  optimiseCounterAnimations();
  setupMemoryManagement();
}

// Initialise on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialisePerformanceOptimisations);
} else {
  initialisePerformanceOptimisations();
}

// Initialise deferred operations on window load
window.addEventListener('load', () => {
  initialiseAOS();
  registerServiceWorker();
});

// Export for use in other scripts
window.CabanaPerformance = {
  animateCounter,
  setupEnhancedLazyLoading,
  initialisePerformanceOptimisations,
  initialiseAOS,
};
