import PillButton from "../../ui/PillButton";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative z-20">
      <div className="bg-surface-dark text-white dark:bg-surface-secondary-dark dark:text-white py-24 sm:py-32 text-center border-t border-theme rounded-t-[2.5rem] sm:rounded-t-[3rem] transition-all duration-300">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto flex flex-col items-center gap-10">
          <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/50">
            DIRECT ENGAGEMENT
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-tight max-w-3xl">
            Secure Legal <br />
            <span className="italic font-light opacity-90">Representation</span>
          </h2>
          <Link to="/schedule" className="no-underline">
            <PillButton
              variant="on-dark"
              className="px-10 sm:px-12 py-4 sm:py-5 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              BOOK YOUR CONSULTATION
            </PillButton>
          </Link>
        </div>
      </div>
    </section>
  );
}