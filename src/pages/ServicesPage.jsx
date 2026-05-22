import Contact from '../components/Contact.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Services from '../components/Services.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="Services"
        title="GST, income tax, accounting, CA and business services."
        copy="Explore the professional services offered by QA & Associates for clients in Mendhar, Poonch, Jammu and Kashmir."
      />
      <Services />
      <WhyChooseUs />
      <Contact />
    </>
  );
}
