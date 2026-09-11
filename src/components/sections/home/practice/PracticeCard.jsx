// src/components/sections/home/practice/PracticeCard.jsx

import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function PracticeCard({ item, index }) {
  const targetUrl = `/services`;
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`group relative w-[85vw] sm:w-[500px] md:w-[580px] lg:w-[640px] shrink-0 bg-[#0F0F12] border border-white/10 p-5 sm:p-7 transition-colors duration-300 flex flex-col justify-between [@media(hover:hover)]:hover:border-white/30 overflow-hidden max-h-[calc(100vh-210px)] ${
        index !== 0 ? "-ml-[1px]" : ""
      }`}
    >
      {/* Top Header */}
      <Link
        to={targetUrl}
        className="flex items-center justify-between pb-4 border-b border-white/10 transition-colors duration-300 [@media(hover:hover)]:group-hover:border-white/30 shrink-0"
      >
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-white/70 uppercase [@media(hover:hover)]:group-hover:text-white transition-colors">
          REF. {formattedIndex}
        </span>
        <ArrowUpRight
          size={18}
          className="text-white/40 [@media(hover:hover)]:group-hover:text-white [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </Link>

      {/* Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch my-3 flex-1 overflow-hidden">
        
        {/* Left: Text & Services */}
        <div className="md:col-span-7 flex flex-col justify-between h-full">
          <div>
            <Link to={targetUrl} className="block group/title">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-tight leading-[1.15] mb-1">
                {item.title}
                {item.subtitle && (
                  <span className="block italic font-light text-white/50 text-base sm:text-lg mt-1">
                    {item.subtitle}
                  </span>
                )}
              </h3>
            </Link>

            <p className="mt-2 text-xs sm:text-sm text-white/60 font-sans font-light leading-relaxed line-clamp-3">
              {item.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-2">
              KEY COMPLIANCE COVERAGE
            </span>
            <ul className="flex flex-col border-t border-white/10">
              {(item.keyServices || [item.description]).slice(0, 3).map((serviceName, i) => (
                <li
                  key={i}
                  className="py-1.5 border-b border-white/10 text-xs font-sans font-light text-white/70 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-white"
                >
                  {serviceName}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Hardware-Accelerated Image Container */}
        <Link
          to={targetUrl}
          className="md:col-span-5 h-full min-h-[160px] md:min-h-[220px] border border-white/10 relative overflow-hidden bg-[#16161A] shrink-0 block [@media(hover:hover)]:group-hover:border-white/30 transition-colors duration-300"
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-110 brightness-90 [@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:hover)]:group-hover:scale-105 transition-all duration-500 will-change-transform"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/10 text-6xl font-light">
              {formattedIndex}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          <span className="absolute bottom-3 right-4 font-serif text-5xl font-light text-white/20 select-none pointer-events-none leading-none tracking-tighter">
            {formattedIndex}
          </span>
        </Link>

      </div>
    </div>
  );
}

export default memo(PracticeCard);