import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { firm, navItems } from '../data.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/95 text-white shadow-lg shadow-navy/10 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <a href="#home" className="focus-ring flex items-center gap-3 rounded-lg">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-lg font-black text-navy">QA</span>
          <span>
            <span className="block text-base font-extrabold leading-tight sm:text-lg">{firm.name}</span>
            <span className="block text-xs font-semibold text-white/72">{firm.tagline}</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-bold text-white/82 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="/contact" className="focus-ring hidden items-center gap-2 rounded-lg bg-crimson px-5 py-3 text-sm font-extrabold shadow-lg shadow-crimson/25 transition hover:bg-red-700 lg:inline-flex">
            Get Consultation
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/" className="focus-ring rounded-lg bg-white p-1 shadow-lg shadow-black/10" aria-label="QA Associates logo">
            <img src={firm.logo} alt="QA Associates logo" className="h-10 w-10 rounded-md object-contain sm:h-12 sm:w-12" />
          </a>
          <button
            type="button"
            className="focus-ring inline-grid h-11 w-11 place-items-center rounded-lg border border-white/20 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-navy px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-bold text-white/84 hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              className="focus-ring mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-crimson px-5 py-3 text-sm font-extrabold"
              onClick={() => setIsOpen(false)}
            >
              Get Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
