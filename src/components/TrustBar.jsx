import { trustItems } from '../data.js';

export default function TrustBar() {
  return (
    <section className="relative z-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3 rounded-lg bg-mist px-4 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-extrabold text-navy">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
