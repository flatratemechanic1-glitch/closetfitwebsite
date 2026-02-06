# Tailwind CSS v4 for Astro — ClosetFitApp.com

## Purpose
Tailwind CSS v4 patterns for the ClosetFitApp "Noir Luxe" dark-mode marketing site. Covers design token mapping, glassmorphism utilities, component patterns, responsive design, and animation utilities.

---

## Tailwind v4 Setup in Astro

Tailwind v4 is CSS-native — no PostCSS plugin needed. Configuration uses the `@theme` directive in CSS.

```js
// astro.config.mjs
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Note**: Tailwind v4 uses the Vite plugin (`@tailwindcss/vite`) instead of the older `@astrojs/tailwind` integration (which was for v3).

```css
/* src/styles/global.css */
@import 'tailwindcss';

/* ClosetFit "Noir Luxe" Design Tokens */
@theme {
  /* Background System */
  --color-bg: #09090B;
  --color-surface: rgba(255, 255, 255, 0.05);
  --color-surface-hover: rgba(255, 255, 255, 0.08);
  --color-surface-solid: #131316;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hover: rgba(255, 255, 255, 0.15);

  /* Brand Colors — Champagne (primary brand, links, trust) */
  --color-champagne: #C9A87C;
  --color-champagne-light: #DCC4A0;
  --color-champagne-dark: #A68B5B;

  /* Brand Colors — Lavender (AI features ONLY) */
  --color-lavender: #A78BFA;
  --color-lavender-light: #C4B5FD;
  --color-lavender-dark: #8B5CF6;

  /* Brand Colors — Coral (CTAs ONLY) */
  --color-coral: #FF6B8A;
  --color-coral-light: #FF8FA8;
  --color-coral-dark: #E84E6E;

  /* Text System — Warm editorial tones */
  --color-text-primary: #F5F0EB;
  --color-text-secondary: #A09B93;
  --color-text-muted: #6B6560;

  /* Typography */
  --font-display: 'Clash Display', 'Inter', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;

  /* Spacing (8-point grid) */
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.6);
  --shadow-glow-champagne: 0 0 20px rgba(201, 168, 124, 0.25);
  --shadow-glow-lavender: 0 0 20px rgba(167, 139, 250, 0.25);
  --shadow-glow-coral: 0 0 20px rgba(255, 107, 138, 0.3);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Z-Index Scale */
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-nav: 30;
  --z-modal: 40;
  --z-toast: 50;
}
```

---

## Glassmorphism Utilities

```css
/* In global.css — custom Tailwind utilities */
@utility glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@utility glass-strong {
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

```html
<!-- Usage -->
<div class="glass rounded-xl p-6">Glass card</div>
<div class="glass-strong rounded-xl p-6">Stronger glass card</div>
```

---

## Dark Mode — Forced (No Toggle)

ClosetFitApp is dark-mode only. No light mode toggle exists.

```html
<html lang="en" class="dark">
```

All components assume a dark background. Never use white or light backgrounds. Never use pure white `#FFFFFF` for text — always warm cream `#F5F0EB`.

```html
<!-- GOOD -->
<div class="bg-bg text-text-primary">
<div class="glass rounded-xl">

<!-- BAD — light mode colors or pure white -->
<div class="bg-white text-gray-900">
<div class="bg-gray-100">
<p class="text-white"> <!-- use text-text-primary instead -->
```

---

## Component Patterns

### Primary Brand Button (Champagne)

```astro
<a
  href="/waitlist"
  class="inline-flex items-center justify-center px-6 py-3 bg-champagne text-bg font-semibold rounded-xl transition-all duration-200 hover:bg-champagne-light hover:-translate-y-0.5 hover:shadow-glow-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne min-h-[44px]"
>
  Join the Waitlist
</a>
```

### CTA Button (Coral) — CTAs ONLY

```astro
<a
  href="/download"
  class="inline-flex items-center justify-center px-8 py-4 bg-coral text-bg font-bold rounded-xl transition-all duration-200 hover:bg-coral-light hover:-translate-y-0.5 hover:shadow-glow-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral min-h-[44px] text-lg"
>
  Get ClosetFit Free
</a>
```

### Secondary / Ghost Button

```astro
<a
  href="/features"
  class="inline-flex items-center justify-center px-6 py-3 border border-border text-text-primary font-medium rounded-xl transition-all duration-200 hover:border-border-hover hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne min-h-[44px]"
>
  See Features
</a>
```

### Glass Card

```astro
<div class="glass rounded-xl p-6 transition-all duration-200 hover:border-champagne/30 hover:-translate-y-1 hover:shadow-glow-champagne">
  <h3 class="text-xl font-display font-semibold text-text-primary">{title}</h3>
  <p class="text-text-secondary mt-2">{description}</p>
</div>
```

### Card with AI Accent (Lavender left border)

```astro
<div class="glass rounded-xl p-6 border-l-2 border-l-lavender transition-all duration-200 hover:-translate-y-1 hover:shadow-glow-lavender">
  <span class="text-xs font-mono text-lavender uppercase tracking-wider">AI Feature</span>
  <h3 class="text-xl font-display font-semibold text-text-primary mt-2">{title}</h3>
  <p class="text-text-secondary mt-2">{description}</p>
</div>
```

### Navigation

```astro
<nav class="fixed top-0 left-0 right-0 z-nav backdrop-blur-xl bg-bg/80 border-b border-border transition-all duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <a href="/" class="text-xl font-display font-bold text-text-primary">ClosetFit</a>
    <div class="hidden md:flex items-center gap-8">
      <a href="/features" class="text-text-secondary hover:text-champagne transition-colors duration-200">Features</a>
      <a href="/pricing" class="text-text-secondary hover:text-champagne transition-colors duration-200">Pricing</a>
      <a href="/blog" class="text-text-secondary hover:text-champagne transition-colors duration-200">Blog</a>
      <a href="/waitlist" class="inline-flex items-center px-4 py-2 bg-coral text-bg font-semibold rounded-xl hover:bg-coral-light transition-colors duration-200 min-h-[44px]">
        Join Waitlist
      </a>
    </div>
  </div>
</nav>
```

### Pricing Table

```astro
<!-- Active/Popular plan with Coral highlight -->
<div class="relative glass-strong rounded-2xl border-2 border-coral p-8 shadow-glow-coral">
  <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-bg text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
    Most Popular
  </div>
  <h3 class="text-2xl font-display font-bold text-text-primary">Pro</h3>
  <div class="mt-4">
    <span class="text-4xl font-display font-bold text-text-primary">$9.99</span>
    <span class="text-text-muted">/month</span>
  </div>
  <ul class="mt-6 space-y-3">
    <li class="flex items-center gap-2 text-text-secondary">
      <svg class="w-5 h-5 text-lavender shrink-0"><!-- check icon --></svg>
      Unlimited AI outfit suggestions
    </li>
  </ul>
  <a href="/waitlist" class="mt-8 block w-full text-center px-6 py-3 bg-coral text-bg font-bold rounded-xl hover:bg-coral-light transition-colors min-h-[44px]">
    Get Started
  </a>
</div>
```

### FAQ Accordion

```astro
<details class="group border-b border-border">
  <summary class="flex items-center justify-between py-4 cursor-pointer text-text-primary font-medium hover:text-champagne transition-colors duration-200 min-h-[44px]">
    <span>{question}</span>
    <svg class="w-5 h-5 text-text-muted transition-transform duration-200 group-open:rotate-180">
      <!-- chevron-down icon -->
    </svg>
  </summary>
  <div class="pb-4 text-text-secondary">
    <p>{answer}</p>
  </div>
</details>
```

---

## Responsive Patterns

### Mobile-First Approach

Always write mobile styles first, then add breakpoint modifiers.

```html
<!-- Mobile: single column, Desktop: 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- Mobile: stack, Desktop: side by side -->
<div class="flex flex-col lg:flex-row gap-8 items-center">

<!-- Mobile: small text, Desktop: large text -->
<h1 class="text-4xl sm:text-6xl lg:text-8xl font-display font-bold">

<!-- Mobile: full width, Desktop: contained -->
<div class="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
```

### Touch Targets

All interactive elements MUST be at least 44x44px.

```html
<button class="min-h-[44px] min-w-[44px] px-4 py-2 ...">
<a class="min-h-[44px] inline-flex items-center px-4 py-2 ...">
```

---

## 8-Point Grid System

All spacing uses multiples of 4px.

```html
<!-- Section spacing -->
<section class="py-16 sm:py-24">       <!-- 64px / 96px -->

<!-- Card padding -->
<div class="p-6">                       <!-- 24px -->

<!-- Element gaps -->
<div class="space-y-4">                 <!-- 16px -->
<div class="gap-6">                     <!-- 24px -->
<div class="gap-8">                     <!-- 32px -->
```

---

## Typography Scale

```html
<!-- Display / Hero — Clash Display -->
<h1 class="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tight text-text-primary">

<!-- Section Heading — Clash Display -->
<h2 class="text-3xl sm:text-5xl font-display font-semibold text-text-primary">

<!-- Card Title — Clash Display -->
<h3 class="text-xl sm:text-2xl font-display font-semibold text-text-primary">

<!-- Body — Inter -->
<p class="text-base sm:text-lg text-text-secondary leading-relaxed">

<!-- Small / Caption — Inter -->
<span class="text-sm text-text-muted">

<!-- Labels — Inter -->
<span class="text-xs font-sans uppercase tracking-[0.3em] text-champagne">

<!-- Mono / Code / AI Labels -->
<span class="font-mono text-xs uppercase tracking-wider text-lavender">
```

---

## Animation Utilities

### Custom Keyframes in Tailwind

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 138, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 107, 138, 0.5); }
}
```

```html
<!-- Usage with arbitrary values -->
<div class="animate-[fade-up_0.5s_ease-out_both]">
<div class="animate-[glow-pulse_2s_ease-in-out_infinite]">
```

---

## Accessibility

### Focus Rings

```html
<a class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne">
<button class="focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
```

### Contrast Ratios

| Element | Color | On Background | Ratio | WCAG |
|---------|-------|--------------|-------|------|
| Primary text | `#F5F0EB` | `#09090B` | 16.8:1 | AAA |
| Secondary text | `#A09B93` | `#09090B` | 7.5:1 | AAA |
| Muted text | `#6B6560` | `#09090B` | 4.1:1 | AA |
| Champagne | `#C9A87C` | `#09090B` | 8.2:1 | AAA |
| Coral | `#FF6B8A` | `#09090B` | 6.8:1 | AA |
| Lavender | `#A78BFA` | `#09090B` | 5.9:1 | AA |

### Screen Reader

```html
<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>
<div aria-hidden="true" class="particles-container">...</div>
<button aria-label="Open menu" class="md:hidden">
  <svg aria-hidden="true">...</svg>
</button>
```

---

## Quick Check

- [ ] All colors use ClosetFit design tokens (no hardcoded hex outside @theme)
- [ ] Champagne `#C9A87C` for brand/links/trust, Lavender `#A78BFA` for AI ONLY, Coral `#FF6B8A` for CTAs ONLY
- [ ] No light backgrounds — dark mode only
- [ ] No pure white `#FFFFFF` text — use warm cream `#F5F0EB`
- [ ] All surfaces use `glass` or `glass-strong` utilities where possible
- [ ] Headlines use `font-display` (Clash Display), body uses `font-sans` (Inter)
- [ ] All spacing follows 8-point grid (multiples of 4px)
- [ ] Touch targets minimum 44x44px
- [ ] Mobile-first responsive: styles work on 320px+ widths
- [ ] Focus rings visible on all interactive elements
- [ ] Contrast ratios meet WCAG AA minimum
