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
    function syncAria(openNow){
      try {
        btn.setAttribute('aria-expanded', openNow ? 'true' : 'false');
        menu.setAttribute('aria-hidden', openNow ? 'false' : 'true');
      } catch(_) {}
    }
    btn.addEventListener('click', function () {
      // After page-level toggle finishes, sync
      setTimeout(function(){
        var openNow = menu.classList.contains('translate-y-0') && !menu.classList.contains('-translate-y-full');
        lockBodyScroll(openNow);
        syncAria(openNow);
      }, 0);
    });
  }

  function initOffscreenMediaObserver() {
    if (!('IntersectionObserver' in window)) return;
    var mediaEls = document.querySelectorAll('[data-offscreen-pause]');
    if (!mediaEls.length) return;
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var el = entry.target;
        if (el.tagName === 'VIDEO') {
          if (!entry.isIntersecting && !el.paused) {
            try { el.pause(); } catch(_) {}
          } else if (entry.isIntersecting && el.autoplay) {
            try { el.play(); } catch(_) {}
          }
        }
      });
    }, { threshold: 0.1 });
    mediaEls.forEach(function(el){ observer.observe(el); });
  }

  function init() {
    initNavShadow();
    initMobileDrawerLock();
    initOffscreenMediaObserver();
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
    initOffscreenMediaObserver: initOffscreenMediaObserver,
  });
})();
