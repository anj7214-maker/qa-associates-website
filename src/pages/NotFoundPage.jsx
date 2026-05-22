import PageHeader from '../components/PageHeader.jsx';

export default function NotFoundPage() {
  return (
    <>
      <PageHeader
        kicker="Page Not Found"
        title="This page is not available."
        copy="The page you are looking for may have moved. Use the navigation to continue."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <a href="/" className="focus-ring inline-flex rounded-lg bg-crimson px-5 py-3 text-sm font-extrabold text-white">
            Go Home
          </a>
        </div>
      </section>
    </>
  );
}
