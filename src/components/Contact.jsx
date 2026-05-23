import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { firm, services } from '../data.js';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  service: 'GST Services',
  message: '',
  consent: false,
  website: '',
};

const sanitizeText = (value) => value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
const isValidIndianMobile = (value) => /^[6-9]\d{9}$/.test(value.replace(/\D/g, '').slice(-10));

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const lastSubmitRef = useRef(0);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    const cleanedPhone = form.phone.replace(/\D/g, '').slice(-10);

    if (!sanitizeText(form.fullName) || sanitizeText(form.fullName).length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!isValidEmail(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!isValidIndianMobile(form.phone)) {
      nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }

    if (!form.service) {
      nextErrors.service = 'Please select a service.';
    }

    if (!sanitizeText(form.message) || sanitizeText(form.message).length < 10) {
      nextErrors.message = 'Please add a short message with at least 10 characters.';
    }

    if (sanitizeText(form.message).length > 700) {
      nextErrors.message = 'Please keep the message under 700 characters.';
    }

    if (!form.consent) {
      nextErrors.consent = 'Consent is required before submitting.';
    }

    if (form.website) {
      nextErrors.website = 'Spam protection triggered.';
    }

    return { nextErrors, cleanedPhone };
  };

  const submitForm = (event) => {
    event.preventDefault();
    const now = Date.now();

    if (now - lastSubmitRef.current < 8000) {
      setStatus('error');
      setErrors({ form: 'Please wait a few seconds before sending another inquiry.' });
      return;
    }

    const { nextErrors, cleanedPhone } = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    lastSubmitRef.current = now;

    const cleanForm = {
      fullName: sanitizeText(form.fullName).slice(0, 80),
      email: form.email.trim().slice(0, 120),
      phone: cleanedPhone,
      service: sanitizeText(form.service).slice(0, 80),
      message: sanitizeText(form.message).slice(0, 700),
    };

    const subject = encodeURIComponent(`Website Inquiry - ${cleanForm.service}`);
    const body = encodeURIComponent(
      [
        `Full Name: ${cleanForm.fullName}`,
        `Email: ${cleanForm.email}`,
        `Phone: ${cleanForm.phone}`,
        `Service Required: ${cleanForm.service}`,
        '',
        'Message:',
        cleanForm.message,
        '',
        'Consent: I agree to the Privacy Policy and consent to being contacted by QA & Associates.',
      ].join('\n'),
    );

    window.setTimeout(() => {
      setStatus('success');
      window.location.href = `mailto:${firm.email}?subject=${subject}&body=${body}`;
    }, 500);
  };

  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <div>
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Send Inquiry</h2>
          <p className="section-copy">
            Share your requirement and QA & Associates will guide you on the next steps for filing, documentation, accounting, loans, or business support.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-mist px-4 py-3 text-sm font-bold text-navy">
            <ShieldCheck className="h-4 w-4 text-crimson" />
            Secure inquiry process with consent-based follow-up.
          </div>
          <div className="mt-8 space-y-4">
            <a href={`tel:${firm.dialPhone}`} className="focus-ring flex items-center gap-4 rounded-lg border border-slate-200 p-4 transition hover:border-crimson/30 hover:shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-navy text-white"><Phone className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm font-semibold text-slate-500">Phone</span>
                <span className="block font-extrabold text-navy">{firm.phone}</span>
              </span>
            </a>
            <a href={`mailto:${firm.email}`} className="focus-ring flex items-center gap-4 rounded-lg border border-slate-200 p-4 transition hover:border-crimson/30 hover:shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-crimson text-white"><Mail className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm font-semibold text-slate-500">Email</span>
                <span className="block font-extrabold text-navy">{firm.displayEmail}</span>
              </span>
            </a>
            <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-navy text-white"><MapPin className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm font-semibold text-slate-500">Address</span>
                <span className="block font-extrabold leading-6 text-navy">{firm.address}</span>
              </span>
            </div>
          </div>
        </div>

        <form
          className="rounded-lg border border-slate-200 bg-mist p-5 shadow-soft sm:p-8"
          onSubmit={submitForm}
          noValidate
        >
          <input
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
            name="website"
            type="text"
            value={form.website}
            onChange={updateField}
            aria-hidden="true"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-navy">
              Full Name
              <input
                className="focus-ring rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink"
                name="fullName"
                type="text"
                placeholder="Your full name"
                value={form.fullName}
                onChange={updateField}
                maxLength="80"
                required
              />
              {errors.fullName && <span className="text-xs font-semibold text-crimson">{errors.fullName}</span>}
            </label>
            <label className="grid gap-2 text-sm font-bold text-navy">
              Phone Number
              <input
                className="focus-ring rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink"
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={updateField}
                maxLength="16"
                required
              />
              {errors.phone && <span className="text-xs font-semibold text-crimson">{errors.phone}</span>}
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-bold text-navy">
            Email
            <input
              className="focus-ring rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink"
              name="email"
              type="email"
              placeholder="Your email address"
              value={form.email}
              onChange={updateField}
              maxLength="120"
              required
            />
            {errors.email && <span className="text-xs font-semibold text-crimson">{errors.email}</span>}
          </label>
          <label className="mt-5 grid gap-2 text-sm font-bold text-navy">
            Service Required
            <select
              className="focus-ring rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink"
              name="service"
              value={form.service}
              onChange={updateField}
              required
            >
              {services.map((service) => (
                <option key={service.title}>{service.title}</option>
              ))}
            </select>
            {errors.service && <span className="text-xs font-semibold text-crimson">{errors.service}</span>}
          </label>
          <label className="mt-5 grid gap-2 text-sm font-bold text-navy">
            Message
            <textarea
              className="focus-ring min-h-36 rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink"
              name="message"
              placeholder="Tell us what you need help with"
              value={form.message}
              onChange={updateField}
              maxLength="700"
              required
            />
            <span className="text-xs font-semibold text-slate-500">{form.message.length}/700 characters</span>
            {errors.message && <span className="text-xs font-semibold text-crimson">{errors.message}</span>}
          </label>
          <label className="mt-5 flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-600">
            <input
              className="mt-1 h-4 w-4 accent-crimson"
              name="consent"
              type="checkbox"
              checked={form.consent}
              onChange={updateField}
              required
            />
            <span>
              I agree to the <a className="font-extrabold text-crimson hover:text-red-700" href="/privacy-policy">Privacy Policy</a> and consent to being contacted by QA & Associates.
            </span>
          </label>
          {errors.consent && <p className="mt-2 text-xs font-semibold text-crimson">{errors.consent}</p>}
          {errors.form && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-crimson">{errors.form}</p>}
          {status === 'success' && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-navy">
              <CheckCircle2 className="h-4 w-4 text-crimson" />
              Inquiry prepared securely. Your email app should open now.
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-crimson px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-crimson/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === 'loading' ? 'Preparing Inquiry...' : 'Send Inquiry'}
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
            This static form uses browser-based mail submission now and is structured for CAPTCHA or secure backend processing later.
          </p>
        </form>
      </div>
    </section>
  );
}
