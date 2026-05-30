import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeIndianRupee,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Landmark,
  LockKeyhole,
  MessageCircle,
  Phone,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { firm } from '../data.js';

const tabs = [
  { id: 'gst', label: 'GST Health Check', target: 'Shop Owners & Retailers', icon: Store },
  { id: 'itr', label: 'ITR Simplifier', target: 'Employees & Professionals', icon: BadgeIndianRupee },
  { id: 'loan', label: 'Loan Document Assessor', target: 'Entrepreneurs', icon: Landmark },
];

const turnoverOptions = ['Under Rs 20 Lakhs', 'Rs 20 Lakhs to Rs 40 Lakhs', 'Rs 40 Lakhs to Rs 1.5 Crores', 'Above Rs 1.5 Crores'];
const businessTypes = ['Kiryana/Grocery', 'Pharmacy', 'Electronics/Hardware', 'Cloth/Garments', 'Others'];
const loanTypes = ['Business Expansion Loan', 'Mudra Loan', 'PMEGP Scheme', 'Personal/Car Loan'];
const savingsOptions = [
  { key: 'lic', label: 'Life Insurance (LIC) / PPF', value: 150000 },
  { key: 'school', label: "Children's School Fees", value: 100000 },
  { key: 'health', label: 'Health Insurance Premium', value: 25000 },
  { key: 'home', label: 'Home Loan Repayment', value: 200000 },
];

const initialLead = { fullName: '', phone: '', location: '' };
const initialInputs = {
  gst: { businessType: 'Kiryana/Grocery', turnoverIndex: 0, outsideJk: 'No' },
  itr: { income: 800000, savings: { lic: false, school: false, health: false, home: false } },
  loan: { loanType: 'Business Expansion Loan', hasItr: 'No' },
};

const formatRupees = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(amount)));

const calculateOldTax = (income, savings) => {
  const section80c = Math.min(150000, (savings.lic ? 150000 : 0) + (savings.school ? 100000 : 0) + (savings.home ? 150000 : 0));
  const health = savings.health ? 25000 : 0;
  const standardDeduction = 50000;
  const taxable = Math.max(0, income - section80c - health - standardDeduction);

  if (taxable <= 500000) return { taxable, tax: 0, deduction: income - taxable };
  let tax = 0;
  if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;
  if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.2;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.3;
  return { taxable, tax: tax * 1.04, deduction: income - taxable };
};

const calculateNewTax = (income) => {
  const taxable = Math.max(0, income - 50000);
  if (taxable <= 700000) return { taxable, tax: 0, deduction: 50000 };
  const slabs = [
    [300000, 700000, 0.05],
    [700000, 1000000, 0.1],
    [1000000, 1200000, 0.15],
    [1200000, 1500000, 0.2],
    [1500000, Infinity, 0.3],
  ];
  const tax = slabs.reduce((total, [from, to, rate]) => {
    if (taxable <= from) return total;
    return total + (Math.min(taxable, to) - from) * rate;
  }, 0);
  return { taxable, tax: tax * 1.04, deduction: 50000 };
};

const buildWhatsAppText = (tabId, lead, inputs) => {
  if (tabId === 'gst') {
    return `Hi QA & Associates, my name is ${lead.fullName} from ${lead.location}. I just used your GST tool. I run a ${inputs.gst.businessType} with turnover ${turnoverOptions[inputs.gst.turnoverIndex]} and want to consult you regarding regular GST filing. My phone number is ${lead.phone}.`;
  }
  if (tabId === 'itr') {
    return `Hi QA & Associates, my name is ${lead.fullName} from ${lead.location}. I checked my tax estimate on your portal. My approximate income is ${formatRupees(inputs.itr.income)} and I want to book an appointment to file my ITR accurately.`;
  }
  return `Hi QA & Associates, my name is ${lead.fullName} from ${lead.location}. I am planning to apply for a ${inputs.loan.loanType} and need your help preparing my Project Report and Balance Sheets. Please review my file.`;
};

