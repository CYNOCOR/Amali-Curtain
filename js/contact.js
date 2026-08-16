/* =========================================================
   contact.js — contact page only
   Fully client-side: this site has no backend, so instead of
   posting to a server the form validates itself, builds a
   pre-filled WhatsApp message, and opens it for the visitor to
   send. Swap the number in WHATSAPP_NUMBER if it ever changes.
   ========================================================= */
(function () {
  const WHATSAPP_NUMBER = '94774104159';

  const form = document.getElementById('consult-form');
  const submitBtn = document.getElementById('consult-submit');
  const result = document.getElementById('form-result');
  if (!form) return;

  const phonePattern = /^[0-9+\-\s()]{7,20}$/;

  function showResult(message, isError, whatsappLink) {
    result.classList.remove('error');
    result.style.display = 'block';
    if (isError) {
      result.classList.add('error');
      result.innerHTML = `<p>${message}</p>`;
      return;
    }
    result.innerHTML = `<p>${message}</p>` +
      (whatsappLink ? `<a href="${whatsappLink}" target="_blank" rel="noopener" class="btn btn-primary">Open WhatsApp</a>` : '');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    result.style.display = 'none';

    const data = new FormData(form);

    // Honeypot — bots tend to fill every field
    if (data.get('website')) {
      form.reset();
      return;
    }

    const name = (data.get('name') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const errors = [];
    if (!name || name.length > 100) errors.push('Please enter a valid name.');
    if (!phone || !phonePattern.test(phone)) errors.push('Please enter a valid phone number.');
    if (message.length > 2000) errors.push('Message is too long.');

    if (errors.length) {
      showResult(errors.join(' '), true);
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Preparing…';

    const waText = encodeURIComponent(
      `Hi, I'd like to request a consultation from your website.\nName: ${name}\nPhone: ${phone}\nMessage: ${message || '(none)'}`
    );
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

    showResult("Thanks — tap below to send this to us on WhatsApp and we'll be in touch shortly.", false, waLink);
    window.open(waLink, '_blank', 'noopener');

    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  });
})();
