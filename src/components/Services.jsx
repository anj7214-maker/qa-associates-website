import { CheckCircle2 } from 'lucide-react';
import { services } from '../data.js';

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Services</p>
          <h2 className="section-title">Professional tax, compliance, finance and advisory services.</h2>
          <p className="section-copy mx-auto">
            Premium service support for individuals, professionals, shop owners, contractors, growing businesses, and students across Mendhar and Poonch.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isFinalCard = index === services.length - 1;
            return (
              <article
                key={service.title}
                className={`group flex min-h-[300px] flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-crimson/30 hover:shadow-soft ${
                  isFinalCard ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''
                }`}
              >
                <div className="grid h-14 w-14 place-items-center rounded-lg bg-navy text-white shadow-lg shadow-navy/10 transition group-hover:bg-crimson">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-navy">{service.title}</h3>
                <ul className="mt-5 space-y-3">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-600">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-crimson" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
