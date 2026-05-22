export default function PageHeader({ kicker, title, copy }) {
  return (
    <section className="financial-hero relative isolate overflow-hidden pt-28 text-white sm:pt-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-100">{kicker}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/78 sm:text-lg">{copy}</p>
      </div>
    </section>
  );
}
