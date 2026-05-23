import { ShieldCheck } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { firm } from '../data.js';

const pages = {
  'privacy-policy': {
    kicker: 'Privacy',
    title: 'Privacy Policy',
    updated: 'Last updated: May 23, 2026',
    intro:
      'QA & Associates respects the privacy of clients and website visitors. This policy explains how inquiry details and consultation-related information are handled when you contact us for GST, ITR, compliance, CA documentation, loan, business, education, or related professional support.',
    sections: [
      {
        title: 'Information We Collect',
        copy: [
          'We may collect your name, phone number, email address, selected service, message, and documents or details you voluntarily share for consultation or inquiry purposes.',
          'For GST, ITR, tax, accounting, CA certification, balance sheet, project report, and compliance work, additional financial or identity information may be requested directly by our office only when required for the service.',
          'Website inquiry details may be delivered to QA & Associates by email and may be recorded in a controlled lead register such as Google Sheets for follow-up and service tracking.',
        ],
      },
      {
        title: 'How We Use Information',
        copy: [
          'Information is used to respond to inquiries, understand your service requirement, provide consultation, prepare documentation, support filing, and communicate about related professional services.',
          'We do not sell personal information. We do not use inquiry data for unrelated third-party marketing.',
          'Inquiry automation services, such as email delivery or spreadsheet storage, are used only to support contact handling and client follow-up.',
        ],
      },
      {
        title: 'Data Retention',
        copy: [
          'Inquiry information may be retained for follow-up, compliance records, service continuity, and legal or professional recordkeeping requirements.',
          'Documents shared for professional work are retained only as reasonably necessary for the service, applicable compliance obligations, and client support.',
        ],
      },
      {
        title: 'Security Measures',
        copy: [
          'The website is prepared for HTTPS delivery, security headers, protected contact flows, and safer browser behavior.',
          'No online transmission is completely risk-free. Sensitive tax or financial documents should be shared only through channels confirmed by QA & Associates.',
        ],
      },
      {
        title: 'Your Rights',
        copy: [
          'You may request correction, update, or deletion of inquiry information where legally and practically possible.',
          `For privacy or data requests, contact ${firm.name} at ${firm.email} or ${firm.phone}.`,
        ],
      },
    ],
  },
  terms: {
    kicker: 'Terms',
    title: 'Terms & Conditions',
    updated: 'Last updated: May 23, 2026',
    intro:
      'These terms apply to use of the QA & Associates website and communication initiated through this website. By using the website, you agree to use the information responsibly and provide accurate details when requesting professional support.',
    sections: [
      {
        title: 'Informational Purpose',
        copy: [
          'Website content is provided for general information about GST filing, income tax return support, accounting, CA-related documentation, project reports, business advisory, and related services.',
          'Content on this website should not be treated as final legal, tax, financial, or audit advice without direct professional review of your facts and documents.',
        ],
      },
      {
        title: 'No Guarantee of Outcome',
        copy: [
          'QA & Associates works to provide accurate and timely support, but no specific tax, refund, assessment, approval, loan, certification, or compliance outcome is guaranteed.',
          'Final outcomes may depend on government portals, banks, authorities, client documents, legal requirements, and third-party decisions.',
        ],
      },
      {
        title: 'User Responsibility',
        copy: [
          'Clients are responsible for submitting correct, complete, and truthful documents, declarations, identity details, financial records, and supporting information.',
          'Delays or errors caused by incomplete, incorrect, or late information remain the responsibility of the client.',
        ],
      },
      {
        title: 'Limitation of Liability',
        copy: [
          'QA & Associates is not liable for indirect losses, penalties, delays, or consequences arising from inaccurate client information, unavailable portals, third-party systems, or decisions of authorities.',
          'Service responsibility is limited to the specific professional support agreed with the client.',
        ],
      },
    ],
  },
  disclaimer: {
    kicker: 'Disclaimer',
    title: 'Disclaimer',
    updated: 'Last updated: May 23, 2026',
    intro:
      'The information on this website is intended to introduce QA & Associates and its professional service areas. It should be read as general information, not as a substitute for case-specific tax, financial, legal, or audit advice.',
    sections: [
      {
        title: 'Tax & Financial Guidance',
        copy: [
          'GST, ITR, CA documentation, tax audit, balance sheet, project report, and compliance requirements can vary depending on facts, documents, deadlines, legal updates, and authority rules.',
          'Visitors should consult QA & Associates directly before making financial, tax, compliance, or documentation decisions.',
        ],
      },
      {
        title: 'Website Usage',
        copy: [
          'The website does not create a professional engagement by itself. A service relationship begins only after the requirement, documents, scope, and communication are accepted by QA & Associates.',
          'External links, phone calls, WhatsApp messages, or emails are provided for convenience and direct communication.',
        ],
      },
    ],
  },
  'data-request': {
    kicker: 'Data Request',
    title: 'Contact / Data Request',
    updated: 'Response channel for privacy and contact updates',
    intro:
      'Use this page to request correction, update, deletion, or clarification regarding inquiry information shared through the website.',
    sections: [
      {
        title: 'How To Contact Us',
        copy: [
          `Email QA & Associates at ${firm.email} with the subject "Data Request" and include your name, phone number, and the request details.`,
          `You may also call ${firm.phone} for contact updates, inquiry corrections, or privacy-related questions.`,
        ],
      },
      {
        title: 'Verification',
        copy: [
          'For safety, QA & Associates may verify your identity before acting on requests related to personal, tax, financial, or document-related information.',
          'Requests are handled reasonably, subject to professional, compliance, legal, and recordkeeping obligations.',
        ],
      },
    ],
  },
};

export default function LegalPage({ type }) {
  const page = pages[type] ?? pages['privacy-policy'];

  return (
    <>
      <PageHeader kicker={page.kicker} title={page.title} copy={page.intro} />
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-mist p-5 shadow-soft sm:p-8">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="section-kicker">{firm.name}</p>
                <h2 className="mt-2 text-2xl font-extrabold text-navy">{page.title}</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-navy shadow-sm">
                <ShieldCheck className="h-4 w-4 text-crimson" />
                {page.updated}
              </div>
            </div>
            <div className="mt-8 space-y-8">
              {page.sections.map((section) => (
                <article key={section.title}>
                  <h3 className="text-xl font-extrabold text-navy">{section.title}</h3>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
                    {section.copy.map((copy) => (
                      <p key={copy}>{copy}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-lg bg-navy p-5 text-white">
              <p className="text-sm font-bold text-white/70">Official Contact</p>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <a className="font-extrabold hover:text-red-100" href={`mailto:${firm.email}`}>{firm.email}</a>
                <a className="font-extrabold hover:text-red-100" href={`tel:${firm.dialPhone}`}>{firm.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
