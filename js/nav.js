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
})();
