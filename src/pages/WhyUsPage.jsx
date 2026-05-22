import Contact from '../components/Contact.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Process from '../components/Process.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';

export default function WhyUsPage() {
  return (
    <>
      <PageHeader
        kicker="Why Choose Us"
        title="A dependable local partner for serious financial work."
        copy="QA & Associates combines professional expertise with local understanding, practical guidance, and responsive support."
      />
      <WhyChooseUs />
      <Process />
      <Contact />
    </>
  );
}
