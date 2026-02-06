import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body ?? {};

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (email.length > 320) {
    return res.status(400).json({ error: 'Email address is too long.' });
  }

  // TODO: Replace with your actual storage/email service integration:
  // - Resend: await resend.contacts.create({ email, audienceId: '...' })
  // - ConvertKit: await fetch('https://api.convertkit.com/v3/forms/FORM_ID/subscribe', ...)
  // - Vercel KV: await kv.sadd('waitlist', email)
  // For now, log to Vercel function logs (visible in Vercel dashboard)
  console.log(`[waitlist] New signup: ${email} at ${new Date().toISOString()}`);

  return res.status(200).json({ success: true });
}
