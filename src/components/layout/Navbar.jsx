// src/components/layout/Navbar.jsx

import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Phone, MessageSquare } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import PillButton from "../ui/PillButton";
import { SITE_CONFIG } from "../../data/siteConfig";

const MEGA_MENU_CONTENT = {
  about: {
    title: "About the Firm",
    route: "/about",
    description:
      "Expert tax consultancy and statutory compliance solutions tailored for businesses and individuals across West Bengal.",
    links: [
      { name: SITE_CONFIG.principal.name, path: "/about" },
      { name: "Professional Pedigree", path: "/about#pedigree" },
      { name: "Compliance Vault", path: "/about#compliance-vault" },
      { name: "Chamber Network", path: "/locations" },
    ],
  },
  services: {
    title: "Practice Catalogue",
    route: "/services",
    description:
      "Full-spectrum statutory compliance, direct tax advocacy, GST lifecycle management, and enterprise regulatory directives.",
    links: [
      { name: "Accounts & Audit", path: "/services#accounts-audit" },
      { name: "Goods & Services Tax (GST)", path: "/services#gst" },
      { name: "Income Tax & Notice Scrutiny", path: "/services#income-tax" },
      { name: "TDS & Payroll Compliance", path: "/services#tds-payroll" },
      { name: "Company Registration", path: "/services#company-registration" },
      { name: "PF & ESIC Advisory", path: "/services#pf-esic" },
      { name: "Trade Licences & MSME", path: "/services#licences-advisory" },
    ],
  },
  compliance: {
    title: "Statutory Due Dates",
    route: "/compliance",
    description:
      "Statutory compliance calendar, tax filing deadlines, advance tax schedules, and penalty prevention matrices for FY 2026-27.",
    links: [
      { name: "Complete Due Date Matrix", path: "/compliance" },
      { name: "GST Monthly Deadlines", path: "/compliance" },
      { name: "Income Tax & Advance Tax", path: "/compliance" },
      { name: "TDS / TCS Deposit Cutoffs", path: "/compliance" },
      { name: "EPF, ESIC & WB P-Tax", path: "/compliance" },
    ],
  },
  insights: {
    title: "Statutory Insights & Blog",
    route: "/blog",
    description:
      "Directives, procedural notice defenses, and regulatory legal analyses curated by Matrix Tax Solutions.",
    links: [
      { name: "All Articles & Briefs", path: "/blog" },
      { name: "Direct Tax & ITR Filing", path: "/blog" },
      { name: "GST Law & SCN Defense", path: "/blog" },
      { name: "Company Law & Incorporation", path: "/blog" },
      { name: "Municipal Licences & P-Tax", path: "/blog" },
    ],
  },
  locations: {
    title: "Chambers & Regional Desks",
    route: "/locations",
    description:
      "Municipal on-ground support and direct tax representation covering Baidyabati, Serampore, Hooghly corridor, and Greater Kolkata.",
    links: [
      { name: "Baidyabati HQ Chambers", path: "/locations" },
      { name: "Serampore & Rishra Belt", path: "/locations" },
      { name: "Uttarpara & Konnagar", path: "/locations" },
      { name: "Chandannagar Hub", path: "/locations" },
      { name: "Kolkata Corporate Desk", path: "/locations" },
    ],
  },
};

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
        
        {/* Desktop Navigation Links */}
        <ul
          className={`hidden md:flex gap-6 lg:gap-8 font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${textClasses}`}
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
                {key}
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

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 text-primary-light dark:text-primary-dark transition-colors z-20 cursor-pointer ${
            isSolid ? "" : "text-white"
          }`}
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Centered Brand Logo */}
        <Link
          to="/"
          onClick={() => handleLinkClick("/")}
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-transform hover:scale-105 duration-200"
        >
          <img
            src="/images/Matrix-tax-logo.svg"
            alt={SITE_CONFIG.firm.name}
            className={`h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300 ${
              isSolid ? "invert dark:invert-0" : "invert-0"
            }`}
          />
        </Link>

        {/* Actions Dock */}
        <div className="flex items-center gap-3 sm:gap-6">
          <ThemeToggle onToggle={handleThemeToggle} />
          
          <Link
            to="/schedule"
            onClick={() => handleLinkClick("/schedule")}
            className="hidden md:inline-flex no-underline"
          >
            <PillButton
              variant="auto"
              className="px-6 py-2.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase whitespace-nowrap bg-primary-light text-surface-light hover:bg-obsidian dark:bg-primary-dark dark:text-primary-light dark:hover:bg-slate-100 border border-theme shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              FILE RETURN NOW
            </PillButton>
          </Link>
        </div>
      </div>

      {/* Desktop Mega Menu Overlay */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden md:block absolute top-full left-0 w-full bg-surface-light dark:bg-surface-dark border-b border-theme shadow-2xl transition-colors duration-300"
          >
            <div className="max-w-container-max-width mx-auto px-margin-desktop py-10 sm:py-12 flex flex-row gap-16">
              <div className="w-1/3 shrink-0">
                <h3 className="font-serif text-3xl font-light text-primary-light dark:text-primary-dark mb-3 tracking-tight capitalize">
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

      {/* Mobile Slide-Out Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-theme bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-xl px-margin-mobile py-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <nav className="flex flex-col divide-y divide-theme">
                {[
                  { name: "About Profile", path: "/about" },
                  { name: "Services Catalogue", path: "/services" },
                  { name: "Compliance Due Dates", path: "/compliance" },
                  { name: "Statutory Insights", path: "/blog" },
                  { name: "Chambers & Locations", path: "/locations" },
                  { name: "Schedule Advisory", path: "/schedule" },
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
                  className="w-full no-underline"
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
                    className="flex items-center gap-1.5 no-underline hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Call Chambers</span>
                  </a>
                  <a
                    href={SITE_CONFIG.contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 no-underline hover:underline text-emerald-600 dark:text-emerald-400"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
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