(() => {
  const html = document.documentElement;
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  const openBtn = document.getElementById('openMenu');
  const closeBtn = document.getElementById('closeMenu');

  const open = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    openBtn?.setAttribute('aria-expanded', 'true');
    html.classList.add('overflow-hidden');
    // minimal focus trap
    const focusables = drawer.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])');
    focusables[0]?.focus();
    drawer.addEventListener('keydown', trap);
  };
  const close = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    openBtn?.setAttribute('aria-expanded', 'false');
    html.classList.remove('overflow-hidden');
    drawer.removeEventListener('keydown', trap);
    openBtn?.focus();
  };
  const trap = (e) => {
    if (e.key !== 'Tab') return;
    const focusables = [...drawer.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])')];
    if (!focusables.length) return;
    const first = focusables[0],
      last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();
