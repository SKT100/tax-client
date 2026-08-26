import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Building, Lock, CheckCircle2 } from 'lucide-react';

const PRACTICE_DOMAINS = [
  "Income Tax Returns",
  "GST Registration & Return",
  "Notice Defense & SCN",
  "TDS / TCS Compliance",
  "MSME & Trade License",
  "Bookkeeping & Accounting",
  "Other Consultation"
];

const DATES = [
  { day: "MON", date: "17" },
  { day: "TUE", date: "18" },
  { day: "WED", date: "19" },
  { day: "THU", date: "20" },
  { day: "FRI", date: "21" },
  { day: "SAT", date: "22" }
];

const TIME_SLOTS = [
  "10:30 AM",
  "12:00 PM",
  "02:30 PM",
  "04:30 PM",
  "06:00 PM"
];

export default function TaxScheduler() {
  const [selectedDomain, setSelectedDomain] = useState(PRACTICE_DOMAINS[0]);
  const [consultationMode, setConsultationMode] = useState("online");
  const [selectedDate, setSelectedDate] = useState(DATES[1].date);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[1]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="glass-card border border-theme rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-300">
      
      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 text-center flex flex-col items-center justify-center"
        >
          <CheckCircle2 className="w-14 h-14 text-amber-600 dark:text-amber-400 mb-6" />
          <h3 className="font-serif text-3xl md:text-4xl text-primary-light dark:text-primary-dark mb-3 font-light">
            Consultation Requested
          </h3>
          <p className="font-body font-light text-secondary-light dark:text-secondary-dark max-w-md mx-auto mb-8 leading-relaxed">
            Thank you, <span className="font-medium text-primary-light dark:text-primary-dark">{fullName}</span>. Our team will verify availability for <span className="font-medium text-primary-light dark:text-primary-dark">{selectedDate} Aug at {selectedTime}</span> and contact you shortly to confirm the appointment.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="font-mono text-xs uppercase tracking-widest text-secondary-light hover:text-primary-light dark:hover:text-primary-dark underline underline-offset-8"
          >
            ← Schedule Another Consultation
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* 01. SELECT PRACTICE DOMAIN */}
          <div>
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-white/50 block mb-3.5">
              01. SELECT PRACTICE DOMAIN
            </span>
            <div className="flex flex-wrap gap-2">
              {PRACTICE_DOMAINS.map((domain) => {
                const isSelected = selectedDomain === domain;
                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => setSelectedDomain(domain)}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-md'
                        : 'bg-black/5 dark:bg-white/5 border-theme text-secondary-light dark:text-secondary-dark hover:border-black/30 dark:hover:border-white/30'
                    }`}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 02. CONSULTATION MODE */}
          <div className="pt-6 border-t border-theme">
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-white/50 block mb-3.5">
              02. CONSULTATION MODE
            </span>
            <div className="grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => setConsultationMode("online")}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all duration-300 ${
                  consultationMode === "online"
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-md'
                    : 'bg-black/5 dark:bg-white/5 border-theme text-primary-light dark:text-primary-dark hover:border-black/30 dark:hover:border-white/30'
                }`}
              >
                <Video className="w-5 h-5 opacity-80" />
                <div>
                  <span className="font-mono text-[9px] tracking-widest uppercase block opacity-70">REMOTE</span>
                  <span className="font-serif text-base font-light">Online / Phone</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setConsultationMode("chamber")}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all duration-300 ${
                  consultationMode === "chamber"
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-md'
                    : 'bg-black/5 dark:bg-white/5 border-theme text-primary-light dark:text-primary-dark hover:border-black/30 dark:hover:border-white/30'
                }`}
              >
                <Building className="w-5 h-5 opacity-80" />
                <div>
                  <span className="font-mono text-[9px] tracking-widest uppercase block opacity-70">IN PERSON</span>
                  <span className="font-serif text-base font-light">Office Visit</span>
                </div>
              </button>
            </div>
          </div>

          {/* 03. SELECT TIME SLOT */}
          <div className="pt-6 border-t border-theme">
            <div className="flex items-center justify-between mb-3.5">
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-white/50">
                03. SELECT TIME SLOT
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark">
                MON-SAT • 10 AM - 7 PM
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2 mb-3.5">
              {DATES.map((item) => {
                const isSelected = selectedDate === item.date;
                return (
                  <button
                    key={item.date}
                    type="button"
                    onClick={() => setSelectedDate(item.date)}
                    className={`py-2.5 rounded-2xl text-center border transition-all duration-300 flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-md'
                        : 'bg-black/5 dark:bg-white/5 border-theme text-primary-light dark:text-primary-dark hover:border-black/20 dark:hover:border-white/20'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase opacity-60 mb-0.5">{item.day}</span>
                    <span className="font-serif text-base sm:text-lg font-normal">{item.date}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                        : 'bg-black/5 dark:bg-white/5 border-theme text-secondary-light dark:text-secondary-dark hover:border-black/20 dark:hover:border-white/20'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 04. YOUR DETAILS */}
          <div className="pt-6 border-t border-theme flex flex-col gap-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-secondary-light dark:text-white/50">
              04. YOUR DETAILS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <input
                required
                type="text"
                placeholder="YOUR FULL NAME"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-theme rounded-xl px-4 py-3.5 font-mono text-xs tracking-wider text-primary-light dark:text-primary-dark placeholder:text-secondary-light/60 dark:placeholder:text-secondary-dark/60 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
              />

              <input
                required
                type="tel"
                placeholder="PHONE / WHATSAPP NUMBER"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border border-theme rounded-xl px-4 py-3.5 font-mono text-xs tracking-wider text-primary-light dark:text-primary-dark placeholder:text-secondary-light/60 dark:placeholder:text-secondary-dark/60 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
              />
            </div>

            <textarea
              rows={3}
              placeholder="BRIEF SUMMARY OF YOUR TAX QUERY / NOTICE REFERENCE (OPTIONAL)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-theme rounded-xl px-4 py-3.5 font-mono text-xs tracking-wider text-primary-light dark:text-primary-dark placeholder:text-secondary-light/60 dark:placeholder:text-secondary-dark/60 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors resize-none"
            />
          </div>

          <div className="pt-4 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-secondary-light dark:text-secondary-dark">
              <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>100% CONFIDENTIAL & PRIVILEGED</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-400 dark:hover:text-slate-900 transition-all duration-300 shadow-xl"
            >
              CONFIRM APPOINTMENT →
            </button>
          </div>

        </form>
      )}

    </div>
  );
}