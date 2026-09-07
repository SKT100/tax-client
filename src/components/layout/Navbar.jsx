// src/components/layout/Navbar.jsx

import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import PillButton from "../ui/PillButton";
import { SITE_CONFIG } from "../../data/siteConfig";

const MEGA_MENU_CONTENT = {
  about: {
    label: "About",
    title: "About Matrix Tax Solutions",
    route: "/about",
    description:
      "Expert tax consultancy, GST compliance, and dispute resolution led by Partha Pratim Halder across West Bengal.",
    links: [
      { name: "Principal Profile", path: "/about" },
      { name: "Professional Pedigree", path: "/about#pedigree" },
      { name: "Compliance Vault", path: "/about#compliance-vault" },
      { name: "Chambers Network", path: "/locations" },
    ],
  },
  services: {
    label: "Services",
    title: "Tax & Advisory Services",
    route: "/services",
    description:
      "Comprehensive tax defense, GST lifecycle management, company registrations, and financial bookkeeping.",
    links: [
      { name: "Income Tax & Notice Scrutiny", path: "/services#income-tax" },
      { name: "Goods & Services Tax (GST)", path: "/services#gst" },
      { name: "Accounts & Financial Audit", path: "/services#accounts-audit" },
      { name: "TDS & Payroll Compliance", path: "/services#tds-payroll" },
      { name: "Company & LLP Registration", path: "/services#company-registration" },
      { name: "Trade Licences & MSME", path: "/services#licences-advisory" },
      { name: "PF & ESIC Registration", path: "/services#pf-esic" },
    ],
  },
  compliance: {
    label: "Due Dates",
    title: "Tax Deadlines & Calendar",
    route: "/compliance",
    description:
      "Monthly and annual statutory compliance due dates, tax filing cutoffs, and penalty avoidance schedules for FY 2026-27.",
    links: [
      { name: "Complete Due Date Matrix", path: "/compliance" },
      { name: "GST Monthly Deadlines", path: "/compliance" },
      { name: "Income Tax & Advance Tax", path: "/compliance" },
      { name: "TDS / TCS Deposit Dates", path: "/compliance" },
      { name: "EPF, ESIC & WB P-Tax", path: "/compliance" },
    ],
  },
  insights: {
    label: "Blog",
    title: "Blog",
    route: "/blog",
    description:
      "Practical explanations, notice defense strategies, and regulatory legal bulletins.",
    links: [
      { name: "All Articles & Guides", path: "/blog" },
      { name: "Income Tax & ITR Help", path: "/blog" },
      { name: "GST Notices & SCN Defense", path: "/blog" },
      { name: "Business Incorporation", path: "/blog" },
      { name: "Trade License & P-Tax", path: "/blog" },
    ],
  },
  locations: {
    label: "Offices",
    title: "Chambers & Local Desks",
    route: "/locations",
    description:
      "Local presence and direct tax consultation covering Baidyabati HQ, Serampore, Hooghly corridor, and Greater Kolkata.",
    links: [
      { name: "Baidyabati HQ Chambers", path: "/locations" },
      { name: "Serampore & Rishra Belt", path: "/locations" },
      { name: "Uttarpara & Konnagar Desk", path: "/locations" },
      { name: "Chandannagar Hub", path: "/locations" },
      { name: "Kolkata Corporate Desk", path: "/locations" },
    ],
  },
};

function WhatsAppIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTempTranslucent, setIsTempTranslucent] = useState(false);

  const themeTimeoutRef = useRef(null);
  const hashTimeoutRef = useRef(null);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    let rAF = null;
    const handleScroll = () => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        const scrolled = window.scrollY > 20;
        setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        if (hashTimeoutRef.current) clearTimeout(hashTimeoutRef.current);
        hashTimeoutRef.current = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
    return () => {
      if (hashTimeoutRef.current) clearTimeout(hashTimeoutRef.current);
    };
  }, [location.pathname, location.hash]);

  const handleThemeToggle = () => {
    if (window.scrollY <= 20) {
      setIsTempTranslucent(true);
      if (themeTimeoutRef.current) clearTimeout(themeTimeoutRef.current);
      themeTimeoutRef.current = setTimeout(() => {
        setIsTempTranslucent(false);
      }, 1500);
    }
  };

  const handleLinkClick = (path) => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    const [targetPath, hash] = path.split("#");
    const targetRoute = targetPath.split("?")[0];
    const isCurrentPage = location.pathname === targetRoute;

    if (isCurrentPage) {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const isSolid =
    !isHomePage || isScrolled || activeMenu !== null || isTempTranslucent || isMobileMenuOpen;

  const textClasses = isSolid
    ? "text-primary-light dark:text-primary-dark"
    : "text-primary-dark";

  return (
    <header
      className="fixed top-0 w-full z-50 transition-colors duration-300"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Glass Surface */}
      <div
        className={`absolute inset-0 w-full h-full glass-nav transition-opacity duration-700 ease-in-out ${
          isSolid ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div className="relative flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto h-20">
        
        {/* Desktop Navigation Links (1024px+) */}
        <ul
          className={`hidden lg:flex gap-6 xl:gap-8 font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${textClasses}`}
        >
          {Object.entries(MEGA_MENU_CONTENT).map(([key, item]) => (
            <li
              key={key}
              className="relative group"
              onMouseEnter={() => setActiveMenu(key)}
            >
              <Link
                to={item.route}
                onClick={() => handleLinkClick(item.route)}
                className={`block py-4 transition-opacity duration-150 ${
                  activeMenu === key
                    ? "opacity-100 font-bold"
                    : "opacity-70 group-hover:opacity-100"
                }`}
              >
                {item.label}
                {activeMenu === key && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-2 left-0 right-0 h-[1.5px] bg-current"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile & Tablet Hamburger Toggle (< 1024px) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 text-primary-light dark:text-primary-dark transition-colors z-20 cursor-pointer ${
            isSolid ? "" : "text-white"
          }`}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Centered Brand Logo with Explicit Sizing & High Fetch Priority */}
        <Link
          to="/"
          onClick={() => handleLinkClick("/")}
          aria-label={`${SITE_CONFIG.firm.name} Home`}
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-transform hover:scale-105 duration-200 z-10"
        >
          <img
            src="/images/Matrix-tax-logo.svg"
            alt={SITE_CONFIG.firm.name}
            width="160"
            height="40"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className={`h-8 sm:h-9 md:h-10 w-auto object-contain select-none transition-all duration-300 ${
              isSolid ? "invert dark:invert-0" : "invert-0"
            }`}
          />
        </Link>

        {/* Actions Dock */}
        <div className="flex items-center gap-3 sm:gap-5 z-20">
          <ThemeToggle onToggle={handleThemeToggle} />
          
          <Link
            to="/schedule"
            onClick={() => handleLinkClick("/schedule")}
            className="hidden sm:inline-flex no-underline"
          >
            <PillButton
              variant="auto"
              className="px-5 sm:px-6 py-2.5 rounded-full font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase whitespace-nowrap bg-primary-light text-surface-light hover:bg-obsidian dark:bg-primary-dark dark:text-primary-light dark:hover:bg-slate-100 border border-theme shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              FILE RETURN NOW
            </PillButton>
          </Link>
        </div>
      </div>

      {/* Desktop Mega Menu Overlay (1024px+) */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden lg:block absolute top-full left-0 w-full bg-surface-light dark:bg-surface-dark border-b border-theme shadow-2xl transition-colors duration-300"
          >
            <div className="max-w-container-max-width mx-auto px-margin-desktop py-10 sm:py-12 flex flex-row gap-16">
              <div className="w-1/3 shrink-0">
                <h3 className="font-serif text-3xl font-light text-primary-light dark:text-primary-dark mb-3 tracking-tight">
                  {MEGA_MENU_CONTENT[activeMenu].title}
                </h3>
                <p className="font-body font-light text-secondary-light dark:text-secondary-dark text-sm leading-relaxed">
                  {MEGA_MENU_CONTENT[activeMenu].description}
                </p>
              </div>

              <ul className="grid grid-cols-2 gap-x-10 gap-y-3.5 border-l border-theme pl-12 flex-1 items-center">
                {MEGA_MENU_CONTENT[activeMenu].links.map((linkItem) => (
                  <li key={linkItem.name} className="w-full">
                    <Link
                      to={linkItem.path}
                      onClick={() => handleLinkClick(linkItem.path)}
                      className="font-mono text-xs font-semibold uppercase tracking-widest text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors cursor-pointer flex items-center gap-3 group py-1.5 w-full"
                    >
                      <span className="w-3.5 h-px bg-theme group-hover:w-5 group-hover:bg-primary-light dark:group-hover:bg-primary-dark transition-all duration-200" />
                      <span>{linkItem.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile & Tablet Slide-Out Drawer (< 1024px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-b border-theme bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-xl px-margin-mobile py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <nav className="flex flex-col divide-y divide-theme">
                {[
                  { name: "About Profile", path: "/about" },
                  { name: "Tax & GST Services", path: "/services" },
                  { name: "Filing Due Dates", path: "/compliance" },
                  { name: "Tax Guides & Blog", path: "/blog" },
                  { name: "Chambers & Locations", path: "/locations" },
                  { name: "Schedule Consultation", path: "/schedule" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleLinkClick(item.path)}
                    className="py-3 font-serif text-xl font-light text-primary-light dark:text-primary-dark flex items-center justify-between no-underline"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-4 h-4 text-secondary-light dark:text-secondary-dark" />
                  </Link>
                ))}
              </nav>

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to="/schedule"
                  onClick={() => handleLinkClick("/schedule")}
                  className="w-full sm:hidden no-underline"
                >
                  <PillButton
                    variant="auto"
                    className="w-full py-3.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase text-center justify-center bg-primary-light text-surface-light dark:bg-primary-dark dark:text-primary-light"
                  >
                    FILE RETURN NOW
                  </PillButton>
                </Link>

                <div className="flex items-center justify-center gap-6 pt-2 font-mono text-xs text-secondary-light dark:text-secondary-dark">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                    aria-label={`Call Chambers at ${SITE_CONFIG.contact.phone}`}
                    className="flex items-center gap-1.5 no-underline hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Call Chambers</span>
                  </a>
                  <a
                    href={SITE_CONFIG.contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat with Matrix Tax Solutions on WhatsApp"
                    className="flex items-center gap-1.5 no-underline hover:underline text-emerald-600 dark:text-emerald-400"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default memo(Navbar);