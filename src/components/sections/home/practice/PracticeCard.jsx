import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function PracticeCard({ item, index }) {
  const targetUrl = `/practices?area=${item.ref?.toLowerCase() || item.id}#practice-areas`;

  return (
    <div
      className={`group relative w-[85vw] sm:w-[500px] md:w-[580px] lg:w-[640px] shrink-0 bg-[#121212]/80 backdrop-blur-2xl border border-white/15 p-5 sm:p-7 transition-all duration-500 flex flex-col justify-between hover:border-white/40 hover:bg-[#121212]/95 overflow-hidden max-h-[calc(100vh-210px)] ${
        index !== 0 ? "-ml-[1px]" : ""
      }`}
    >
      {/* Top Index */}
      <Link
        to={targetUrl}
        className="flex items-center justify-between pb-4 border-b border-white/15 transition-colors duration-500 group-hover:border-white/40 shrink-0"
      >
        <span className="font-mono text-xs font-semibold tracking-[0.2em] text-white/70 uppercase group-hover:text-white transition-colors">
          REF. 0{index + 1}
        </span>
        <ArrowUpRight
          size={18}
          className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </Link>

      {/* Card Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch my-3 flex-1 overflow-y-auto pr-1.5 custom-scrollbar">
        
        {/* Left: Text & Precedents */}
        <div className="md:col-span-7 flex flex-col justify-between h-full">
          <div>
            <Link to={targetUrl} className="block group/title">
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-tight leading-[1.15] mb-1">
                {item.title}
                {item.subtitle && (
                  <span className="block italic font-light text-white/50 text-lg sm:text-xl mt-1">
                    {item.subtitle}
                  </span>
                )}
              </h3>
            </Link>

            <p className="mt-2.5 text-xs sm:text-sm text-white/60 font-sans font-light leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10">
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase block mb-2.5">
              KEY DOCKET COVERAGE
            </span>
            <ul className="flex flex-col border-t border-white/15">
              {item.keyServices?.slice(0, 3).map((prec, i) => (
                <li
                  key={i}
                  className="py-1.5 border-b border-white/15 text-xs font-sans font-light text-white/70 transition-colors duration-300 group-hover:text-white"
                >
                  {prec}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Image Frame */}
        <Link
          to={targetUrl}
          className="md:col-span-5 h-full min-h-[140px] md:min-h-[240px] border border-white/15 relative overflow-hidden bg-black shrink-0 block group-hover:border-white/40 transition-colors duration-500"
        >
          <img
            loading="lazy"
            decoding="async"
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </Link>

      </div>
    </div>
  );
}