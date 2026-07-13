(function () {
  document.documentElement.classList.add('js');

  // Hide header on scroll-down, show on scroll-up — rAF-throttled, transform-only (GPU, 60fps).
  var header = document.querySelector('.site-header');
  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      var hidden = y > lastY && y > 140;
      header.classList.toggle('is-hidden', hidden);
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Close the mobile nav <details> panel after tapping a link.
  var mobileNav = document.querySelector('.nav-mobile-details');
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileNav.removeAttribute('open'); });
    });
  }
})();
