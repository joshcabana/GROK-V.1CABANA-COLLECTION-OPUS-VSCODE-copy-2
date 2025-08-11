// Lightweight UI enhancements shared across pages
(function () {
  function initNavShadow() {
    var nav = document.querySelector('nav[aria-label="Main navigation"]');
    if (!nav) return;

    function update() {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y > 10) {
        nav.classList.add('nav-shadow');
      } else {
        nav.classList.remove('nav-shadow');
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function lockBodyScroll(lock) {
    try {
      if (lock) {
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
      } else {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
      }
    } catch (_) {}
  }

  function initMobileDrawerLock() {
    var menu = document.getElementById('mobileMenu');
    var btn = document.getElementById('mobileMenuBtn');
    if (!menu || !btn) return;
    btn.addEventListener('click', function () {
      var isOpen = menu.classList.contains('translate-y-0') && !menu.classList.contains('-translate-y-full');
      // After toggle in page scripts, check again on next tick
      setTimeout(function(){
        var openNow = menu.classList.contains('translate-y-0') && !menu.classList.contains('-translate-y-full');
        lockBodyScroll(openNow);
      }, 0);
    });
  }

  function init() {
    initNavShadow();
    initMobileDrawerLock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual re-init if needed
  window.CabanaUI = Object.assign({}, window.CabanaUI || {}, {
    initNavShadow: initNavShadow,
    initMobileDrawerLock: initMobileDrawerLock,
    lockBodyScroll: lockBodyScroll,
  });
})();
