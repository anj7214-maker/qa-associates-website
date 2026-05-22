import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { firm, whatsappUrl } from '../data.js';

export default function LocalPresence() {
  return (
    <section className="local-presence relative overflow-hidden bg-navy py-20 text-white sm:py-24">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-100">Local Presence</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Proudly Serving Mendhar & Surrounding Areas</h2>
          <p className="mt-5 max-w-2xl leading-8 text-white/78">
            Located near JK Bank Khidmat Centre, QA & Associates supports individuals, shop owners, professionals and businesses across Mendhar, Poonch and nearby areas.
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 text-ink shadow-2xl shadow-black/20">
          <MapPin className="h-10 w-10 text-crimson" />
          <h3 className="mt-4 text-2xl font-extrabold text-navy">QA & Associates</h3>
          <p className="mt-3 leading-7 text-slate-600">{firm.address}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a href={`tel:${firm.dialPhone}`} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#123a74]">
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-crimson px-4 py-3 text-sm font-extrabold text-white transition hover:bg-red-700">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
