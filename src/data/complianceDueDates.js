import complianceJson from "./complianceDueDates.json";

export const COMPLIANCE_CATEGORIES = [
  { id: "all", label: "All Directives" },
  { id: "gst", label: "GST Lifecycle" },
  { id: "income-tax", label: "Income Tax & Advance Tax" },
  { id: "tds", label: "TDS / TCS Withholding" },
  { id: "payroll", label: "PF, ESIC & P-Tax" },
  { id: "corporate", label: "Corporate & MCA" },
];

export const STATUTORY_DUE_DATES = complianceJson.STATUTORY_DUE_DATES || [];