import FloatingButtons from './components/FloatingButtons.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import WhyUsPage from './pages/WhyUsPage.jsx';

function CurrentPage() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/') return <HomePage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/services') return <ServicesPage />;
  if (path.startsWith('/services/')) return <ServiceDetailPage slug={path.split('/').pop()} />;
  if (path === '/why-us') return <WhyUsPage />;
  if (path === '/contact') return <ContactPage />;
  return <NotFoundPage />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <CurrentPage />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
