/* =========================================================
   nav.js — shared header behaviour for every page
   - mobile menu open/close
   - marks the current page's nav link as active
   - smooth-scrolls same-page anchor links (accounts for sticky header)
   ========================================================= */
(function () {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight the nav link matching the current page filename
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.main-nav a, .mobile-nav-inner a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const hrefPage = href.split('#')[0];
    if (hrefPage === currentPage || (currentPage === '' && hrefPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for on-page anchor links, offset for the sticky header
  const header = document.querySelector('.site-header');
  function smoothScrollTo(target) {
    const headerHeight = header ? header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const hash = link.getAttribute('href');
    if (!hash || hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo(target);
      history.pushState(null, '', hash);
    });
  });
})();
