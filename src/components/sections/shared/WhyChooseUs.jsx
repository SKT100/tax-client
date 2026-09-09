// src/components/sections/services/WhyChooseUs.jsx

import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Users2,
  Clock,
  BadgePercent,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import PillButton from "../../ui/PillButton";

const PILLARS = [
  {
    icon: Users2,
    title: "Expert Team",
    description: "Experienced professionals with deep domain knowledge.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We value deadlines and deliver on time, every time.",
  },
  {
    icon: BadgePercent,
    title: "Affordable Pricing",
    description: "Quality services at competitive, transparent pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Client First",
    description: "Your success is our priority. We are always by your side.",
  },
];

function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative z-20 w-full bg-surface-dark text-white dark:bg-surface-secondary-dark dark:text-white border-y border-white/10 py-16 sm:py-24 md:py-32 transition-colors duration-300"
    >
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT: EDITORIAL HEADING */}
          <div className="lg:col-span-5 flex flex-col justify-between pr-0 lg:pr-10 lg:border-r border-white/10">
            <div>
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white/50 block mb-3">
                WHY CHOOSE US
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight mb-5">
                We Deliver More <br />
                <span className="italic font-light opacity-90">
                  Than Just Solutions
                </span>
              </h2>

              <div className="w-12 h-px bg-white/20 mb-5" />

              <p className="font-body font-light text-sm sm:text-base text-white/70 leading-relaxed mb-8 max-w-md">
                We combine expertise, technology and personalized service to deliver results that drive your business forward.
              </p>
            </div>

            {/* CTA BUTTON */}
            <div>
              <Link to="/about" className="inline-block group/btn no-underline">
                <PillButton
                  variant="on-dark"
                  className="px-8 py-3.5 shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </PillButton>
              </Link>
            </div>
          </div>

          {/* RIGHT: 4 PILLARS (2x2 Grid on Mobile, 4-Cols on Desktop) */}
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0">
            {PILLARS.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center text-center px-2 sm:px-5 py-2 ${
                    idx !== PILLARS.length - 1
                      ? "lg:border-r border-white/10"
                      : ""
                  }`}
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 mb-3 sm:mb-4 flex items-center justify-center text-white">
                    <IconComp className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.3]" />
                  </div>

                  <h3 className="font-serif text-lg sm:text-2xl font-light text-white mb-2 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="font-body font-light text-[11px] sm:text-sm text-white/70 leading-relaxed max-w-[160px] sm:max-w-[170px]">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(WhyChooseUs);