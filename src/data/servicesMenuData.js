export const SERVICE_CATEGORIES = [
  {
    id: "accounts-audit",
    name: "Accounts & Audit",
    items: [
      {
        id: "bookkeeping",
        tag: "ACCOUNTS",
        title: "Accounting & Bookkeeping",
        description:
          "Day-to-day transaction recording on Tally Prime, journal entries, ledger audits, and bank reconciliations.",
      },
      {
        id: "finalization",
        tag: "ACCOUNTS",
        title: "Finalization of Accounts",
        description:
          "Year-end balance sheet preparation, profit & loss statements, and depreciation schedules.",
      },
      {
        id: "internal-audit",
        tag: "AUDIT",
        title: "Audit Services",
        description:
          "Internal bookkeeping audits, expenditure verifications, and compliance health checks.",
      },
      {
        id: "gst-audit",
        tag: "AUDIT",
        title: "GST Audit & Scrutiny",
        description:
          "Audit reconciliation (GSTR-9C), multi-year discrepancy clearing, and department review handling.",
      },
    ],
  },
  {
    id: "gst",
    name: "GST Compliance",
    items: [
      {
        id: "gst-registration",
        tag: "GST",
        title: "GST Registration",
        description:
          "New GSTIN applications, principal place amendments, and multi-state branch additions.",
      },
      {
        id: "gst-returns",
        tag: "GST",
        title: "GST Returns Filing",
        description:
          "Monthly & quarterly GSTR-1, GSTR-3B filings with automated GSTR-2B Input Tax Credit (ITC) reconciliation.",
      },
      {
        id: "gst-notice-reply",
        tag: "GST",
        title: "GST Notice Reply (DRC-01)",
        description:
          "Statutory legal defense for show cause notices, scrutiny summons, and ITC mismatch disputes.",
      },
      {
        id: "gst-refund",
        tag: "GST",
        title: "GST Refund Processing",
        description:
          "Export refund applications without payment of tax, inverted duty structure claims, and excess balance payouts.",
      },
      {
        id: "lut-filing",
        tag: "GST",
        title: "LUT Filing",
        description:
          "Annual Letter of Undertaking (LUT) submission for zero-rated export of goods and services.",
      },
      {
        id: "eway-einvoice",
        tag: "GST",
        title: "E-Way Bill & E-Invoicing",
        description:
          "Portal setup, API generation, and real-time generation support for high-volume commercial shipments.",
      },
    ],
  },
  {
    id: "income-tax",
    name: "Income Tax",
    items: [
      {
        id: "itr-filing",
        tag: "INCOME TAX",
        title: "Income Tax Return (ITR)",
        description:
          "ITR-1 through ITR-7 filing for salaried individuals, professionals, firms, and private companies.",
      },
      {
        id: "it-notice-reply",
        tag: "INCOME TAX",
        title: "Income Tax Notice Reply",
        description:
          "Structured defense and submissions for Section 143(1), 143(2), and 148 reassessment notices.",
      },
      {
        id: "tax-planning",
        tag: "INCOME TAX",
        title: "Tax Planning & Advisory",
        description:
          "Capital gains mitigation, investment structuring, and advance tax liability computation.",
      },
      {
        id: "itr-u",
        tag: "INCOME TAX",
        title: "Updated Return (ITR-U)",
        description:
          "Filing updated returns for past assessment years to disclose missed income and avoid litigation.",
      },
    ],
  },
  {
    id: "tds-payroll",
    name: "TDS & Payroll",
    items: [
      {
        id: "tds-return",
        tag: "TDS",
        title: "TDS Return Filing",
        description:
          "Quarterly 24Q, 26Q, 27Q submissions, challan 281 processing, and Form 16 / 16A generation.",
      },
      {
        id: "tds-correction",
        tag: "TDS",
        title: "TDS Correction & Defaults",
        description:
          "TRACES justification report error resolution, PAN corrections, and short-deduction waivers.",
      },
      {
        id: "payroll-mgmt",
        tag: "PAYROLL",
        title: "Payroll Processing",
        description:
          "Monthly salary sheet preparation, payslip generation, and statutory employee deduction accounting.",
      },
      {
        id: "p-tax",
        tag: "PAYROLL",
        title: "Professional Tax (P-Tax)",
        description:
          "West Bengal P-Tax registration, Certificate of Enrollment, and annual return submissions.",
      },
    ],
  },
  {
    id: "company-registration",
    name: "Company & Registration",
    items: [
      {
        id: "pvt-ltd",
        tag: "COMPANY",
        title: "Private Limited Company",
        description:
          "MCA SPICe+ incorporation, DIN allocation, Name Approval, MOA/AOA drafting, PAN, TAN & Bank setup.",
      },
      {
        id: "llp-registration",
        tag: "COMPANY",
        title: "LLP Registration",
        description:
          "Limited Liability Partnership formation and statutory deed drafting with the Registrar of Companies.",
      },
      {
        id: "partnership-firm",
        tag: "COMPANY",
        title: "Partnership Deed & Firm",
        description:
          "Partnership agreement drafting, notary execution, and Registrar of Firms registration.",
      },
      {
        id: "roc-compliance",
        tag: "COMPANY",
        title: "Annual ROC Compliance",
        description:
          "AOC-4, MGT-7 annual filings, Director KYC (DIR-3 KYC), and statutory board resolution documentation.",
      },
    ],
  },
  {
    id: "pf-esic",
    name: "PF & ESIC",
    items: [
      {
        id: "pf-registration",
        tag: "PF & ESIC",
        title: "PF Registration",
        description:
          "Employer establishment code setup under the EPFO Shram Suvidha portal.",
      },
      {
        id: "pf-ecr",
        tag: "PF & ESIC",
        title: "PF Monthly ECR Filing",
        description:
          "Monthly electronic challan-cum-return (ECR) generation and employee wage-basis computation.",
      },
      {
        id: "esic-registration",
        tag: "PF & ESIC",
        title: "ESIC Registration",
        description:
          "Employee State Insurance Corporation establishment enrollment for medical benefits.",
      },
      {
        id: "esic-return",
        tag: "PF & ESIC",
        title: "ESIC Monthly Returns",
        description:
          "Monthly employee contribution payments and statutory wage portal compliance.",
      },
    ],
  },
  {
    id: "licences-advisory",
    name: "Licences & Advisory",
    items: [
      {
        id: "trade-licence",
        tag: "BUSINESS SETUP",
        title: "Municipal Trade Licence",
        description:
          "New trade licence processing and annual renewals across Kolkata and West Bengal municipalities.",
      },
      {
        id: "udyam-msme",
        tag: "BUSINESS SETUP",
        title: "MSME / Udyam Registration",
        description:
          "Government priority sector classification certificate for bank subsidies and collateral-free credit.",
      },
      {
        id: "trust-12ab",
        tag: "NGO / TRUST",
        title: "Trust & 12AB / 80G",
        description:
          "Trust deed drafting, Sub-Registrar registration, and Income Tax 12AB/80G exemption certification.",
      },
      {
        id: "cma-loan-report",
        tag: "FINANCE",
        title: "Project & CMA Report",
        description:
          "Detailed Credit Monitoring Arrangement (CMA) data preparation for bank CC / term loan approvals.",
      },
    ],
  },
];