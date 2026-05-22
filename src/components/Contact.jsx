import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { firm, services } from '../data.js';

export default function Contact() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <div>
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Send Inquiry</h2>
          <p className="section-copy">
            Share your requirement and QA & Associates will guide you on the next steps for filing, documentation, accounting, loans, or business support.
          </p>
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
                <span className="block font-extrabold text-navy">{firm.email}</span>
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
          action={`mailto:${firm.email}`}
          method="post"
          encType="text/plain"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-navy">
              Name
              <input className="focus-ring rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink" name="name" type="text" placeholder="Your name" required />
            </label>
            <label className="grid gap-2 text-sm font-bold text-navy">
              Phone
              <input className="focus-ring rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink" name="phone" type="tel" placeholder="Your phone number" required />
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-bold text-navy">
            Email
            <input className="focus-ring rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink" name="email" type="email" placeholder="Your email address" />
          </label>
          <label className="mt-5 grid gap-2 text-sm font-bold text-navy">
            Service Required
            <select className="focus-ring rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink" name="service" defaultValue="GST Services">
              {services.map((service) => (
                <option key={service.title}>{service.title}</option>
              ))}
            </select>
          </label>
          <label className="mt-5 grid gap-2 text-sm font-bold text-navy">
            Message
            <textarea className="focus-ring min-h-36 rounded-lg border border-slate-200 bg-white px-4 py-3 text-ink" name="message" placeholder="Tell us what you need help with" />
          </label>
          <button type="submit" className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-crimson px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-crimson/20 transition hover:bg-red-700 sm:w-auto">
            Send Inquiry
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
