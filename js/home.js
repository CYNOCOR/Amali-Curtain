/* =========================================================
   home.js - home page only
   Falls back to the gradient background if the hero video is
   missing or the browser/data-saver blocks autoplay.
   ========================================================= */
(function () {
  const video = document.getElementById('hero-video');
  const media = document.getElementById('hero-media');
  if (!video || !media) return;

  video.addEventListener('error', () => {
    video.remove(); // gradient background in .hero-media shows through
  }, true);

  // Respect reduced-motion preference - swap the video for a still poster
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    video.removeAttribute('autoplay');
    video.pause();
    return;
  }

  const updateParallax = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const offsetY = Math.min(scrollY * 0.16, 180);
    const scale = 1.06 + (scrollY * 0.00022);

    media.style.transform = `translate3d(0, ${offsetY}px, 0) scale(${scale})`;
    video.style.transform = `scale(${1.08 + scrollY * 0.00012})`;
  };

  updateParallax();
  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax);
})();
