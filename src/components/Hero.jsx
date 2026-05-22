import { ArrowRight, BarChart3, CheckCircle2, FileText, Phone, Sparkles } from 'lucide-react';
import { firm, heroHighlights } from '../data.js';

export default function Hero() {
  return (
    <section id="home" className="financial-hero relative isolate overflow-hidden pt-28 text-white sm:pt-32">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-24">
        <div className="animate-floatUp">
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
            <Sparkles className="h-4 w-4 text-red-200" />
            Premium financial consultancy in Mendhar
          </div>
          <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Trusted GST, Tax & Business Solutions
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            Professional GST Filing, Income Tax, Accounting and Business Advisory Services in Mendhar, Poonch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#services" className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-crimson px-6 py-4 text-sm font-extrabold shadow-xl shadow-crimson/25 transition hover:bg-red-700">
              Our Services
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-4 text-sm font-extrabold backdrop-blur transition hover:bg-white/15">
              Contact Us
              <Phone className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-9 grid max-w-2xl gap-3 sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div key={item.title} className="rounded-lg border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                <CheckCircle2 className="mb-3 h-5 w-5 text-red-100" />
                <h2 className="text-sm font-extrabold">{item.title}</h2>
                <p className="mt-1 text-xs leading-5 text-white/68">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 animate-floatUp rounded-lg border border-white/15 bg-white p-5 text-ink shadow-2xl shadow-black/20 [animation-delay:150ms]">
          <div className="rounded-lg bg-mist p-6">
            <div className="grid gap-6 sm:grid-cols-[0.78fr_1fr] sm:items-center">
              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <img src={firm.logo} alt="QA Associates logo" className="mx-auto aspect-square w-full max-w-[190px] rounded-md object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy text-white">
                    <BarChart3 className="h-6 w-6" />
                  </span>
                  <p className="section-kicker">QA & Associates</p>
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-navy">Complete compliance and documentation desk.</h2>
              </div>
            </div>
            <div className="mt-7 grid gap-4">
              {['GST and income tax filing', 'Accounting and CA documentation', 'Loan, DPR, and business support'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-crimson/10 text-crimson">
                    <FileText className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-extrabold text-navy">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-navy p-5 text-white">
              <p className="text-sm font-semibold text-white/70">Office Address</p>
              <p className="mt-2 text-sm font-bold leading-6">{firm.address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
