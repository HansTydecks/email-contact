// Minimal Express mail backend
// Usage: set env vars (see .env.example) and run: node backend/node/server.js
// Deploy: Render (render.yaml) or Railway

import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8787;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

app.use(express.json());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow curl/postman
    if (ALLOWED_ORIGINS.includes('*') || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
}));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/contact', async (req, res) => {
  const { name = '', email = '', subject = '', message = '', _gotcha = '' } = req.body || {};

  if (String(_gotcha).trim()) return res.json({ ok: true }); // honeypot
  if (!isEmail(email)) return res.status(400).json({ error: 'E-Mail erforderlich/ungültig' });
  if (!String(message).trim()) return res.status(400).json({ error: 'Nachricht erforderlich' });

  try {
    await send_mail({ name, email, subject, message });
    return res.json({ ok: true });
  } catch (e) {
    console.error('send_mail failed', e);
    return res.status(502).json({ error: 'Mail send failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Mail backend listening on :${PORT}`);
});

// --- helpers ---
function isEmail(s) {
  return /^(?!.{255,})([a-zA-Z0-9_.+\-])+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/.test(String(s || ''));
}

export async function send_mail({ name = '', email = '', subject = '', message = '' }) {
  const to = process.env.TO_EMAIL || 'feedback@tinfo.space';
  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !fromEmail) {
    throw new Error('SMTP config missing (SMTP_HOST, SMTP_USER, SMTP_PASS, FROM_EMAIL)');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const cleanName = String(name).trim();
  const subj = (String(subject).trim() || 'Kontaktformular') + ' – tinfo.space';
  const text = `Neue Nachricht über das Kontaktformular\n\n` +
    `Name: ${cleanName || '-'}\n` +
    `E-Mail: ${email}\n` +
    `Betreff: ${String(subject).trim() || '-'}\n\n` +
    `Nachricht:\n${String(message).trim()}\n`;

  await transporter.sendMail({
    to,
    from: { name: cleanName ? `${cleanName} via Kontaktformular` : 'Kontaktformular', address: fromEmail },
    replyTo: { name: cleanName || email, address: email },
    subject: subj,
    text,
  });
}
