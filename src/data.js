import {
  BadgeCheck,
  Banknote,
  BookOpenCheck,
  BriefcaseBusiness,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Landmark,
  MapPin,
  Scale,
  ShieldCheck,
  Timer,
  UsersRound,
} from 'lucide-react';

export const firm = {
  name: 'QA & Associates',
  tagline: 'GST & Income Tax Consultants',
  phone: '9906688040',
  dialPhone: '+919906688040',
  email: 'qaacc17@gmail.com',
  address: 'Opp. JK Bank Khidmat Centre, Mendhar, Poonch, Jammu & Kashmir',
  logo: '/assets/qa-associates-logo.jpeg',
};

export const whatsappUrl = `https://wa.me/91${firm.phone}?text=${encodeURIComponent(
  'Hello QA & Associates, I need consultation for GST, tax, or business services.',
)}`;

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

export const trustItems = [
  { title: 'GST Experts', icon: FileCheck2 },
  { title: 'Timely Filing', icon: Timer },
  { title: 'Local Presence', icon: MapPin },
  { title: 'Trusted Business Support', icon: UsersRound },
];

export const services = [
  {
    title: 'GST Services',
    icon: FileCheck2,
    items: ['GST Registration', 'GST Return Filing', 'GST Compliance', 'GST Advisory'],
  },
  {
    title: 'Income Tax Services',
    icon: Calculator,
    items: ['ITR Filing', 'Revised Returns', 'Tax Consultation', 'Tax Audit Support'],
  },
  {
    title: 'Accounting Services',
    icon: BookOpenCheck,
    items: ['Bookkeeping', 'Financial Statements', 'Accounting Support', 'Compliance Reporting'],
  },
  {
    title: 'Business Advisory',
    icon: BriefcaseBusiness,
    items: ['Business Registration', 'MSME / Udyam Registration', 'Business Setup Support', 'Documentation Assistance'],
  },
  {
    title: 'Loan Assistance',
    icon: Banknote,
    items: ['Housing Loan Guidance', 'Car Loan Assistance', 'Project Report (DPR)'],
  },
  {
    title: 'Career & Education Support',
    icon: GraduationCap,
    items: ['Career Guidance', 'Admission Support', 'Resume Building', 'Skill Development'],
  },
  {
    title: 'CA Services',
    icon: Scale,
    items: ['Balance Sheet', 'Project Report', 'CA Certificate', 'Income Tax Audit'],
  },
];

export const whyChoose = [
  { title: 'Professional Expertise', icon: Landmark },
  { title: 'Transparent Process', icon: ClipboardCheck },
  { title: 'Timely Compliance', icon: Timer },
  { title: 'Personalized Guidance', icon: UsersRound },
  { title: 'Local Understanding', icon: MapPin },
  { title: 'Complete Business Support', icon: ShieldCheck },
];

export const aboutPoints = [
  'Local presence in Mendhar',
  'Professional tax and compliance support',
  'Business-focused advisory',
  'Client-first approach',
];

export const processSteps = [
  { step: '01', title: 'Contact Us', copy: 'Tell us the service you need and the deadline you are working toward.' },
  { step: '02', title: 'Share Documents', copy: 'Send the required documents through a simple, organized checklist.' },
  { step: '03', title: 'Expert Review', copy: 'Your details are checked carefully for compliance, accuracy, and completeness.' },
  { step: '04', title: 'Filing / Documentation Completion', copy: 'We complete the filing, report, certificate, or documentation support.' },
];

export const footerServices = [
  'GST Services',
  'Income Tax Services',
  'Accounting',
  'CA Services',
  'Loan Assistance',
  'Business Advisory',
];

export const heroHighlights = [
  { title: 'GST Filing', copy: 'Returns, registration, and compliance guidance.' },
  { title: 'Tax Advisory', copy: 'Income tax filing and documentation support.' },
  { title: 'Business Desk', copy: 'Setup, DPR, CA documents, and advisory.' },
];

export const credibilityPoints = [
  'Accurate documentation',
  'Clear communication',
  'Local Mendhar support',
  'Business-ready compliance',
];

export const checkIcon = BadgeCheck;
