/* =========================================================
   contact.js - contact page logic
   ========================================================= */
(function () {
  const WHATSAPP_NUMBER = '94779074068';
  const AMALI_EMAIL = 'amalicurtaincenter@gmail.com';

  const form = document.getElementById('consult-form');
  const submitBtn = document.getElementById('consult-submit');
  const result = document.getElementById('form-result');
  const contactMethodSelect = document.getElementById('contact-method');
  const formNote = document.getElementById('form-note');
  const emailField = document.getElementById('email');
  if (!form) return;

  const phonePattern = /^[0-9+\-\s()]{7,20}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function syncContactFields() {
    if (!emailField || !contactMethodSelect) return;

    const emailWrapper = emailField.closest('.field');
    const isEmailMode = contactMethodSelect.value === 'email';

    if (emailWrapper) {
      emailWrapper.style.display = isEmailMode ? 'block' : 'none';
    }

    emailField.required = isEmailMode;
  }

  function updateFormNote() {
    if (!formNote || !contactMethodSelect) return;
    syncContactFields();
    if (contactMethodSelect.value === 'email') {
      formNote.textContent = `Submitting will launch your email application pre-filled to ${AMALI_EMAIL}.`;
    } else {
      formNote.textContent = 'Submitting will open a pre-filled WhatsApp chat with Amali Curtain Center.';
    }
  }

  if (contactMethodSelect) {
    contactMethodSelect.addEventListener('change', updateFormNote);
    updateFormNote();
  }

  function showResult(message, isError, linkUrl, linkLabel) {
    result.classList.remove('error');
    result.style.display = 'block';
    if (isError) {
      result.classList.add('error');
      result.innerHTML = `<p>${message}</p>`;
      return;
    }
    result.innerHTML = `<p>${message}</p>` +
      (linkUrl ? `<a href="${linkUrl}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:0.75rem;">${linkLabel || 'Continue'}</a>` : '');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    result.style.display = 'none';

    const data = new FormData(form);

    // Honeypot check
    if (data.get('website')) {
      form.reset();
      return;
    }

    const contactMethod = (data.get('contact_method') || 'whatsapp').toString();
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const errors = [];
    if (!name || name.length > 100) errors.push('Please enter your full name.');
    
    if (contactMethod === 'email') {
      if (!email || !emailPattern.test(email) || email.length > 150) {
        errors.push('Please enter a valid email address.');
      }
    } else if (email && (!emailPattern.test(email) || email.length > 150)) {
      errors.push('Please enter a valid email address.');
    }

    if (!phone || !phonePattern.test(phone)) errors.push('Please enter a valid phone number.');
    if (message.length > 2000) errors.push('Message is too long.');

    if (errors.length) {
      showResult(errors.join(' '), true);
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Preparing…';

    if (contactMethod === 'email') {
      const subject = `Consultation Request from ${name}`;
      const emailBody = `Hi Amali Curtain Center,

I would like to request a consultation for my space.

Client Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Message / Requirements:
${message || '(none)'}

Thank you!`;

      const mailtoLink = `mailto:${AMALI_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      showResult(`Thanks ${name}! Tap below to open your email composer pre-filled to ${AMALI_EMAIL}.`, false, mailtoLink, 'Open Email App');
      window.location.href = mailtoLink;
    } else {
      let waDetails = `Hi, I'd like to request a consultation from your website.\nName: ${name}`;
      if (email) waDetails += `\nEmail: ${email}`;
      waDetails += `\nPhone: ${phone}\nMessage: ${message || '(none)'}`;

      const waText = encodeURIComponent(waDetails);
      const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;

      showResult(`Thanks ${name}! Tap below to send your request directly to us on WhatsApp:`, false, waLink, 'Open WhatsApp');
      window.open(waLink, '_blank', 'noopener');
    }

    form.reset();
    if (contactMethodSelect) contactMethodSelect.value = 'whatsapp';
    updateFormNote();
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  });
})();


