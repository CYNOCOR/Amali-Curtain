/* =========================================================
   footer.js - footer + back-to-top behaviour, shared by every page
   ========================================================= */
(function () {
  document.querySelectorAll('.site-footer').forEach((footer) => footer.remove());
  document.querySelectorAll('#back-to-top').forEach((button) => button.remove());

  const footerRoot = document.createElement('footer');
  footerRoot.className = 'site-footer';
  footerRoot.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="assets/logos/logo2.png" alt="Amali Curtain Centre logo">
          <p>Tailored curtains for homes across Horana, built with care, craftsmanship, and personal service.</p>
        </div>
        <div>
          <h4>Visit us</h4>
          <div class="footer-links">
            <p>No. 71/, Amali Curtains Centre,<br>3rd Lane, Victoria Estate,<br>Horana <br> 12400</p>
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <div class="footer-links">
            <p>Tel: <a href="tel:+94774104159">077 410 4159</a></p>
            <p>WhatsApp: <a href="https://wa.me/94779074068" target="_blank" rel="noopener">077 907 4068</a> | <a href="https://wa.me/94342267342" target="_blank" rel="noopener">034 226 7342</a></p>
            <p>Email: <a href="mailto:amalicurtaincenter@gmail.com">amalicurtaincenter@gmail.com</a></p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <span id="current-year"></span> Amali Curtain Center &middot; Horana, Sri Lanka</p>
        <div class="footer-bottom-socials footer-socials" aria-label="Follow us">
          <a class="social-link" href="https://www.facebook.com/AmaliCurtainoffical/" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M13.8 20v-7.2h2.5l.4-2.8h-2.9V7.4c0-.8.3-1.4 1.5-1.4H17V3.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.9v2.3h-2.5v2.8h2.5V20h3.7z" fill="currentColor"/>
            </svg>
          </a>
          <a class="social-link" href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="currentColor" stroke-width="1.8"/>
              <circle cx="12" cy="12" r="3.8" stroke="currentColor" stroke-width="1.8"/>
              <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/>
            </svg>
          </a>
          <a class="social-link" href="https://wa.me/94779074068" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20 12a8 8 0 0 1-12.8 6.4L4 20l1.7-3.2A8 8 0 1 1 20 12z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.1 8.8c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.3l.4.8c.1.2 0 .5-.2.7l-.4.5c-.1.1-.1.3 0 .4.5.8 1.2 1.4 2.1 1.9.2.1.3.1.4 0l.6-.4c.2-.2.5-.3.8-.2l.8.3c.3.1.4.4.3.7l-.4 1c-.1.4-.6.6-1 .4A8.3 8.3 0 0 1 9 9.7c-.2-.8-.1-1.3.1-1.9z" fill="currentColor"/>
            </svg>
          </a>
          <a class="social-link" href="mailto:amalicurtaincenter@gmail.com" aria-label="Email us">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.8"/>
              <path d="M4.5 7.2 12 12.8l7.5-5.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(footerRoot);

  const yearEl = document.querySelector('.site-footer #current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const backToTop = document.createElement('button');
  backToTop.id = 'back-to-top';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19V5M12 5L5 12M12 5l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
  document.body.appendChild(backToTop);

  window.addEventListener(
    'scroll',
    () => backToTop.classList.toggle('show', window.scrollY > 500),
    { passive: true }
  );

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
