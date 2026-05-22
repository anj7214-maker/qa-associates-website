import About from '../components/About.jsx';
import LocalPresence from '../components/LocalPresence.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Process from '../components/Process.jsx';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About QA & Associates"
        title="Professional tax and business consulting rooted in Mendhar."
        copy="Learn about QA & Associates, a local consultancy supporting individuals, professionals, and businesses across Mendhar, Poonch, and nearby areas."
      />
      <About />
      <Process />
      <LocalPresence />
    </>
  );
}
