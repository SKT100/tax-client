import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import PillButton from '../ui/PillButton';

const MEGA_MENU_CONTENT = {
  about: {
    title: "About the Practice",
    description: "Over 25 years of precedent-setting advocacy, constitutional jurisprudence, and institutional trust at the Supreme Court of India.",
    links: [
      { name: "Satyendra Agrawal", path: "/about" },
      { name: "Academic Pedigree", path: "/about#pedigree" },
      { name: "Empanelments Vault", path: "/about#empanelments" },
      { name: "Chambers Network", path: "/about#chambers" },
      { name: "Beyond the Bar", path: "/about#beyond-the-bar" }
    ]
  },
  practices: {
    title: "Practice Areas",
    description: "Comprehensive representation across apex judicial bodies, high courts, statutory tribunals, and corporate arbitrations.",
    links: [
      { name: "Constitutional & Writs", path: "/practices?area=constitutional#practice-areas" },
      { name: "Appellate Litigation", path: "/practices?area=appellate#practice-areas" },
      { name: "Commercial Arbitration", path: "/practices?area=commercial#practice-areas" },
      { name: "Regulatory & Compliance", path: "/practices?area=regulatory#practice-areas" },
      { name: "Civil & Property", path: "/practices?area=civil#practice-areas" }
    ]
  }
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isTempTranslucent, setIsTempTranslucent] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    let rAF = null;
    const handleScroll = () => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.pathname, location.hash, location.search]);

  const handleThemeToggle = () => {
    if (window.scrollY <= 20) {
      setIsTempTranslucent(true);
      setTimeout(() => {
        setIsTempTranslucent(false);
      }, 1500);
    }
  };

  const handleLinkClick = (path) => {
    setActiveMenu(null);
    const [targetPath, hash] = path.split('#');
    const targetRoute = targetPath.split('?')[0];
    const isCurrentPage = location.pathname === targetRoute;

    if (isCurrentPage) {
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const isSolid = !isHomePage || isScrolled || activeMenu !== null || isTempTranslucent;
    
  const textClasses = isSolid
    ? "text-primary-light dark:text-primary-dark"
    : "text-primary-dark";

  const pillVariant = isSolid ? 'auto' : 'on-dark';

  return (
    <header 
      className="fixed top-0 w-full z-50"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div 
        className={`absolute inset-0 w-full h-full bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-theme transition-opacity duration-700 ease-in-out ${
          isSolid ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div className="relative flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto h-20">
        <ul className={`hidden md:flex gap-10 text-sm font-semibold uppercase tracking-widest transition-colors duration-300 ${textClasses}`}>
          {Object.keys(MEGA_MENU_CONTENT).map((item) => (
            <li 
              key={item}
              className="relative group"
              onMouseEnter={() => setActiveMenu(item)}
            >
              <Link 
                to={item === 'about' ? '/about' : '/practices'} 
                onClick={() => handleLinkClick(item === 'about' ? '/about' : '/practices')}
                className={`block py-4 transition-opacity duration-150 ${activeMenu === item ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
              >
                {item}
                {activeMenu === item && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-2 left-0 right-0 h-[2px] bg-current" />
                )}
              </Link>
            </li>
          ))}
        </ul>
        
        <Link 
          to="/" 
          onClick={() => setActiveMenu(null)}
          className={`font-serif text-xl md:text-2xl font-medium tracking-tight absolute left-1/2 -translate-x-1/2 transition-colors duration-300 ${textClasses}`}
        >
          Satyendra Agrawal
        </Link>
        
        <div className="flex items-center gap-6">
          <ThemeToggle onToggle={handleThemeToggle} />
          <Link to="/schedule" onClick={() => setActiveMenu(null)} className="hidden md:inline-flex">
            <PillButton variant={pillVariant}>
              SCHEDULE CONSULTATION
            </PillButton>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 w-full bg-surface-light dark:bg-surface-dark border-b border-theme shadow-xl"
          >
            <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 flex gap-24">
              <div className="w-1/3">
                <h3 className="font-serif text-2xl text-primary-light dark:text-primary-dark mb-3">
                  {MEGA_MENU_CONTENT[activeMenu].title}
                </h3>
                <p className="text-secondary-light dark:text-secondary-dark text-sm leading-relaxed">
                  {MEGA_MENU_CONTENT[activeMenu].description}
                </p>
              </div>
              <ul className="flex flex-col gap-4 border-l border-theme pl-16 justify-center">
                {MEGA_MENU_CONTENT[activeMenu].links.map((linkItem) => (
                  <li key={linkItem.name} className="w-full">
                    <Link 
                      to={linkItem.path} 
                      onClick={() => handleLinkClick(linkItem.path)}
                      className="text-xs font-semibold uppercase tracking-widest text-secondary-light dark:text-secondary-dark hover:text-slate-900 dark:hover:text-primary-dark transition-colors cursor-pointer flex items-center gap-3 group py-1.5 w-full"
                    >
                      <span className="w-4 h-px bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-900 dark:group-hover:bg-surface-light transition-colors" />
                      {linkItem.name}
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