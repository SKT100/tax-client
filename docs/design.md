---
name: Lex Elegantia
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c7c6c6'
  on-secondary: '#303031'
  secondary-container: '#464747'
  on-secondary-container: '#b5b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.15em
  ui-element:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
spacing:
  unit: 8px
  container-max-width: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style

This design system is built for a high-end legal portfolio, where precision and authority are paramount. The aesthetic follows a **Modern Minimalist** philosophy with **Glassmorphic** accents, emphasizing clarity through reduction. 

The personality is intellectual, disciplined, and uncompromisingly professional. By utilizing a "Wireframe-Chic" approach—characterized by ultra-thin borders and generous negative space—the UI recedes to allow the legal expertise and case studies to take center stage. The emotional response is one of absolute trust and quiet confidence.

## Colors

The palette is strictly monochromatic to evoke a sense of timelessness and legal gravity. 

- **Primary Backgrounds:** Use `#000000` for deep immersion and `#121212` for secondary containers or section differentiation.
- **Typography:** Pure `#FFFFFF` is reserved for primary headings and essential body text to ensure maximum readability against the dark canvas. `#888888` (Silver) is used for metadata, labels, and secondary information to create a clear visual hierarchy.
- **Borders:** All structural lines use a low-opacity white (approx. 15%) to maintain the "wireframe" aesthetic without creating visual noise.

## Typography

The typographic system relies on a high-contrast pairing:
1. **Playfair Display (Serif):** Used for headlines. It conveys the traditional authority of the legal profession. Headings should utilize tighter letter-spacing and substantial line heights to feel editorial.
2. **Inter (Sans-Serif):** Used for all functional text, body copy, and UI labels. It provides a technical, modern balance to the serif headings.

**Scale Strategy:** Large display type should be used sparingly to anchor pages. Body text is slightly oversized (18px) to prioritize legibility and provide a premium feel.

## Layout & Spacing

The layout philosophy is **Spacious & Structural**. 
- **Grid:** A 12-column fluid grid on desktop, transitioning to 4 columns on mobile.
- **Whitespace:** Emphasize vertical rhythm. Section gaps are aggressive (160px+) to ensure each case study or service area feels distinct and momentous.
- **Borders:** Use 1px borders to define the grid visually. Instead of using shadows to separate content, use these fine lines to create a "blueprint" or "dossier" feel.
- **Alignment:** Consistent left-alignment for all text blocks to maintain a disciplined, architectural look.

## Elevation & Depth

This design system eschews traditional shadows in favor of **Glassmorphism** and **Tonal Layering**:

- **Glassmorphic Elements:** Global navigation and floating action bars use a high-saturation background blur (30px+) with a semi-transparent `#121212` fill (60% opacity). A 1px white border at 10% opacity defines the edge.
- **Surface Tiers:** 
  - Level 0: Pure Black (#000000) - Base canvas.
  - Level 1: Deep Charcoal (#121212) - Cards, input fields, and hover states.
- **Interactive Depth:** On hover, elements should not "lift" with shadows but rather transition their border opacity from 15% to 40% or change background tint slightly.

## Shapes

The shape language is strictly **Sharp (0px)**. 

To reinforce the sense of precision, legal rigor, and architectural modernism, no rounded corners are permitted. This applies to buttons, input fields, cards, and glassmorphic overlays. Every element must be a perfect rectangle or square, emphasizing the "Wireframe" aesthetic.

## Components

- **Buttons:** Primary buttons are "Ghost" style—1px white borders, sharp corners, white text. On hover, they invert (White background, black text). Secondary buttons use silver (#888888) text with no border.
- **Inputs:** Underline-only or full 1px box borders. Placeholder text in silver (#888888). Focus state increases border opacity to 100% white.
- **Cards:** Defined by 1px borders. No background fill unless hovered, at which point the background transitions to `#121212`.
- **Navigation:** A fixed top-bar with a heavy backdrop-filter (blur) and a single 1px bottom border. Links are in `label-caps` style.
- **Lists:** Traditional bullet points are replaced with thin horizontal rules (1px) separating list items, reinforcing the structured, dossier-like feel.
- **Chips/Tags:** Small, sharp-edged boxes with 1px borders and `label-caps` typography.
