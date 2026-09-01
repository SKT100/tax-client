// src/components/layout/Navbar.jsx

import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import PillButton from "../ui/PillButton";
import { SITE_CONFIG } from "../../data/siteConfig";

const MEGA_MENU_CONTENT = {
  about: {
    title: "About the Firm",
    description:
      "Expert tax consultancy and statutory compliance solutions tailored for businesses and individuals across West Bengal.",
    links: [
      { name: SITE_CONFIG.principal.name, path: "/about" },
      { name: "Professional Pedigree", path: "/about#pedigree" },
      { name: "Compliance Vault", path: "/about#compliance-vault" },
      { name: "Chamber Network", path: "/locations" },
      { name: "Beyond the Desk", path: "/about#beyond-the-desk" },
    ],
  },
  services: {
    title: "Practice Catalogue",
    description:
      "Full-spectrum statutory compliance, direct tax advocacy, GST lifecycle management, and enterprise regulatory directives.",
    links: [
      { name: "Accounts & Audit", path: "/services#accounts-audit" },
      { name: "Goods & Services Tax (GST)", path: "/services#gst" },
      { name: "Income Tax & Notice Scrutiny", path: "/services#income-tax" },
      { name: "TDS & Payroll Compliance", path: "/services#tds-payroll" },
      { name: "Company & Entity Registration", path: "/services#company-registration" },
      { name: "PF & ESIC Statutory Advisory", path: "/services#pf-esic" },
      { name: "Trade Licences & MSME Advisory", path: "/services#licences-advisory" },
    ],
  },
  compliance: {
    title: "Statutory Due Dates",
    description:
      "Statutory compliance calendar, tax filing deadlines, advance tax schedules, and penalty prevention matrices for FY 2026-27.",
    links: [
      { name: "Complete Due Date Matrix", path: "/compliance" },
      { name: "GST Monthly Deadlines (GSTR-1 / 3B)", path: "/compliance" },
      { name: "Income Tax & Advance Tax Dates", path: "/compliance" },
      { name: "TDS / TCS Deposit & Return Cutoffs", path: "/compliance" },
      { name: "EPF, ESIC & WB P-Tax Deadlines", path: "/compliance" },
      { name: "Annual Tax Audit & GSTR-9/9C", path: "/compliance" },
    ],
  },
  locations: {
    title: "Chambers & Regional Desks",
    description:
      "Municipal on-ground support and direct tax representation covering Baidyabati, Serampore, Hooghly corridor, and Greater Kolkata.",
    links: [
      { name: "Baidyabati & Sheoraphuli (HQ)", path: "/locations" },
      { name: "Serampore & Rishra Industrial Belt", path: "/locations" },
      { name: "Uttarpara, Hindmotor & Konnagar", path: "/locations" },
      { name: "Chandannagar & Chinsurah Hub", path: "/locations" },
      { name: "Greater Kolkata & Salt Lake Sector V", path: "/locations" },
    ],
  },
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isTempTranslucent, setIsTempTranslucent] = useState(false);

  const themeTimeoutRef = useRef(null);
  const hashTimeoutRef = useRef(null);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Passive rAF scroll tracker with state diff guard
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

  // Hash anchor navigation with timeout disposal
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
  }, [location.pathname, location.hash, location.search]);

  // Clean up theme toggle timer
  useEffect(() => {
    return () => {
      if (themeTimeoutRef.current) clearTimeout(themeTimeoutRef.current);
    };
  }, []);

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
    const [targetPath, hash] = path.split("#");
    const targetRoute = targetPath.split("?")[0];
    const isCurrentPage = location.pathname === targetRoute;

    if (isCurrentPage) {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const isSolid =
    !isHomePage || isScrolled || activeMenu !== null || isTempTranslucent;

  const textClasses = isSolid
    ? "text-primary-light dark:text-primary-dark"
    : "text-primary-dark";

  return (
    <header
      className="fixed top-0 w-full z-50 transition-colors duration-300"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Dynamic Glass Surface */}
      <div
        className={`absolute inset-0 w-full h-full glass-nav transition-opacity duration-700 ease-in-out ${
          isSolid ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div className="relative flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto h-20">
        {/* Navigation Links */}
        <ul
          className={`hidden md:flex gap-8 lg:gap-10 font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${textClasses}`}
        >
          {Object.keys(MEGA_MENU_CONTENT).map((item) => (
            <li
              key={item}
              className="relative group"
              onMouseEnter={() => setActiveMenu(item)}
            >
              <Link
                to={`/${item}`}
                onClick={() => handleLinkClick(`/${item}`)}
                className={`block py-4 transition-opacity duration-150 ${
                  activeMenu === item
                    ? "opacity-100 font-bold"
                    : "opacity-70 group-hover:opacity-100"
                }`}
              >
                {item}
                {activeMenu === item && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-2 left-0 right-0 h-[1.5px] bg-current"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Centered Brand Identity */}
        <Link
          to="/"
          onClick={() => setActiveMenu(null)}
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
        <div className="flex items-center gap-5 sm:gap-6">
          <ThemeToggle onToggle={handleThemeToggle} />
          <Link
            to="/schedule"
            onClick={() => setActiveMenu(null)}
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

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-surface-light dark:bg-surface-dark border-b border-theme shadow-2xl transition-colors duration-300"
          >
            <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-10 sm:py-12 flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Context Summary */}
              <div className="w-full md:w-1/3 shrink-0">
                <h3 className="font-serif text-2xl md:text-3xl font-light text-primary-light dark:text-primary-dark mb-3 tracking-tight capitalize">
                  {MEGA_MENU_CONTENT[activeMenu].title}
                </h3>
                <p className="font-body font-light text-secondary-light dark:text-secondary-dark text-xs sm:text-sm leading-relaxed">
                  {MEGA_MENU_CONTENT[activeMenu].description}
                </p>
              </div>

              {/* 2-Column Responsive Links Grid */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3.5 border-t md:border-t-0 md:border-l border-theme pt-6 md:pt-0 md:pl-12 flex-1 items-center">
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
    </header>
  );
}

export default memo(Navbar);