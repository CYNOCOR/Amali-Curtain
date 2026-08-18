/* =========================================================
   scroll-fx.js — Fluid scroll effects for every page
   • Scroll-progress bar at top of viewport
   • Header: transparent → frosted on scroll, compact mode
   • Parallax on hero & section backgrounds
   • Count-up on stat numbers when they enter view
   • Smooth back-to-top button
   ========================================================= */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────────────
     1. SCROLL PROGRESS BAR
  ───────────────────────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.setAttribute('aria-hidden', 'true');
  document.body.prepend(progressBar);

  /* ─────────────────────────────────────────────
     2. HEADER SCROLL STATE
  ───────────────────────────────────────────── */
  const header = document.querySelector('.site-header');

  /* ─────────────────────────────────────────────
     3. BACK-TO-TOP BUTTON (injected if missing)
  ───────────────────────────────────────────── */
  let btt = document.querySelector('.back-to-top');
  if (!btt) {
    btt = document.createElement('button');
    btt.className = 'back-to-top';
    btt.setAttribute('aria-label', 'Back to top');
    btt.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    document.body.appendChild(btt);
  }
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ─────────────────────────────────────────────
     4. HERO PARALLAX
  ───────────────────────────────────────────── */
  const heroMedia = document.getElementById('hero-media');

  /* ─────────────────────────────────────────────
     5. SECTION BACKGROUND PARALLAX
     (sections with data-parallax attribute)
  ───────────────────────────────────────────── */
  const parallaxSections = document.querySelectorAll('[data-parallax]');

  /* ─────────────────────────────────────────────
     6. COUNT-UP NUMBERS
  ───────────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = counters.length && new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const isInt = Number.isInteger(target);

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const val = target * eased;
        el.textContent = (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObserver && countObserver.observe(el));

  /* ─────────────────────────────────────────────
     7. MAIN RAF LOOP — batches all scroll reads
  ───────────────────────────────────────────── */
  let lastScrollY = -1;
  let ticking = false;

  function onScrollChange(scrollY) {
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    /* Progress bar */
    const pct = docH > 0 ? (scrollY / docH) * 100 : 0;
    progressBar.style.transform = `scaleX(${pct / 100})`;

    /* Header state */
    if (header) {
      header.classList.toggle('scrolled', scrollY > 40);
      header.classList.toggle('header-compact', scrollY > 200);
    }

    /* Back-to-top visibility */
    btt.classList.toggle('show', scrollY > 300);

    /* Hero parallax (home.js already handles hero video,
       but we add a subtle y-drift on the hero-content too) */
    if (!reduceMotion && heroMedia) {
      const drift = Math.min(scrollY * 0.18, 200);
      heroMedia.style.transform = `translate3d(0,${drift}px,0) scale(1.06)`;
    }

    /* Section parallax */
    if (!reduceMotion) {
      parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const viewH = window.innerHeight;
        if (rect.bottom < 0 || rect.top > viewH) return;
        const speed = parseFloat(section.dataset.parallax) || 0.12;
        const offset = (rect.top - viewH / 2) * speed;
        section.style.backgroundPositionY = `calc(50% + ${offset}px)`;
      });
    }
  }

  function scheduleUpdate() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY === lastScrollY) return;
    lastScrollY = scrollY;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        onScrollChange(lastScrollY);
        ticking = false;
      });
    }
  }

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });

  /* Initial call */
  scheduleUpdate();

})();
