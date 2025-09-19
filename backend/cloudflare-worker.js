export default {
  async fetch(request, env) {
    const allowed = String(env?.ALLOWED_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    const reqOrigin = request.headers.get('origin') || '';
    const allowOrigin = allowed.length && allowed.includes(reqOrigin) ? reqOrigin : '*';
    const cors = () => ({ 'access-control-allow-origin': allowOrigin, 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'POST,OPTIONS' });
    const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json', ...cors() } });

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors() });
    }
    if (request.method === 'GET') {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json', ...cors() } });
    }
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: cors() });
    }
    const ct = request.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      return json({ error: 'JSON required' }, 415);
    }
    let body;
    try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

    const { name = '', email = '', subject = '', message = '', _gotcha = '' } = body;

    // honeypot
    if (String(_gotcha).trim()) return json({ ok: true }, 200);

    // validations
    if (!email || !isEmail(email)) return json({ error: 'E-Mail erforderlich/ungültig' }, 400);
    if (!message || !String(message).trim()) return json({ error: 'Nachricht erforderlich' }, 400);

  const toEmail = String(env?.RECIPIENT || 'feedback@tinfo.space');
  const fromEmail = String(env?.FROM || 'no-reply@tinfo.space');
    const subj = (String(subject).trim() || 'Kontaktformular') + ' – tinfo.space';
    const cleanName = String(name).trim();
    const fromName = cleanName ? `${cleanName} via Kontaktformular` : 'Kontaktformular';
    const text = `Neue Nachricht über das Kontaktformular\n\n` +
      `Name: ${cleanName || '-'}\n` +
      `E-Mail: ${email}\n` +
      `Betreff: ${String(subject).trim() || '-'}\n\n` +
      `Nachricht:\n${String(message).trim()}\n`;
    const html = `<!doctype html><html><body>` +
      `<h2>Neue Nachricht über das Kontaktformular</h2>` +
      `<p><strong>Name:</strong> ${escapeHtml(cleanName || '-')}<br/>` +
      `<strong>E‑Mail:</strong> ${escapeHtml(email)}<br/>` +
      `<strong>Betreff:</strong> ${escapeHtml(String(subject).trim() || '-')}</p>` +
      `<pre style="font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: pre-wrap;">${escapeHtml(String(message).trim())}</pre>` +
      `</body></html>`;

    // MailChannels send
    const mcReq = {
      personalizations: [{ to: [{ email: toEmail, name: 'Feedback' }] }],
  from: { email: fromEmail, name: fromName },
      reply_to: { email, name: cleanName || email },
      subject: subj,
      content: [
        { type: 'text/plain', value: text },
        { type: 'text/html', value: html }
      ],
      headers: { 'X-Entity-Ref-ID': cryptoRandomId() }
    };

    try {
      const res = await fetch('https://api.mailchannels.net/tx/v1/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(mcReq)
      });
      if (!res.ok) {
        const errText = await res.text();
        return json({ error: 'Mail send failed', detail: errText }, 502);
      }
  return json({ ok: true }, 200);
    } catch (e) {
      return json({ error: 'Mail send exception', detail: String(e) }, 500);
    }
  }
}
function isEmail(s) { return /^(?!.{255,})([a-zA-Z0-9_.+\-])+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/.test(String(s)); }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function cryptoRandomId() {
  const a = new Uint8Array(16);
  crypto.getRandomValues(a);
  return [...a].map(x => x.toString(16).padStart(2, '0')).join('');
}
