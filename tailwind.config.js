/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core background surfaces
        surface: {
          light: '#FBF9F5', // Patreon Clean Warm Ivory
          dark: '#141313',  // Lex Elegantia Pitch Black
        },
        'surface-secondary': {
          light: '#FFFFFF', // For frosted glass overlays
          dark: '#1C1B1B',
        },
        // Typography & Lines
        obsidian: '#1A1A1A', // Charcoal text for light mode
        primary: {
          light: '#1A1A1A',
          dark: '#FFFFFF',
        },
        secondary: {
          light: '#666666',
          dark: '#888888',
        },
        wireframe: 'rgba(255, 255, 255, 0.15)',
        bronze: '#9A7B56',
      },

      fontFamily: {
        body: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      fontSize: {
        "display-huge": ["clamp(3.5rem, 8vw, 112px)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-large": ["clamp(2.5rem, 5.5vw, 64px)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-medium": ["clamp(1.75rem, 3.5vw, 42px)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },

      spacing: {
        "unit": "8px",
        "gutter": "32px",
        "margin-mobile": "24px",
        "margin-tablet": "40px",
        "margin-desktop": "80px",
        "container-max-width": "1440px",
        "section-gap": "140px",
      },

      borderRadius: {
        "theme": "16px",
        "theme-lg": "24px",
        "theme-pill": "60px",
      },
    },
  },
  plugins: [],
}