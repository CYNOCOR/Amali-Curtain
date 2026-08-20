/* =========================================================
   gallery.js - gallery page only
   Builds the masonry grid from gallery data objects
   and drives the click-to-enlarge lightbox with metadata.
   ========================================================= */
(function () {
  const galleryEl = document.getElementById('full-gallery');
  if (!galleryEl) return;

  // Sample data with metadata (title, description, location)
  const galleryData = [
    {
      src: 'assets/g1.png',
      title: 'Living Room Elegance',
      description: 'Double-pleated sheer and blackout combination providing a sophisticated look and optimal light control.',
      location: 'Horana'
    },
    {
      src: 'assets/g2.png',
      title: 'Master Bedroom Sheers',
      description: 'Lightweight linen sheers offering daytime privacy while maintaining natural light flow.',
      location: 'Bandaragama'
    },
    {
      src: 'assets/g3.png',
      title: 'Dining Area Velvet',
      description: 'Heavyweight velvet drapes with thermal blackout lining for a cozy, luxurious dining experience.',
      location: 'Panadura'
    },
    {
      src: 'assets/g4.png',
      title: 'Balcony Brass Rods',
      description: 'Custom brass-finish rods with easy-glide rings for wide balcony doors, tailored by hand.',
      location: 'Horana'
    },
    {
      src: 'assets/g5.png',
      title: 'Study Room Curtains',
      description: 'Minimalist pleated curtains perfectly suited for a home office environment.',
      location: 'Moratuwa'
    },
    {
      src: 'assets/g6.png',
      title: 'Living Room Elegance',
      description: 'Double-pleated sheer and blackout combination providing a sophisticated look and optimal light control.',
      location: 'Horana'
    },
    {
      src: 'assets/g7.png',
      title: 'Master Bedroom Sheers',
      description: 'Lightweight linen sheers offering daytime privacy while maintaining natural light flow.',
      location: 'Bandaragama'
    },
    {
      src: 'assets/g8.png',
      title: 'Dining Area Velvet',
      description: 'Heavyweight velvet drapes with thermal blackout lining for a cozy, luxurious dining experience.',
      location: 'Panadura'
    },
    {
      src: 'assets/g9.png',
      title: 'Balcony Brass Rods',
      description: 'Custom brass-finish rods with easy-glide rings for wide balcony doors, tailored by hand.',
      location: 'Horana'
    },
    {
      src: 'assets/g10.png',
      title: 'Study Room Curtains',
      description: 'Minimalist pleated curtains perfectly suited for a home office environment.',
      location: 'Moratuwa'
    },
    {
      src: 'assets/g11.png',
      title: 'Guest Room Blackout',
      description: 'Complete blackout drapes ensuring maximum comfort and privacy for guests.',
      location: 'Horana'
    },
    {
      src: 'assets/g12.png',
      title: 'Guest Room Blackout',
      description: 'Complete blackout drapes ensuring maximum comfort and privacy for guests.',
      location: 'Horana'
    },
    {
      src: 'assets/g13.png',
      title: 'Guest Room Blackout',
      description: 'Complete blackout drapes ensuring maximum comfort and privacy for guests.',
      location: 'Horana'
    }
  ];

  // Build the masonry grid
  galleryData.forEach((data, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item has-image';
    item.style.background = index % 2 === 0 ? 'var(--cream-4)' : 'var(--cream-1)';
    // Store index to retrieve data later
    item.dataset.index = index;
    item.innerHTML = `
      <img src="${data.src}" alt="${data.title} - curtains by Amali Curtain Center" loading="lazy"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="gallery-fallback">${data.title}</div>
    `;
    galleryEl.appendChild(item);
  });

  /* ---- Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxLocation = document.querySelector('.location-text');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxCounter = document.getElementById('lightbox-counter');

  let currentIndex = 0;

  function showLightboxImage(index) {
    if (!galleryData.length) return;

    // Wrap around index
    currentIndex = (index + galleryData.length) % galleryData.length;
    const itemData = galleryData[currentIndex];

    lightboxImg.src = itemData.src;
    lightboxImg.alt = itemData.title;

    // Update metadata
    lightboxTitle.textContent = itemData.title;
    lightboxDesc.textContent = itemData.description;
    lightboxLocation.textContent = itemData.location;

    // Update counter
    lightboxCounter.textContent = galleryData.length > 1 ? `${currentIndex + 1} / ${galleryData.length}` : '';

    // Navigation visibility
    const multi = galleryData.length > 1;
    lightboxPrev.style.display = multi ? 'flex' : 'none';
    lightboxNext.style.display = multi ? 'flex' : 'none';
  }

  galleryEl.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    const index = parseInt(item.dataset.index, 10);
    if (isNaN(index)) return;

    showLightboxImage(index);
    lightbox.classList.add('open');
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    // Short delay to clear content after fade out transition
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showLightboxImage(currentIndex - 1); });
  lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showLightboxImage(currentIndex + 1); });

  // Close when clicking the background overlay
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
      closeLightbox();
    }
  });

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
