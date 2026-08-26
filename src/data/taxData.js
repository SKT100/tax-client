// src/data/taxData.js

export const CONTACT_INFO = {
  name: "Partha Pratim Halder",
  firm: "Matrix Tax Solutions",
  title: "Principal Tax Consultant & Statutory Advocate",
  email: "contact@matrixtaxsolutions.com",
  phone: "+91 98300 00000",
  address: {
    line1: "City Centre II, Action Area II, New Town",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700157",
  },
  regionalOffices: [
    {
      city: "Kolkata (Main Chambers)",
      location: "New Town / Salt Lake Sector V",
      scope: "Direct Tax & Corporate SCN Defense",
    },
    {
      city: "Barrackpore & North 24 Parganas",
      location: "Municipal Commercial Zone",
      scope: "Trade Licences, MSME & GST Filings",
    },
    {
      city: "Howrah & Hooghly",
      location: "Industrial Corridor Desk",
      scope: "TDS Audits & Enterprise Bookkeeping",
    },
  ],
};

export const TAX_PRACTICE_AREAS = [
  {
    id: "income-tax",
    ref: "REF // 01",
    subtitle: "DIRECT TAXATION & COMPLIANCE",
    title: "Income Tax & ITR E-Filing",
    description:
      "Statutory computation, capital gains audits, and timely ITR filing across salaried professionals, high-net-worth individuals (HNIs), partnerships, and corporate entities.",
    keyServices: [
      "ITR 1 through 7 Electronic Filing",
      "Capital Gains Computation & Tax Saving Advisory",
      "Form 26AS, AIS & TIS Annual Reconciliation",
      "Advance Tax Estimation & Self-Assessment Calculations",
      "Foreign Asset & Income Statutory Reporting",
      "Past Returns Rectification & Nil Demand Processing",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "gst-lifecycle",
    ref: "REF // 02",
    subtitle: "INDIRECT TAX ARCHITECTURE",
    title: "GST Lifecycle Management",
    description:
      "End-to-end indirect tax compliance ensuring complete Input Tax Credit (ITC) optimization, error-free periodic return filing, and statutory audit readiness.",
    keyServices: [
      "Monthly & Quarterly GSTR-1 & GSTR-3B Filings",
      "Comprehensive GSTR-2B vs Books ITC Reconciliation",
      "Annual GSTR-9 Return & GSTR-9C Audit Reconciliation",
      "New GST Registrations & Multi-State Branch Additions",
      "E-Way Bill System & E-Invoicing Integration",
      "LUT Filing for Zero-Rated Exports & Inverted Duty Claims",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "notice-defense",
    ref: "REF // 03",
    subtitle: "DISPUTE RESOLUTION & LITIGATION",
    title: "Scrutiny & Notice Defense",
    description:
      "Strategic representation and legal response drafting for Income Tax show-cause notices, Section 148 reassessment proceedings, and GST departmental summons.",
    keyServices: [
      "Section 143(1), 143(2) & 148 Reassessment Defense",
      "GST SCN (DRC-01) Formal Legal Submissions",
      "CIT (Appeals) Preparation & Faceless Appeal Portals",
      "High-Value Transaction / Cash Deposit Scrutiny Defense",
      "Penalty Waiver Applications & Demand Adjustments",
      "Departmental Summons & Inspection Advisory",
    ],
    image:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tds-tcs",
    ref: "REF // 04",
    subtitle: "WITHHOLDING TAX COMPLIANCE",
    title: "TDS / TCS Compliance & 26AS",
    description:
      "Automated quarterly withholding tax computation, error-free portal submission, and rapid Form 16 / 16A generation with TRACES verification.",
    keyServices: [
      "Quarterly e-TDS Returns (Form 24Q, 26Q, 27Q, 27EQ)",
      "TRACES Justification Report Analysis & Error Clearance",
      "Form 16 & Form 16A Digitally Signed Bulk Issuance",
      "Lower Deduction Certificate (Form 13) Applications",
      "TDS Defaults, Late Fee & Interest Mismatch Mitigation",
      "Vendor TDS Withholding Rate Verification",
    ],
    image:
      "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "accounting",
    ref: "REF // 05",
    subtitle: "ENTERPRISE FINANCIALS",
    title: "Accounting & Financial Statements",
    description:
      "Rigorous double-entry bookkeeping on Tally Prime, trial balance auditing, bank and ledger reconciliations, and year-end statutory balance sheet finalization.",
    keyServices: [
      "Full-Cycle Bookkeeping on Tally Prime / ERP",
      "Monthly Ledger Auditing & Multi-Account Bank Reconciliation",
      "Depreciation Schedules & Fixed Asset Registers",
      "Profit & Loss Statements and Balance Sheet Finalization",
      "Inventory & Cost of Goods Sold (COGS) Auditing",
      "Statutory Audit File Preparation for Chartered Accountants",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "licensing",
    ref: "REF // 06",
    subtitle: "STATUTORY REGISTRATION",
    title: "MSME & Business Licences",
    description:
      "Complete entity formation advisory, municipality trade licences across West Bengal, Udyam MSME certification, and partnership deed structuring.",
    keyServices: [
      "West Bengal Municipal Trade Licence New & Renewals",
      "Udyam MSME Registration & Priority Sector Privileges",
      "Partnership Deed Drafting & Firm Registration",
      "PAN, TAN, P-Tax Registration & Annual Assessment",
      "Import Export Code (IEC) Issuance with DGFT",
      "Digital Signature Certificate (DSC Class 3) Processing",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
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

// Aliases for backward compatibility with existing imports
export const SERVICES_DATA = TAX_PRACTICE_AREAS;
export const PRACTICE_AREAS = TAX_PRACTICE_AREAS;
export const PRECEDENT_MATTERS = TAX_CASE_STUDIES;