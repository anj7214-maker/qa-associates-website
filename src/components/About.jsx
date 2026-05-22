import { CheckCircle2, FileCheck2 } from 'lucide-react';
import { aboutPoints } from '../data.js';

export default function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <p className="section-kicker">About Us</p>
          <h2 className="section-title">About QA & Associates</h2>
          <p className="section-copy">
            QA & Associates is a professional consultancy firm providing GST, Income Tax, Accounting, CA-related documentation, Loan Assistance and Business Support services in Mendhar, Poonch and nearby regions. We help individuals, professionals and businesses manage their tax, compliance and financial documentation requirements with accuracy, transparency and timely support.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutPoints.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-crimson" />
                <p className="font-extrabold text-navy">{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg bg-mist p-6 shadow-soft">
          <div className="rounded-lg bg-white p-6">
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-navy text-white">
              <FileCheck2 className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-2xl font-extrabold text-navy">Client-first professional support.</h3>
            <p className="mt-4 leading-7 text-slate-600">
              The firm is built for people who want accurate work, organized documentation, and approachable guidance close to home.
            </p>
            <div className="mt-6 rounded-lg bg-navy p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-100">Mendhar Focus</p>
              <p className="mt-3 text-sm leading-6 text-white/76">
                Local presence backed by modern communication through phone, email, and WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
