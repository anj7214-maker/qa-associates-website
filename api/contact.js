import crypto from 'node:crypto';

const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimit = new Map();

const sanitizeText = (value = '', limit = 700) =>
  String(value).replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, limit);

const isValidEmail = (value = '') => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
const isValidIndianMobile = (value = '') => /^[6-9]\d{9}$/.test(String(value).replace(/\D/g, '').slice(-10));

const json = (response, status, payload) => {
  response.status(status).json(payload);
};

const getClientIp = (request) =>
  request.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
  request.headers['x-real-ip'] ||
  'unknown';

const validatePayload = (payload) => {
  const cleaned = {
    fullName: sanitizeText(payload.fullName, 80),
    email: sanitizeText(payload.email, 120).toLowerCase(),
    phone: String(payload.phone || '').replace(/\D/g, '').slice(-10),
    service: sanitizeText(payload.service, 80),
    message: sanitizeText(payload.message, 700),
    consent: Boolean(payload.consent),
    website: sanitizeText(payload.website, 80),
  };

  const errors = {};
  if (cleaned.fullName.length < 2) errors.fullName = 'Full name is required.';
  if (!isValidEmail(cleaned.email)) errors.email = 'Valid email is required.';
  if (!isValidIndianMobile(cleaned.phone)) errors.phone = 'Valid Indian mobile number is required.';
  if (!cleaned.service) errors.service = 'Service is required.';
  if (cleaned.message.length < 10) errors.message = 'Message must be at least 10 characters.';
  if (!cleaned.consent) errors.consent = 'Consent is required.';
  if (cleaned.website) errors.website = 'Spam protection triggered.';

  return { cleaned, errors };
};

const createEmailHtml = (lead) => `
  <div style="font-family:Arial,sans-serif;color:#14213d;line-height:1.6">
    <h2 style="color:#0B2C5D">New Website Inquiry - QA & Associates</h2>
    <p><strong>Full Name:</strong> ${lead.fullName}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    <p><strong>Service Required:</strong> ${lead.service}</p>
    <p><strong>Message:</strong></p>
    <p>${lead.message}</p>
    <hr />
    <p style="font-size:12px;color:#64748b">Consent recorded: Privacy Policy accepted and contact consent provided.</p>
  </div>
`;

const sendEmail = async (lead) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  const from = process.env.CONTACT_FROM_EMAIL || 'QA & Associates <onboarding@resend.dev>';
  const to = process.env.CONTACT_TO_EMAIL || 'qaacc17@gmail.com';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.email,
      subject: `Website Inquiry - ${lead.service}`,
      html: createEmailHtml(lead),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend email failed: ${text}`);
  }
};

const createGoogleAccessToken = async () => {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) return null;

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claim = Buffer.from(
    JSON.stringify({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }),
  ).toString('base64url');
  const unsignedToken = `${header}.${claim}`;
  const signature = crypto.createSign('RSA-SHA256').update(unsignedToken).sign(privateKey, 'base64url');

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsignedToken}.${signature}`,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google auth failed: ${text}`);
  }

  const data = await response.json();
  return data.access_token;
};

const appendToGoogleSheet = async (lead) => {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) return;

  const token = await createGoogleAccessToken();
  if (!token) return;

  const range = encodeURIComponent(process.env.GOOGLE_SHEET_RANGE || 'Leads!A:H');
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [[new Date().toISOString(), lead.fullName, lead.email, lead.phone, lead.service, lead.message, 'Website', 'Consent accepted']],
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Sheets append failed: ${text}`);
  }
};

export default async function handler(request, response) {
  response.setHeader('Content-Type', 'application/json');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, { ok: false, message: 'Method not allowed.' });
  }

  const clientIp = getClientIp(request);
  const lastRequest = rateLimit.get(clientIp) || 0;
  const now = Date.now();
  if (now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return json(response, 429, { ok: false, message: 'Please wait a minute before sending another inquiry.' });
  }
  rateLimit.set(clientIp, now);

  const { cleaned, errors } = validatePayload(request.body || {});
  if (Object.keys(errors).length > 0) {
    return json(response, 400, { ok: false, message: 'Please check the form details.', errors });
  }

  try {
    await sendEmail(cleaned);
    await appendToGoogleSheet(cleaned);
    return json(response, 200, { ok: true, message: 'Inquiry sent successfully.' });
  } catch (error) {
    console.error(error);
    return json(response, 500, {
      ok: false,
      message: 'Inquiry could not be sent right now. Please call or WhatsApp QA & Associates.',
    });
  }
}