function FieldLabel({ children }) {
  return <label className="text-sm font-extrabold text-[#0F294A]">{children}</label>;
}

function SelectField({ value, onChange, children }) {
  return (
    <div className="relative">
      <select value={value} onChange={onChange} className="focus-ring w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-bold text-slate-700 shadow-sm">
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

function ResultGate({ unlocked, onUnlockClick, children }) {
  return (
    <div className="relative mt-7">
      <div className={unlocked ? '' : 'select-none blur-[5px]'}>{children}</div>
      {!unlocked && (
        <div className="absolute inset-0 grid place-items-center rounded-lg bg-white/72 p-4 backdrop-blur-[2px]">
          <button type="button" onClick={onUnlockClick} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 text-sm font-black text-[#0F294A] shadow-xl shadow-emerald-500/25 transition hover:bg-[#1ec45b]">
            <LockKeyhole className="h-5 w-5" />
            Unlock Analysis & Results
          </button>
        </div>
      )}
    </div>
  );
}

function GstPanel({ inputs, setInputs, unlocked, onUnlockClick, lead }) {
  const needsGst = inputs.turnoverIndex > 0 || inputs.outsideJk === 'Yes';
  const whatsappText = buildWhatsAppText('gst', lead, { gst: inputs });

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black text-[#0F294A]">GST Health Check</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">For local retailers, shop owners, and traders checking whether GST registration and filing support may be needed.</p>
        <div className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <FieldLabel>Business Type</FieldLabel>
            <SelectField value={inputs.businessType} onChange={(event) => setInputs((current) => ({ ...current, businessType: event.target.value }))}>
              {businessTypes.map((type) => <option key={type}>{type}</option>)}
            </SelectField>
          </div>
          <div className="grid gap-3">
            <FieldLabel>Rough Annual Turnover</FieldLabel>
            <input type="range" min="0" max="3" value={inputs.turnoverIndex} onChange={(event) => setInputs((current) => ({ ...current, turnoverIndex: Number(event.target.value) }))} className="accent-[#25D366]" />
            <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-black text-[#0F294A]">{turnoverOptions[inputs.turnoverIndex]}</div>
          </div>
          <div className="grid gap-3">
            <FieldLabel>Do you purchase goods from outside Jammu & Kashmir?</FieldLabel>
            <div className="grid grid-cols-2 gap-3">
              {['Yes', 'No'].map((value) => (
                <button key={value} type="button" onClick={() => setInputs((current) => ({ ...current, outsideJk: value }))} className={`focus-ring rounded-lg border px-4 py-3 text-sm font-black transition ${inputs.outsideJk === value ? 'border-[#25D366] bg-[#25D366]/12 text-[#0F294A]' : 'border-slate-200 bg-white text-slate-600 hover:border-[#25D366]'}`}>
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ResultGate unlocked={unlocked} onUnlockClick={onUnlockClick}>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className={`rounded-lg border p-5 ${needsGst ? 'border-amber-200 bg-amber-50' : 'border-emerald-200 bg-emerald-50'}`}>
            <p className={`text-xs font-black uppercase tracking-[0.16em] ${needsGst ? 'text-amber-700' : 'text-emerald-700'}`}>{needsGst ? 'Action Required' : 'Credibility Opportunity'}</p>
            <h3 className="mt-3 text-2xl font-black text-[#0F294A]">
              {needsGst ? 'GST Registration is likely mandatory.' : 'GST Registration is optional but beneficial.'}
            </h3>
            <p className="mt-3 leading-7 text-slate-700">
              {needsGst
                ? 'Your turnover bracket or outside J&K sourcing indicates that GST registration and regular filing should be reviewed immediately.'
                : 'Based on your inputs, registration may be optional, but it can improve business credibility and help with future expansion.'}
            </p>
          </div>
          <div className="mt-4 rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-bold leading-6 text-red-700">
            Note: Missing monthly or quarterly GST filing deadlines can attract a late fee of up to Rs 50 per day.
          </div>
          <a href={`https://wa.me/919906688040?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer" className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 text-sm font-black text-[#0F294A] transition hover:bg-[#1ec45b] sm:w-auto">
            <MessageCircle className="h-5 w-5" />
            Discuss GST on WhatsApp
          </a>
        </div>
      </ResultGate>
    </div>
  );
}

function ItrPanel({ inputs, setInputs, unlocked, onUnlockClick, lead }) {
  const oldTax = calculateOldTax(inputs.income, inputs.savings);
  const newTax = calculateNewTax(inputs.income);
  const recommended = oldTax.tax <= newTax.tax ? 'old' : 'new';
  const whatsappText = buildWhatsAppText('itr', lead, { itr: inputs });

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black text-[#0F294A]">ITR Simplifier</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">A simple tax-regime comparison for salaried employees, government professionals, and individuals.</p>
        <div className="mt-6 grid gap-5">
          <div className="grid gap-3">
            <FieldLabel>Annual Income</FieldLabel>
            <input type="range" min="300000" max="2000000" step="50000" value={inputs.income} onChange={(event) => setInputs((current) => ({ ...current, income: Number(event.target.value) }))} className="accent-[#25D366]" />
            <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-black text-[#0F294A]">{formatRupees(inputs.income)}</div>
          </div>
          <div className="grid gap-3">
            <FieldLabel>Ongoing savings / expenses</FieldLabel>
            {savingsOptions.map((option) => (
              <label key={option.key} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700">
                <input type="checkbox" checked={inputs.savings[option.key]} onChange={(event) => setInputs((current) => ({ ...current, savings: { ...current.savings, [option.key]: event.target.checked } }))} className="mt-1 h-4 w-4 accent-[#25D366]" />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <ResultGate unlocked={unlocked} onUnlockClick={onUnlockClick}>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { id: 'old', title: 'Old Tax Regime', data: oldTax },
              { id: 'new', title: 'New Tax Regime', data: newTax },
            ].map((card) => (
              <div key={card.id} className={`rounded-lg border p-5 ${recommended === card.id ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-black text-[#0F294A]">{card.title}</h3>
                  {recommended === card.id && <span className="rounded-full bg-[#25D366] px-3 py-1 text-xs font-black text-[#0F294A]">Recommended for You</span>}
                </div>
                <p className="mt-5 text-3xl font-black text-[#0F294A]">{formatRupees(card.data.tax)}</p>
                <p className="mt-2 text-sm font-semibold text-slate-500">Approx. tax estimate</p>
                <p className="mt-4 text-sm leading-6 text-slate-600">Taxable income considered: <strong>{formatRupees(card.data.taxable)}</strong></p>
                <p className="text-sm leading-6 text-slate-600">Estimated deductions: <strong>{formatRupees(card.data.deduction)}</strong></p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">This is a simplified estimate. Final ITR filing depends on salary breakup, Form 16, deductions, and latest applicable rules.</p>
          <a href={`https://wa.me/919906688040?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer" className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 text-sm font-black text-[#0F294A] transition hover:bg-[#1ec45b] sm:w-auto">
            <MessageCircle className="h-5 w-5" />
            Book ITR Consultation
          </a>
        </div>
      </ResultGate>
    </div>
  );
}

function LoanPanel({ inputs, setInputs, unlocked, onUnlockClick, lead }) {
  const whatsappText = buildWhatsAppText('loan', lead, { loan: inputs });
  const readiness = [
    { ok: inputs.hasItr === 'Yes', text: inputs.hasItr === 'Yes' ? '3 Years ITR Verified' : '3 Years ITR Missing (Critical for Banks)' },
    { ok: false, text: 'CA-Certified Balance Sheet & Profit/Loss Statement Required' },
    { ok: false, text: 'Detailed Project Report / CMA Data Required for Business Loans' },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black text-[#0F294A]">Loan Document Assessor</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Check whether your basic documentation is ready before approaching a bank or scheme office.</p>
        <div className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <FieldLabel>Loan Type</FieldLabel>
            <SelectField value={inputs.loanType} onChange={(event) => setInputs((current) => ({ ...current, loanType: event.target.value }))}>
              {loanTypes.map((type) => <option key={type}>{type}</option>)}
            </SelectField>
          </div>
          <div className="grid gap-3">
            <FieldLabel>Have you filed ITR for the last 3 years?</FieldLabel>
            <div className="grid grid-cols-2 gap-3">
              {['Yes', 'No'].map((value) => (
                <button key={value} type="button" onClick={() => setInputs((current) => ({ ...current, hasItr: value }))} className={`focus-ring rounded-lg border px-4 py-3 text-sm font-black transition ${inputs.hasItr === value ? 'border-[#25D366] bg-[#25D366]/12 text-[#0F294A]' : 'border-slate-200 bg-white text-slate-600 hover:border-[#25D366]'}`}>
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ResultGate unlocked={unlocked} onUnlockClick={onUnlockClick}>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="text-xl font-black text-[#0F294A]">Document Readiness Checklist</h3>
          <div className="mt-5 grid gap-3">
            {readiness.map((item) => (
              <div key={item.text} className={`flex gap-3 rounded-lg border p-4 ${item.ok ? 'border-emerald-200 bg-emerald-50' : 'border-red-100 bg-red-50'}`}>
                <span className={`mt-1 h-3 w-3 shrink-0 rounded-sm ${item.ok ? 'bg-[#25D366]' : 'bg-red-500'}`} />
                <p className={`text-sm font-extrabold leading-6 ${item.ok ? 'text-emerald-800' : 'text-red-700'}`}>{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">Banks usually review repayment capacity, ITR history, business documents, project reports, and financial statements before sanctioning major loans.</p>
          <a href={`https://wa.me/919906688040?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer" className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 text-sm font-black text-[#0F294A] transition hover:bg-[#1ec45b] sm:w-auto">
            <MessageCircle className="h-5 w-5" />
            Prepare Loan File
          </a>
        </div>
      </ResultGate>
    </div>
  );
}

function UnlockModal({ activeTab, lead, setLead, onClose, onSubmit, status, errors }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-end bg-[#0F294A]/70 p-0 backdrop-blur-sm sm:place-items-center sm:p-4">
      <form onSubmit={onSubmit} className="w-full rounded-t-2xl bg-white p-5 shadow-2xl sm:max-w-lg sm:rounded-lg sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#25D366]">Unlock Results</p>
            <h2 className="mt-2 text-2xl font-black text-[#0F294A]">Get your assessment</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Enter your details once to reveal the {tabs.find((tab) => tab.id === activeTab)?.label} result.</p>
          </div>
          <button type="button" onClick={onClose} className="focus-ring rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-600">Close</button>
        </div>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-black text-[#0F294A]">
            Full Name
            <input value={lead.fullName} onChange={(event) => setLead((current) => ({ ...current, fullName: event.target.value }))} maxLength="80" className="focus-ring rounded-lg border border-slate-200 px-4 py-3 text-slate-800" placeholder="Enter your name" />
            {errors.fullName && <span className="text-xs font-bold text-red-600">{errors.fullName}</span>}
          </label>
          <label className="grid gap-2 text-sm font-black text-[#0F294A]">
            WhatsApp / Phone Number
            <input value={lead.phone} onChange={(event) => setLead((current) => ({ ...current, phone: event.target.value }))} maxLength="16" inputMode="tel" className="focus-ring rounded-lg border border-slate-200 px-4 py-3 text-slate-800" placeholder="10-digit mobile number" />
            {errors.phone && <span className="text-xs font-bold text-red-600">{errors.phone}</span>}
          </label>
          <label className="grid gap-2 text-sm font-black text-[#0F294A]">
            Location / Village
            <input value={lead.location} onChange={(event) => setLead((current) => ({ ...current, location: event.target.value }))} maxLength="80" className="focus-ring rounded-lg border border-slate-200 px-4 py-3 text-slate-800" placeholder="Mendhar, Poonch, Surankote..." />
            {errors.location && <span className="text-xs font-bold text-red-600">{errors.location}</span>}
          </label>
        </div>
        {errors.form && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{errors.form}</p>}
        <button type="submit" disabled={status === 'loading'} className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-4 text-sm font-black text-[#0F294A] shadow-lg shadow-emerald-500/20 transition hover:bg-[#1ec45b] disabled:cursor-not-allowed disabled:opacity-70">
          {status === 'loading' ? 'Unlocking...' : 'Unlock My Assessment'}
          <ArrowRight className="h-4 w-4" />
        </button>
        <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">By unlocking, you consent to QA & Associates contacting you about your assessment. This is a simplified educational tool.</p>
      </form>
    </div>
  );
}

export default function ReadinessHubPage() {
  const [activeTab, setActiveTab] = useState('gst');
  const [inputs, setInputs] = useState(initialInputs);
  const [lead, setLead] = useState(initialLead);
  const [unlockedTabs, setUnlockedTabs] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const currentTab = useMemo(() => tabs.find((tab) => tab.id === activeTab), [activeTab]);
  const ActiveIcon = currentTab.icon;
  const isUnlocked = Boolean(unlockedTabs[activeTab]);

  const updateTabInputs = (tabId) => (updater) => {
    setInputs((current) => ({
      ...current,
      [tabId]: typeof updater === 'function' ? updater(current[tabId]) : updater,
    }));
  };

  const validateLead = () => {
    const cleanedPhone = lead.phone.replace(/\D/g, '').slice(-10);
    const nextErrors = {};
    if (lead.fullName.trim().length < 2) nextErrors.fullName = 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (lead.location.trim().length < 2) nextErrors.location = 'Please enter your location or village.';
    return { nextErrors, cleanedPhone };
  };

  const buildLeadMessage = () => {
    if (activeTab === 'gst') {
      return `Readiness Hub GST lead from ${lead.location}. Business: ${inputs.gst.businessType}. Turnover: ${turnoverOptions[inputs.gst.turnoverIndex]}. Outside J&K sourcing: ${inputs.gst.outsideJk}.`;
    }
    if (activeTab === 'itr') {
      const selectedSavings = savingsOptions.filter((option) => inputs.itr.savings[option.key]).map((option) => option.label).join(', ') || 'No major savings selected';
      return `Readiness Hub ITR lead from ${lead.location}. Approx income: ${formatRupees(inputs.itr.income)}. Selected deductions: ${selectedSavings}.`;
    }
    return `Readiness Hub loan lead from ${lead.location}. Loan type: ${inputs.loan.loanType}. Filed ITR for last 3 years: ${inputs.loan.hasItr}.`;
  };

  const submitUnlock = async (event) => {
    event.preventDefault();
    const { nextErrors, cleanedPhone } = validateLead();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    const cleanLead = {
      fullName: lead.fullName.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80),
      phone: cleanedPhone,
      location: lead.location.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80),
    };

    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...cleanLead,
          email: '',
          service: `Readiness Hub - ${currentTab.label}`,
          message: buildLeadMessage(),
          location: cleanLead.location,
          source: `Readiness Hub - ${currentTab.label}`,
          consent: true,
          website: '',
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        setStatus('error');
        setErrors({ form: result.message || 'Could not unlock right now. Please try again or WhatsApp us.' });
        return;
      }
      window.localStorage.setItem('qaReadinessLead', JSON.stringify({ ...cleanLead, date: new Date().toISOString() }));
      setLead(cleanLead);
      setUnlockedTabs({ gst: true, itr: true, loan: true });
      setIsModalOpen(false);
      setStatus('success');
      setErrors({});
    } catch {
      setStatus('error');
      setErrors({ form: 'Could not unlock right now. Please try again or WhatsApp us.' });
    }
  };

  return (
    <section className="bg-[#f6f8fb]">
      <div className="bg-[#0F294A] pt-28 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/80">
              <ShieldCheck className="h-4 w-4 text-[#25D366]" />
              QA & Associates Interactive Tool
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Tax & Document Readiness Hub</h1>
            <p className="mt-4 max-w-2xl text-xl font-bold text-white">Check Your Tax & Document Readiness in 2 Minutes.</p>
            <p className="mt-5 max-w-2xl leading-8 text-white/72">
              A simple local assessment for GST, ITR, and loan documentation readiness, built for business owners, salaried individuals, and entrepreneurs in Mendhar and Poonch.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
            <div className="grid gap-3">
              {['Choose the right tool', 'Unlock tailored results', 'Connect on WhatsApp with context'].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/10 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#25D366] text-sm font-black text-[#0F294A]">{index + 1}</span>
                  <span className="text-sm font-bold text-white/86">{item}</span>
                </div>
              ))}
            </div>
            <a href={`tel:${firm.dialPhone}`} className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white px-5 py-4 text-sm font-black text-[#0F294A]">
              <Phone className="h-4 w-4" />
              Call QA & Associates
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-lg bg-white p-2 shadow-soft lg:grid-cols-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`focus-ring flex items-center gap-3 rounded-lg p-4 text-left transition ${active ? 'bg-[#0F294A] text-white shadow-lg shadow-navy/20' : 'bg-white text-slate-700 hover:bg-slate-50'}`}>
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${active ? 'bg-[#25D366] text-[#0F294A]' : 'bg-slate-100 text-[#0F294A]'}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-black">{tab.label}</span>
                  <span className={`mt-1 block text-xs font-bold ${active ? 'text-white/66' : 'text-slate-500'}`}>{tab.target}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 rounded-lg border border-slate-200 bg-white/70 p-4 shadow-soft sm:p-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#25D366] text-[#0F294A]">
              <ActiveIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-black text-[#0F294A]">{currentTab.label}</h2>
              <p className="text-sm font-semibold text-slate-500">Results are unlocked after a brief contact form.</p>
            </div>
            {isUnlocked && (
              <span className="ml-auto inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Results Unlocked
              </span>
            )}
          </div>

          {activeTab === 'gst' && <GstPanel inputs={inputs.gst} setInputs={updateTabInputs('gst')} unlocked={isUnlocked} onUnlockClick={() => setIsModalOpen(true)} lead={lead} />}
          {activeTab === 'itr' && <ItrPanel inputs={inputs.itr} setInputs={updateTabInputs('itr')} unlocked={isUnlocked} onUnlockClick={() => setIsModalOpen(true)} lead={lead} />}
          {activeTab === 'loan' && <LoanPanel inputs={inputs.loan} setInputs={updateTabInputs('loan')} unlocked={isUnlocked} onUnlockClick={() => setIsModalOpen(true)} lead={lead} />}
        </div>

        <div className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-[auto_1fr]">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#0F294A] text-white">
            <BriefcaseBusiness className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-xl font-black text-[#0F294A]">Important professional note</h2>
            <p className="mt-2 leading-7 text-slate-600">
              This hub provides simplified guidance only. Final GST, ITR, loan, balance sheet, CA certificate, or project report advice depends on your documents, business activity, and latest applicable rules.
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <UnlockModal
          activeTab={activeTab}
          lead={lead}
          setLead={setLead}
          onClose={() => setIsModalOpen(false)}
          onSubmit={submitUnlock}
          status={status}
          errors={errors}
        />
      )}
    </section>
  );
}
