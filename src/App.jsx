import FloatingButtons from './components/FloatingButtons.jsx';
import Footer from './components/Footer.jsx';
import Navbar from './components/Navbar.jsx';
import Seo from './components/Seo.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ReadinessHubPage from './pages/ReadinessHubPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import WhyUsPage from './pages/WhyUsPage.jsx';

function CurrentPage() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  const page = (title, description, component) => (
    <>
      <Seo title={title} description={description} path={path} />
      {component}
    </>
  );

  if (path === '/') {
    return page(
      'QA & Associates | GST, ITR, CA & Tax Consultants in Mendhar',
      'Secure GST filing, ITR filing, income tax audit, CA certificate, balance sheet, project report, and financial consultancy services in Mendhar, Poonch, Jammu & Kashmir.',
      <HomePage />,
    );
  }
  if (path === '/about') {
    return page(
      'About QA & Associates | Tax & Financial Consultancy in Mendhar',
      'Learn about QA & Associates, a professional GST, ITR, compliance, CA documentation, and financial consultancy firm serving Mendhar and Poonch.',
      <AboutPage />,
    );
  }
  if (path === '/services') {
    return page(
      'GST Filing, ITR, CA Services & Project Reports in Mendhar',
      'Explore GST filing, income tax return, income tax audit support, balance sheet preparation, project report, CA certificate, accounting, and business advisory services.',
      <ServicesPage />,
    );
  }
  if (path.startsWith('/services/')) {
    return page(
      'QA & Associates Services | GST, ITR, CA & Compliance Support',
      'Professional service details for GST filing, ITR filing, CA services, balance sheets, project reports, compliance, and tax documentation in Mendhar and Poonch.',
      <ServiceDetailPage slug={path.split('/').pop()} />,
    );
  }
  if (path === '/why-us') {
    return page(
      'Why Choose QA & Associates | Trusted Compliance Support',
      'Why businesses and individuals trust QA & Associates for transparent GST, tax, accounting, CA documentation, and business support in Mendhar.',
      <WhyUsPage />,
    );
  }
  if (path === '/contact') {
    return page(
      'Contact QA & Associates | GST, ITR & CA Services in Mendhar',
      'Contact QA & Associates for GST filing, ITR filing, tax consultation, CA certificate, balance sheet, project report, and compliance support in Mendhar.',
      <ContactPage />,
    );
  }
  if (path === '/readiness-hub') {
    return page(
      'Tax & Document Readiness Hub | GST, ITR & Loan File Check',
      'Use the QA & Associates Tax and Document Readiness Hub to check GST registration need, ITR regime estimate, and loan document readiness in Mendhar and Poonch.',
      <ReadinessHubPage />,
    );
  }
  if (path === '/privacy-policy') return page('Privacy Policy | QA & Associates', 'Privacy policy for QA & Associates website inquiries, GST, ITR, CA documentation, and contact data handling.', <LegalPage type="privacy-policy" />);
  if (path === '/terms') return page('Terms & Conditions | QA & Associates', 'Terms and conditions for using the QA & Associates website and requesting GST, ITR, tax, CA, and documentation services.', <LegalPage type="terms" />);
  if (path === '/disclaimer') return page('Disclaimer | QA & Associates', 'Professional disclaimer for tax, financial, GST, ITR, CA documentation, and website information from QA & Associates.', <LegalPage type="disclaimer" />);
  if (path === '/data-request') return page('Contact / Data Request | QA & Associates', 'Contact QA & Associates for privacy, data request, inquiry correction, or website contact information updates.', <LegalPage type="data-request" />);
  return page('Page Not Found | QA & Associates', 'The requested QA & Associates page could not be found.', <NotFoundPage />);
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
