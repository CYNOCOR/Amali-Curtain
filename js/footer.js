/* =========================================================
   footer.js — footer + back-to-top behaviour, shared by every page
   ========================================================= */
(function () {
  // Keep the copyright year current without editing every page by hand
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Back-to-top button lives beside the footer in the markup
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  window.addEventListener(
    'scroll',
    () => backToTop.classList.toggle('show', window.scrollY > 500),
    { passive: true }
  );
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
