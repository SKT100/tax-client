// src/data/taxData.js

export const CONTACT_INFO = {
  phone: "+91 74392 19943",
  phoneRaw: "+917439219943",
  email: "tcparthahalder1984@gmail.com",
  address: "461, N.C. Banerjee Road, Baidyabati, Hooghly, West Bengal — 712222",
  hours: "Morning: 7:00 AM – 10:00 AM | Evening: 6:00 PM – 10:00 PM",
  regionalOffices: [
    {
      city: "Baidyabati (Head Office)",
      location: "GT Road West, Hooghly",
      scope: "Principal Tax & Notice Defense Chambers",
    },
    {
      city: "Serampore & Rishra",
      location: "Industrial Corridor Desk",
      scope: "GST Audits & Labor Law Compliance",
    },
    {
      city: "Kolkata Corporate Desk",
      location: "Sector V & BBD Bagh",
      scope: "Direct Tax & Corporate SCN Defense",
    },
  ],
};

export const TAX_PRACTICE_AREAS = [
  {
    id: "income-tax",
    ref: "REF // 01",
    subtitle: "DIRECT TAXATION & NOTICE DEFENSE",
    title: "Income Tax & ITR E-Filing",
    description:
      "Statutory computation, capital gains audits, Section 148 reassessment defense, and faceless appeal representation before CPC and CIT(A).",
    statutoryActs: "Income Tax Act, 1961 • CBDT Circulars",
    targetAssessees: "Salaried Individuals, HNIs, Traders, Partnerships & Corporate Assessees",
    modules: [
      { code: "ITR-1-4", title: "Salaried & Presumptive ITR Filing", desc: "Computation and e-filing for Form 16 holders, FnO/capital gains traders, and Section 44AD/ADA assessees." },
      { code: "ITR-5-7", title: "Corporate & Trust Tax Returns", desc: "Statutory tax computation and filing for Pvt Ltd entities, LLPs, Firms, and 12A/80G Charitable Trusts." },
      { code: "SEC-148", title: "Section 148 Reassessment Defense", desc: "Forensic financial reconstruction, Section 151 compliance verification, and formal legal response drafting." },
      { code: "AIS-26AS", title: "AIS / 26AS Rectification & Refunds", desc: "Cleansing TIS/AIS mismatch errors, rectifying tax credit discrepancies, and accelerating CPC refund processing." },
      { code: "ADV-TAX", title: "Advance Tax & Capital Gains", desc: "Quarterly advance tax computation for equity trading, real estate sales, and foreign income disclosures." },
    ],
    relatedPostSlugs: [
      "2026-08-10-section-148-income-tax-notice-defense",
      "how-to-file-income-tax-return-online",
      "2026-09-01-faceless-appeal-cit-appeals-process",
    ],
    image: "/images/tax.webp",
  },
  {
    id: "gst-compliance",
    ref: "REF // 02",
    subtitle: "INDIRECT TAX ARCHITECTURE",
    title: "GST Compliance & DRC Notice Rebuttal",
    description:
      "End-to-end indirect tax management—from multi-state GSTIN allocation to GSTR-2B vs 3B ITC reconciliation and DRC-01 show cause notice defense.",
    statutoryActs: "CGST / WBGST Act, 2017 • CBIC Directives",
    targetAssessees: "Wholesale Manufacturers, Retailers, Service Exporters & E-Commerce Merchants",
    modules: [
      { code: "GST-REG", title: "New GSTIN & Core Field Amendments", desc: "Fresh GST registration, principal place of business changes, and multi-state branch additions." },
      { code: "GSTR-1-3B", title: "Periodic GSTR-1 & GSTR-3B Filings", desc: "Monthly/Quarterly return filing, B2B sales ledger reconciliation, and tax liability discharge." },
      { code: "ITC-MATCH", title: "GSTR-2B vs 3B ITC Reconciliation", desc: "Automated monthly purchase ledger matching to identify non-filing vendors and secure eligible ITC." },
      { code: "DRC-01", title: "DRC-01 & Section 70 Summons Defense", desc: "Legal representation for fake invoicing allegations, ITC mismatches, and e-way bill inspections." },
      { code: "LUT-REFUND", title: "Zero-Rated Exports (LUT) & Refunds", desc: "Annual LUT filing for tax-free exports and unutilized ITC / inverted duty refund processing." },
    ],
    relatedPostSlugs: [
      "2026-08-14-gstr-2b-input-tax-credit-reconciliation",
      "2026-08-28-gst-fake-invoicing-summons-defense",
    ],
    image: "/images/gst-lifestyle.webp",
  },
  // Replace the tds-payroll object in TAX_PRACTICE_AREAS within src/data/taxData.js

{
  id: "tds-payroll",
  ref: "REF // 03",
  subtitle: "WITHHOLDING TAX & LABOR COMPLIANCE",
  title: "TDS / TCS, Payroll & PF-ESIC",
  description:
    "Quarterly e-TDS return filing, TRACES default resolution, Form 16/16A generation, EPF/ESIC monthly ECR filings, and West Bengal Professional Tax management.",
  statutoryActs: "Income Tax Act (Ch. XVII-B) • EPF & MP Act, 1952 • ESI Act, 1948 • WB P-Tax Act, 1979",
  targetAssessees: "Corporate Employers, Commercial Contractors, Property Buyers & Manufacturing Units",
  modules: [
    { 
      code: "TDS-24Q-26Q", 
      title: "Quarterly Returns (24Q / 26Q / 27EQ)", 
      desc: "Computation, tax deduction validation, and filing for salary (24Q), non-salary (26Q), and TCS (27EQ)." 
    },
    { 
      code: "EPF-ESIC", 
      title: "EPF ECR & ESIC Monthly Returns", 
      desc: "Monthly Electronic Challan-cum-Return (ECR) generation, ESIC contribution filing, and employee IP allocation." 
    },
    { 
      code: "TRACES-FIX", 
      title: "TRACES Corrections & 234E Fees", 
      desc: "Challan mismatch corrections, PAN error updates, short deduction fixes, and 234E fee mitigation." 
    },
    { 
      code: "FORM-16", 
      title: "Form 16 / 16A Bulk Issuance", 
      desc: "Digitally signed Form 16 (Part A & B) and Form 16A generation directly via the official TRACES portal." 
    },
    { 
      code: "WB-PTAX", 
      title: "WB P-Tax Enrolment & Returns", 
      desc: "Employer Registration (EC), Professional Enrolment (RC), monthly GRIPS deposits, and Form III returns." 
    },
  ],
  relatedPostSlugs: [
    "2026-08-26-tds-late-filing-section-234e-consequences",
    "2026-09-02-west-bengal-ptax-statutory-enrolment",
  ],
  image: "/images/tcs-tds.webp",
},
{
    id: "company-registration",
    ref: "REF // 04",
    subtitle: "CORPORATE REGISTRY DESK",
    title: "Company Setup & ROC Compliance",
    description:
      "End-to-end corporate legal structure setup—from Private Limited and LLP incorporation on MCA SPICe+ to DIR-3 KYC and annual AOC-4/MGT-7 filings.",
    statutoryActs: "Companies Act, 2013 • LLP Act, 2008",
    targetAssessees: "Startups, Growth Enterprises, Foreign Subsidiaries & Partnerships",
    modules: [
      { code: "PVT-LTD", title: "Pvt Ltd & LLP Incorporation", desc: "RUN name approval, SPICe+ filing, MoA/AoA drafting, DIN allocation, PAN/TAN, and bank account setup." },
      { code: "ROC-ANNUAL", title: "Annual ROC Filings (AOC-4 & MGT-7)", desc: "Mandatory annual financial statement (AOC-4) and annual return (MGT-7/7A) secretarial filings." },
      { code: "DIR-3-KYC", title: "Director KYC & DIN Maintenance", desc: "Annual DIR-3 KYC Web/Form filing for directors to prevent DIN deactivation and ₹5,000 late fees." },
      { code: "INC-20A", title: "Commencement of Business (INC-20A)", desc: "Mandatory declaration filing within 180 days of incorporation to validate share capital subscription." },
      { code: "FIRM-REG", title: "Partnership Deed & MSME Setup", desc: "Drafting partnership deeds, Registrar of Firms (ROF) filing, and official Udyam MSME setup." },
    ],
    relatedPostSlugs: [
      "2026-08-21-private-limited-company-incorporation-guide",
      "2026-08-30-director-kyc-mca-roc-compliance",
    ],
    image: "/images/notice-defense.webp",
  },
  {
    id: "licences-advisory",
    ref: "REF // 05",
    subtitle: "STATUTORY REGISTRATION",
    title: "Municipal Trade Licences & MSME",
    description:
      "Commercial licenses across West Bengal municipalities via Silpasathi, Udyam MSME certification, Import Export Code (IEC), and 12A/80G NGO approvals.",
    statutoryActs: "WB Municipal Act, 1993 • Foreign Trade Policy • IT Act Sec 12A/80G",
    targetAssessees: "Commercial Establishments, Importers/Exporters, NGOs & MSMEs",
    modules: [
      { code: "WB-TRADE", title: "WB Municipal Trade Licence", desc: "New Certificate of Enlistment applications and renewals via Silpasathi across Baidyabati, KMC, etc." },
      { code: "UDYAM-MSME", title: "Udyam MSME Registration", desc: "Government MSME certification for priority sector bank lending, interest subvention, and tender exemptions." },
      { code: "IEC-DGFT", title: "Import Export Code (IEC)", desc: "DGFT registration for global trade, annual profile updates, and RCMEX export promotion council enrolment." },
      { code: "TRUST-12A", title: "NGO 12A & 80G Tax Exemption", desc: "Registration under Section 12A and 80G for tax exemptions and donor tax deductions." },
      { code: "FSSAI-REG", title: "FSSAI Food Operator Registration", desc: "Basic registration and State/Central licensing for food manufacturers, cloud kitchens, and traders." },
    ],
    relatedPostSlugs: [
      "2026-08-24-west-bengal-municipal-trade-license-renewal",
      "west-bengal-panchayat-municipal-tax-online-payment",
    ],
    image: "/images/licensing.webp",
  },
  {
    id: "accounts-audit",
    ref: "REF // 06",
    subtitle: "ENTERPRISE FINANCIALS",
    title: "Accounting, Audit & Bookkeeping",
    description:
      "Double-entry bookkeeping on Tally Prime, trial balance auditing, balance sheet finalization, and Section 44AB statutory Tax Audits.",
    statutoryActs: "Section 44AB of IT Act • ICAI Accounting Standards",
    targetAssessees: "Traders, Manufacturing Enterprises, Service Firms & Tax Audit Assessees",
    modules: [
      { code: "BOOK-KEEPING", title: "Tally & Cloud Bookkeeping", desc: "Transaction posting, bank reconciliations, sales/purchase ledger auditing, and monthly MIS reporting." },
      { code: "FIN-STATEMENTS", title: "Balance Sheet & P&L Finalization", desc: "Finalization of statutory financial statements, depreciation schedules, and audit-ready trial balances." },
      { code: "TAX-AUDIT", title: "Section 44AB Tax Audit", desc: "Books verification, Form 3CA/3CB and Form 3CD reporting for businesses exceeding turnover thresholds." },
      { code: "STOCK-AUDIT", title: "Inventory Valuation & Verification", desc: "Physical stock reconciliation, inventory valuation under AS-2, and bank credit limit stock certification." },
    ],
    relatedPostSlugs: [
      "2026-08-18-section-44ab-tax-audit-thresholds",
    ],
    image: "/images/accounting.webp",
  },
];

