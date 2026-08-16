/* =========================================================
   home.js — home page only
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

  // Respect reduced-motion preference — swap the video for a still poster
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    video.removeAttribute('autoplay');
    video.pause();
  }
})();
