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
          light: '#ffffff', // For frosted glass overlays
          dark: '#1c1b1b',
        },
        // Typography & Lines
        obsidian: '#1a1a1a', // Charcoal text for light mode
        primary: {
          light: '#1a1a1a',
          dark: '#ffffff',
        },
        secondary: {
          light: '#666666',
          dark: '#888888',
        },
        wireframe: 'rgba(255, 255, 255, 0.15)', // Dark mode border
        bronze: '#9a7b56', // Luxury metallic accent
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
        serif: ["Playfair Display", "serif"]
      },
      fontSize: {
        "display-huge": ["clamp(4rem, 10vw, 128px)", { lineHeight: "0.95", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-large": ["clamp(2.5rem, 6vw, 64px)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }]
      },
      spacing: {
        "gutter": "32px",
        "container-max-width": "1440px",
        "margin-mobile": "24px",
        "unit": "8px",
        "margin-desktop": "80px",
        "margin-tablet": "40px",
        "section-gap": "160px"
      },
    },
  },
  plugins: [],
}
