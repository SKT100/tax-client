// src/App.jsx

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import LoadingScreen from './components/ui/LoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Compliance = lazy(() => import('./pages/Compliance'));
const Locations = lazy(() => import('./pages/Locations'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Blog = lazy(() => import('./pages/Blog'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [stage, setStage] = useState('initial');
  const [progress, setProgress] = useState(0);
  const isTransitioningRef = useRef(false);

  const runCounter = useCallback((onFinish) => {
    setProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      const step = current > 75 ? Math.floor(Math.random() * 8) + 6 : Math.floor(Math.random() * 6) + 4;
      current = Math.min(current + step, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 120);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = runCounter(() => {
      setStage('opening');
      setTimeout(() => {
        setStage('idle');
      }, 700);
    });

    const safetyTimeout = setTimeout(() => {
      setStage('idle');
    }, 1500);

    return () => {
      cleanup();
      clearTimeout(safetyTimeout);
    };
  }, [runCounter]);

  const navigateWithTransition = useCallback((toPath) => {
    if (isTransitioningRef.current || toPath === `${location.pathname}${location.search}`) return;
    isTransitioningRef.current = true;

    setStage('closing');
    setProgress(0);

    setTimeout(() => {
      navigate(toPath);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      setStage('counting');

      runCounter(() => {
        setStage('opening');
        setTimeout(() => {
          setStage('idle');
          isTransitioningRef.current = false;
        }, 700);
      });
    }, 450);
  }, [location.pathname, location.search, navigate, runCounter]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');

      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !target &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        if (href.includes('#') && href.split('#')[0] === location.pathname) {
          return;
        }

        e.preventDefault();
        e.stopPropagation();
        navigateWithTransition(href);
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [location.pathname, navigateWithTransition]);

  return (
    <>
      <LoadingScreen stage={stage} progress={progress} />

      <div className="relative min-h-screen selection:bg-primary-light selection:text-surface-light dark:selection:bg-primary-dark dark:selection:text-surface-dark">
        <ScrollToTop />
        <Navbar />
        <main className="pt-20">
          <Suspense fallback={<div className="min-h-screen bg-surface-light dark:bg-surface-dark transition-colors duration-300" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/practices" element={<Services />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/due-dates" element={<Compliance />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/chambers" element={<Locations />} />
              <Route path="/insights" element={<Blog />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/schedule" element={<Schedule />} />
              {/* 404 Catch-All Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  useEffect(() => {
    if (!('theme' in localStorage)) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
    });

    window.lenis = lenis;

    let rafId = null;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}