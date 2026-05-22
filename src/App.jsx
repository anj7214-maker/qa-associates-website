import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import FloatingButtons from './components/FloatingButtons.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import LocalPresence from './components/LocalPresence.jsx';
import Navbar from './components/Navbar.jsx';
import Process from './components/Process.jsx';
import Services from './components/Services.jsx';
import TrustBar from './components/TrustBar.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <WhyChooseUs />
        <About />
        <Process />
        <LocalPresence />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
