import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';
import Hero from '../components/Hero.jsx';
import LocalPresence from '../components/LocalPresence.jsx';
import Process from '../components/Process.jsx';
import Services from '../components/Services.jsx';
import TrustBar from '../components/TrustBar.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <WhyChooseUs />
      <About />
      <Process />
      <LocalPresence />
      <Contact />
    </>
  );
}
