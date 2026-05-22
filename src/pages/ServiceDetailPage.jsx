import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Contact from '../components/Contact.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { services } from '../data.js';

export default function ServiceDetailPage({ slug }) {
  const service = services.find((item) => item.slug === slug) ?? services[0];
  const Icon = service.icon;

  return (
    <>
      <PageHeader kicker="Service Details" title={service.title} copy={service.summary} />
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <aside className="rounded-lg bg-mist p-6 shadow-soft">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-navy text-white">
              <Icon className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-navy">{service.title}</h2>
            <p className="mt-4 leading-7 text-slate-600">{service.summary}</p>
            <a href="/contact" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-lg bg-crimson px-5 py-3 text-sm font-extrabold text-white transition hover:bg-red-700">
              Ask for Help
              <ArrowRight className="h-4 w-4" />
            </a>
          </aside>
          <div>
            <p className="section-kicker">What We Help With</p>
            <h2 className="section-title">Focused support for documentation and compliance.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.items.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-crimson" />
                  <div>
                    <h3 className="font-extrabold text-navy">{item}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Clear guidance, careful document preparation, and timely follow-up from QA & Associates.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
}
