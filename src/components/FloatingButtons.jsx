import { MessageCircle, Phone } from 'lucide-react';
import { firm, whatsappUrl } from '../data.js';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 sm:right-6">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="focus-ring grid h-14 w-14 place-items-center rounded-lg bg-[#25D366] text-white shadow-xl shadow-emerald-800/20 transition hover:-translate-y-1"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a
        href={`tel:${firm.dialPhone}`}
        className="focus-ring grid h-14 w-14 place-items-center rounded-lg bg-crimson text-white shadow-xl shadow-red-900/20 transition hover:-translate-y-1"
        aria-label="Call QA & Associates"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
