import { processSteps } from '../data.js';

export default function Process() {
  return (
    <section className="bg-mist py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Process</p>
          <h2 className="section-title">Simple & Hassle-Free Process</h2>
          <p className="section-copy mx-auto">
            A clear workflow for GST, tax, accounting, CA documentation, loan assistance, and business advisory work.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item) => (
            <article key={item.step} className="relative rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
              <span className="text-sm font-black text-crimson">{item.step}</span>
              <h3 className="mt-4 text-xl font-extrabold text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
