(function () {
  // Preferred: set window.CONTACT_ENDPOINT in assets/config.js
  const DEFAULT_ENDPOINT = (window.CONTACT_ENDPOINT || '').trim();
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const note = document.getElementById('form-note');
  const toast = document.getElementById('toast');
  // No dynamic year now; footer is static per spec

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
    // Simple RFC5322-ish check
    return /^(?!.{255,})([a-zA-Z0-9_.+\-])+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/.test(email);
  }

  function validate() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const msg = document.getElementById('message');

    let ok = true;
  // name optional
  setFieldValidity(name, true);

  const emailVal = email.value.trim();
  if (!isValidEmail(emailVal)) { ok = false; setFieldValidity(email, false); }
  else setFieldValidity(email, true);

    if (!msg.value.trim()) { ok = false; setFieldValidity(msg, false); }
    else setFieldValidity(msg, true);

    return ok;
  }

  // No email reveal button (Impressum section removed)

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Bot checks
    const hp = document.getElementById('website');
    if (hp && hp.value) {
      // silently drop
      return;
    }
    const tookMs = Date.now() - start;
    if (tookMs < 800) {
      return; // very fast -> likely bot
    }

    note.textContent = '';
    if (!validate()) {
      note.textContent = 'Bitte prüfe die rot markierten Felder.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Senden…';

    // Gather form data
    const data = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim(),
      _gotcha: hp?.value || '', // honeypot
      _origin: location.href,
    };

  // Endpoint resolution:
  // 1) DEFAULT_ENDPOINT (set above) if provided
  // 2) URL hash param #cloud=https://...
  // 3) Formspree fallback (replace FORM_ID)
  const params = new URLSearchParams(location.hash.replace('#', ''));
  const cloud = params.get('cloud');
  const endpoint = DEFAULT_ENDPOINT || cloud || 'https://formspree.io/f/FORM_ID';

    try {
      const isFormspree = /(^https?:\/\/)?([a-zA-Z0-9_.-]+\.)?formspree\.io\//.test(endpoint);
      let res;
      if (isFormspree) {
        const fd = new FormData();
        Object.entries(data).forEach(([k, v]) => fd.append(k, String(v || '')));
        res = await fetch(endpoint, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
      } else {
        res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
        });
      }

      if (res.ok) {
        form.reset();
        showToast('Danke! Deine Nachricht wurde gesendet.');
        note.textContent = 'Gesendet – ich melde mich bald.';
      } else {
        const text = await res.text().catch(() => '');
        let short = '';
        try { const j = JSON.parse(text); short = j.error || ''; } catch {}
        console.error('Submit error', res.status, text);
        note.textContent = `Fehler beim Senden (HTTP ${res.status})${short ? ': ' + short : ''}`;
        showToast('Fehler beim Senden');
      }
    } catch (err) {
      console.error(err);
      note.textContent = 'Netzwerkfehler. Bitte später erneut versuchen.';
      showToast('Netzwerkfehler.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Senden';
    }
  });
})();
