import Contact from '../components/Contact.jsx';
import LocalPresence from '../components/LocalPresence.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Start with a quick consultation."
        copy="Call, email, WhatsApp, or send an inquiry to QA & Associates for GST, tax, accounting, CA, loan, education, and business support."
      />
      <Contact />
      <LocalPresence />
    </>
  );
}