export const TAX_CASE_STUDIES = [
  {
    category: "GST RECONCILIATION",
    title: "Multi-Lakh ITC Mismatch Penalty Quashed",
    summary:
      "Structured comprehensive invoice-level GSTR-2B vs 3B documentation for an engineering contractor, resolving a ₹18.4 Lakh demand without adverse tax liabilities.",
    forum: "COMMERCIAL TAXES DIVISION",
  },
  {
    category: "INCOME TAX DEFENSE",
    title: "High-Value Section 148 Reassessment Dismissed",
    summary:
      "Defended an individual assessee facing scrutiny over unexplained bank transactions. Successfully substantiated sources of capital, resulting in a zero-demand assessment order.",
    forum: "FACELESS ASSESSMENT UNIT",
  },
  {
    category: "ENTERPRISE STRUCTURING",
    title: "Multi-State E-Commerce GST & Licensing Setup",
    summary:
      "Engineered statutory compliance, P-Tax registration, and automated monthly TDS/GST pipelines for a logistics hub operating across three regional jurisdictions.",
    forum: "STATUTORY COMPLIANCE DESK",
  },
];

export const TAX_COMPLIANCE_VAULT = [
  {
    category: "INCOME TAX",
    items: [
      "ITR 1 - 7 E-Filing",
      "Advance Tax Planning",
      "Form 26AS / AIS Audit",
      "148 Notice Defense",
      "Capital Gains Filing",
      "Tax Audit Assistance",
      "Past Rectifications",
    ],
  },
  {
    category: "GST LIFECYCLE",
    items: [
      "Monthly GSTR-1 / 3B",
      "GSTR-9 Annual Filing",
      "ITC 2B Reconciliation",
      "DRC-01 Notice Reply",
      "New Registration",
      "LUT Export Filing",
      "E-Way Bill Desk",
    ],
  },
  {
    category: "WITHHOLDING TAX",
    items: [
      "Quarterly 24Q / 26Q",
      "Form 16 / 16A Issuance",
      "TRACES Clearance",
      "Lower TDS (Form 13)",
      "27EQ TCS Filing",
      "Challan ITNS 281",
    ],
  },
  {
    category: "CORPORATE & MSME",
    items: [
      "WB Trade Licence",
      "Udyam MSME Registry",
      "Tally Finalization",
      "Partnership Deeds",
      "P-Tax Assessment",
      "DSC Class 3 Setup",
    ],
  },
];

// Backward compatibility exports
export const SERVICES_DATA = TAX_PRACTICE_AREAS;
export const PRACTICE_AREAS = TAX_PRACTICE_AREAS;
export const PRECEDENT_MATTERS = TAX_CASE_STUDIES;