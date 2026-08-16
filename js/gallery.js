/* =========================================================
   gallery.js — gallery page only
   Builds the masonry grid from assets/images/gallery/1.jpg..N.jpg
   (newest first) and drives the click-to-enlarge lightbox.
   ========================================================= */
(function () {
  const galleryEl = document.getElementById('full-gallery');
  if (!galleryEl) return;

  // Captions describe each install — swap freely, and add/remove
  // entries to match how many photos you actually have.
  const galleryCaptions = [
    'Living room', 'Bedroom sheer drapes', 'Dining area blackout lining',
    'Balcony rods & rings', 'Hall pleated finish', 'Father tailoring on-site',
    'Kitchen valance', 'Study room drapes', 'Guest room curtains',
    'Window seat nook', 'Front porch curtains', 'Master bedroom blackout'
  ];

  for (let n = galleryCaptions.length; n >= 1; n--) {
    const caption = galleryCaptions[n - 1];
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.background = n % 2 === 0 ? 'var(--cream-4)' : 'var(--cream-1)';
    item.innerHTML = `
      <img src="assets/images/gallery/${n}.jpg" alt="${caption} — curtains by Amali Curtain Center" loading="lazy"
           onload="this.closest('.gallery-item').classList.add('has-image');"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="gallery-fallback">assets/images/gallery/${n}.jpg &middot; ${caption}</div>
    `;
    galleryEl.appendChild(item);
  }

  /* ---- Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');

  function getLoadedGalleryImages() {
    return Array.from(document.querySelectorAll('.gallery-item img'))
      .filter((img) => img.style.display !== 'none');
  }

  let galleryImages = [];
  let currentIndex = 0;

  function showLightboxImage(index) {
    if (!galleryImages.length) return;
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent = galleryImages.length > 1 ? `${currentIndex + 1} / ${galleryImages.length}` : '';
    const multi = galleryImages.length > 1;
    lightboxPrev.style.display = multi ? 'flex' : 'none';
    lightboxNext.style.display = multi ? 'flex' : 'none';
  }

  galleryEl.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const img = item.querySelector('img');
    if (!img || img.style.display === 'none') return;
    galleryImages = getLoadedGalleryImages();
    showLightboxImage(galleryImages.indexOf(img));
    lightbox.classList.add('open');
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showLightboxImage(currentIndex - 1); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showLightboxImage(currentIndex + 1); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(currentIndex + 1);
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) showLightboxImage(currentIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
})();
