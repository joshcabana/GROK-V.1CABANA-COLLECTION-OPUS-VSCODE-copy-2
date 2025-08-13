(() => {
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];

  const body = document.body;
  const drawer = qs('[data-mobile-drawer]');
  const overlay = qs('[data-mobile-overlay]');
  const openBtn = qs('[data-mobile-open]');
  const closeBtn = qs('[data-mobile-close]');
  const focusablesSel = [
    'a[href]',
    'button:not([disabled])',
    'input',
    'select',
    'textarea',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  let lastFocus = null;

  // Initialise ARIA wiring for accessibility
  if (openBtn && drawer) {
    if (!drawer.id) drawer.id = 'mobileDrawer';
    openBtn.setAttribute('aria-controls', drawer.id);
    openBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }

  function lockScroll(lock) {
    body.classList.toggle('is-locked', lock);
  }

  function trapFocus(e) {
    if (!drawer.classList.contains('is-open')) return;
    const nodes = qsa(focusablesSel, drawer);
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
    }
  }

  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    lockScroll(true);
    drawer.setAttribute('aria-hidden', 'false');
    const first = qsa(focusablesSel, drawer)[0];
    first && first.focus();
    try {
      const trigger = openBtn || lastFocus;
      trigger && trigger.setAttribute && trigger.setAttribute('aria-expanded', 'true');
    } catch (_) {}
    document.addEventListener('keydown', trapFocus);
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    lockScroll(false);
    drawer.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', trapFocus);
    try {
      const trigger = openBtn || lastFocus;
      trigger && trigger.setAttribute && trigger.setAttribute('aria-expanded', 'false');
    } catch (_) {}
    lastFocus && lastFocus.focus();
  }

  if (openBtn && drawer && overlay) {
    openBtn.addEventListener('click', openDrawer);
    overlay.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  }

  // Close the drawer if viewport grows to desktop to avoid stuck state
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && drawer && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // ===== THEME TOGGLE (Light/Dark) with Monogram Button =====
  function getSavedTheme() {
    try {
      return localStorage.getItem('cabanaTheme');
    } catch (_) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem('cabanaTheme', theme);
    } catch (_) {}
  }

  function getInitialTheme() {
    const saved = getSavedTheme();
    if (saved === 'dark' || saved === 'light') return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    saveTheme(theme);
  }

  // Insert monogram button to the far-left of the header brand as theme toggle
  const headerContainer = qs('header.sticky-header > div');
  if (headerContainer) {
    const brandLink = qs('header.sticky-header a[href="/"]');
    const themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'theme-toggle';
    const img = document.createElement('img');
    img.src = '/assets/Images/CABANA-MONOGRAM-BLACK.png';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    themeBtn.appendChild(img);

    const current = getInitialTheme();
    applyTheme(current);
    themeBtn.setAttribute(
      'aria-label',
      current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );

    themeBtn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      themeBtn.setAttribute(
        'aria-label',
        next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });

    // Insert before the brand link when possible to keep logo at far-left
    try {
      if (brandLink && brandLink.parentNode) {
        brandLink.parentNode.insertBefore(themeBtn, brandLink);
      } else {
        headerContainer.insertBefore(themeBtn, headerContainer.firstChild);
      }
    } catch (_) {
      // Fallback: append at start of container
      headerContainer.insertBefore(themeBtn, headerContainer.firstChild);
    }
  }
})();
