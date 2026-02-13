(function () {
  // Formspree-only flow: set window.CONTACT_ENDPOINT in assets/config.js
  const ENDPOINT = (window.CONTACT_ENDPOINT || '').trim();
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const note = document.getElementById('form-note');
  const toast = document.getElementById('toast');

  function t(key) {
    return (window._t && window._t[key]) || key;
  }

  // Time trap to detect instant bot submits
  const start = Date.now();

  function showToast(text, timeout = 3200) {
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), timeout);
  }

  function setFieldValidity(el, valid) {
    if (!el) return;
    el.setAttribute('aria-invalid', valid ? 'false' : 'true');
  }

  function isValidEmail(email) {
    return /^(?!.{255,})([a-zA-Z0-9_.+\-])+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/.test(email);
  }

  function validate() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const msg = document.getElementById('message');

    let ok = true;
    setFieldValidity(name, true);

    const emailVal = email.value.trim();
    if (!isValidEmail(emailVal)) { ok = false; setFieldValidity(email, false); }
    else setFieldValidity(email, true);

    if (!msg.value.trim()) { ok = false; setFieldValidity(msg, false); }
    else setFieldValidity(msg, true);

    return ok;
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Bot checks
    const hp = document.getElementById('website');
    if (hp && hp.value) return;
    const tookMs = Date.now() - start;
    if (tookMs < 800) return;

    note.textContent = '';
    if (!validate()) {
      note.textContent = t('errorFields');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = t('sending');

    const data = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
      _gotcha: hp?.value || '',
      _origin: location.href,
    };

    const endpoint = ENDPOINT || 'https://formspree.io/f/FORM_ID';

    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => fd.append(k, String(v || '')));
      const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });

      if (res.ok) {
        const lang = window._currentLang || 'de';
        location.href = './success.html?lang=' + lang;
        return;
      } else {
        const text = await res.text().catch(() => '');
        let short = '';
        try { const j = JSON.parse(text); short = j.error || ''; } catch {}
        console.error('Submit error', res.status, text);
        note.textContent = `${t('errorSend')} (HTTP ${res.status})${short ? ': ' + short : ''}`;
        showToast(t('toastError'));
      }
    } catch (err) {
      console.error(err);
      note.textContent = t('errorNetwork');
      showToast(t('toastNetwork'));
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = t('send');
    }
  });
})();
