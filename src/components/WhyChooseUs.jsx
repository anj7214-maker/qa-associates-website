import { CheckCircle2 } from 'lucide-react';
import { whyChoose } from '../data.js';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-navy py-20 text-white sm:py-24">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-x-0 bottom-0 h-56 bg-white [clip-path:polygon(0_100%,0_68%,15%_52%,29%_70%,44%_38%,60%_74%,76%_45%,90%_66%,100%_54%,100%_100%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-100">Why Choose Us</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Why Businesses Trust QA & Associates</h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/72">
            A dependable local consultancy for serious filing, documentation, compliance, and business support.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-lg border border-white/12 bg-white/10 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-white text-navy">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-extrabold">{item.title}</h3>
                </div>
                <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-white/74">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-red-100" />
                  <p>Clear, practical guidance with careful attention to documents, timelines, and client needs.</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
