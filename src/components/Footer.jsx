import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { firm, footerServices, legalLinks, navItems, serviceAreas } from '../data.js';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-9 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-lg font-black text-navy">QA</span>
            <div>
              <p className="text-lg font-extrabold">{firm.name}</p>
              <p className="text-sm text-white/70">{firm.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            Professional GST, income tax, accounting, CA documentation, loan assistance, and business advisory services in Mendhar, Poonch.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-xs font-bold text-white/80">
            <LockKeyhole className="h-4 w-4 text-red-100" />
            Secure HTTPS website with privacy-conscious inquiry handling.
          </div>
        </div>

        <div>
          <h3 className="font-extrabold">Quick Links</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/72">
            {navItems.filter((item) => item.label !== 'Why Us').map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">{item.label}</a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-extrabold">Services</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/72">
            {footerServices.map((service) => (
              <a key={service} href="/services" className="transition hover:text-white">{service}</a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-extrabold">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-white/72">
            <a href={`tel:${firm.dialPhone}`} className="hover:text-white">{firm.phone}</a>
            <a href={`mailto:${firm.email}`} className="hover:text-white" aria-label="Email QA and Associates">{firm.displayEmail}</a>
            <p>{firm.address}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_1fr_1fr] lg:px-8">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-red-100">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-extrabold">Secure Website Notice</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">
                This website is configured for HTTPS, security headers, safer contact links, and consent-based inquiry handling.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold">Legal</h3>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/72">
              {legalLinks.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-white">{item.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold">Service Areas</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span key={area} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white/76">{area}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/60">
        &copy; 2026 QA & Associates. All Rights Reserved.
      </div>
    </footer>
  );
}
