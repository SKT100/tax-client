import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageReady() {
  const location = useLocation();

  useEffect(() => {
    // Reset attribute on path change
    document.body.removeAttribute("data-prerender-ready");

    // Signal ready only after the lazy component has mounted
    const timer = requestAnimationFrame(() => {
      document.body.setAttribute("data-prerender-ready", "true");
    });

    return () => cancelAnimationFrame(timer);
  }, [location.pathname]);

  return null;
}