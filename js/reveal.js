/* =========================================================
   reveal.js — Bidirectional scroll animation engine
   Elements animate IN when entering viewport and
   animate OUT when leaving — re-triggering every time.
   ========================================================= */
(function () {
  'use strict';

  /* Respect user preference — show everything immediately */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll(
      '.reveal,.reveal-up,.reveal-left,.reveal-right,.reveal-scale,.reveal-fade'
    ).forEach(el => el.classList.add('in-view'));
    return;
  }

  /* All animated element selectors */
  const SELECTOR = [
    '.reveal',
    '.reveal-up',
    '.reveal-left',
    '.reveal-right',
    '.reveal-scale',
    '.reveal-fade',
  ].join(',');

  const els = document.querySelectorAll(SELECTOR);
  if (!els.length) return;

  /* ── IntersectionObserver ──────────────────────────────
     threshold: 0 catches both entry AND exit edges.
     rootMargin: slight bottom offset so elements don't
     pop in right at the very edge of the viewport.
  ─────────────────────────────────────────────────────── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          /* ── Animate IN ── */
          el.classList.add('in-view');

          /* Apply stagger delay stored during setup */
          const staggerDelay = el.dataset.staggerDelay;
          if (staggerDelay) {
            el.style.transitionDelay = staggerDelay + 's';
          }

        } else {
          /* ── Animate OUT (scroll up past, or scroll down past) ──
             Remove in-view so element resets for next entry.
             Also clear stagger delay so re-entry feels fresh. */
          el.classList.remove('in-view');

          if (el.dataset.staggerDelay) {
            el.style.transitionDelay = '0s';
          }
        }
      });
    },
    {
      threshold: 0,
      /* Enter viewport 60px before bottom edge for smooth feel */
      rootMargin: '0px 0px -60px 0px',
    }
  );

  /* ── Observe every element ─────────────────────────── */
  els.forEach(el => observer.observe(el));

  /* ── Auto-stagger children with data-stagger-children ─
     e.g. <div data-stagger-children="0.10"> animates each
     child with a 0.10s delay increment.
  ─────────────────────────────────────────────────────── */
  document.querySelectorAll('[data-stagger-children]').forEach(parent => {
    const delay = parseFloat(parent.dataset.staggerChildren) || 0.10;
    [...parent.children].forEach((child, i) => {
      if (!child.classList.contains('reveal') &&
          !child.classList.contains('reveal-up') &&
          !child.classList.contains('reveal-left') &&
          !child.classList.contains('reveal-right') &&
          !child.classList.contains('reveal-scale') &&
          !child.classList.contains('reveal-fade')) {
        child.classList.add('reveal-up');
      }
      child.dataset.staggerDelay = (i * delay).toFixed(2);
      observer.observe(child);
    });
  });

})();
