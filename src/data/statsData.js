// ==========================================
// 2. METRICS & STATS
// ==========================================
export const STATS_DATA = [
  {
    ref: "EXPERIENCE",
    value: 10,
    suffix: "+",
    label: "Years Experience",
    title: "Years Experience",
    desc: "Proven track record in taxation, audit support, and statutory compliance.",
  },
  {
    ref: "ACCURACY",
    value: 100,
    suffix: "%",
    label: "Legal & Compliant",
    title: "Legal & Compliant",
    desc: "Accurate filing ensuring complete peace of mind and zero penalties.",
  },
  {
    ref: "VOLUME",
    value: 1,
    suffix: "k+",
    label: "Returns Filed",
    title: "Returns Filed",
    desc: "ITR & GST returns successfully processed across diverse industries.",
  },
  {
    ref: "COVERAGE",
    value: 6,
    suffix: "",
    label: "Serving Districts",
    title: "Serving Districts",
    desc: "Active across Kolkata, Hooghly, Howrah, Nadia & 24 Parganas.",
  },
];

export const HERO_STATS = STATS_DATA.map((s) => ({
  value: `${s.value}${s.suffix}`,
  label: s.label,
  subtext: s.desc,
}));