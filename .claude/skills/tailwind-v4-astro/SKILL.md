# Tailwind CSS v4 for Astro — ClosetFitApp.com

## Purpose
Tailwind CSS v4 patterns for the ClosetFitApp dark-mode marketing site. Covers design token mapping, component patterns, responsive design, and animation utilities.

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

/* ClosetFit Design Tokens */
@theme {
  /* Colors */
  --color-bg: #121212;
  --color-surface: #1E1E1E;
  --color-surface-hover: #2A2A2A;
  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-hover: rgba(255, 255, 255, 0.2);

  --color-electric-blue: #2962FF;
  --color-electric-blue-light: #448AFF;
  --color-electric-blue-dark: #1E4ADB;

  --color-neon-lime: #CCFF00;
  --color-neon-lime-light: #D6FF33;
  --color-neon-lime-dark: #A3CC00;

  --color-text-primary: #FFFFFF;
  --color-text-secondary: #B0B0B0;
  --color-text-muted: #757575;

  /* Typography */
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-glow-blue: 0 0 20px rgba(41, 98, 255, 0.3);
  --shadow-glow-lime: 0 0 20px rgba(204, 255, 0, 0.3);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* Container */
  --container-max: 1280px;

  /* Z-Index Scale */
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-nav: 30;
  --z-modal: 40;
  --z-toast: 50;
}
```

---

## Dark Mode — Forced (No Toggle)

ClosetFitApp is dark-mode only. No light mode toggle exists.

```html
<html lang="en" class="dark">
```

All components assume a dark background. Never use white or light backgrounds.

```html
<!-- GOOD -->
<div class="bg-bg text-text-primary">
<div class="bg-surface rounded-lg">

<!-- BAD — light mode colors -->
<div class="bg-white text-gray-900">
<div class="bg-gray-100">
```

---

## Component Patterns

### Primary Button (Electric Blue)

```astro
<a
  href="/waitlist"
  class="inline-flex items-center justify-center px-6 py-3 bg-electric-blue text-white font-semibold rounded-lg transition-all duration-200 hover:bg-electric-blue-light hover:-translate-y-0.5 hover:shadow-glow-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue min-h-[44px]"
>
  Join the Waitlist
</a>
```

### AI / CTA Button (Neon Lime)

**Only use Neon Lime for AI features and primary CTAs.**

```astro
<a
  href="/download"
  class="inline-flex items-center justify-center px-8 py-4 bg-neon-lime text-bg font-bold rounded-lg transition-all duration-200 hover:bg-neon-lime-light hover:-translate-y-0.5 hover:shadow-glow-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-lime min-h-[44px] text-lg"
>
  Get ClosetFit Free
</a>
```

### Secondary / Ghost Button

```astro
<a
  href="/features"
  class="inline-flex items-center justify-center px-6 py-3 border border-border text-text-primary font-medium rounded-lg transition-all duration-200 hover:border-border-hover hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue min-h-[44px]"
>
  See Features
</a>
```

### Card

```astro
<div class="bg-surface rounded-xl border border-border p-6 transition-all duration-200 hover:border-electric-blue/50 hover:-translate-y-1 hover:shadow-lg">
  <h3 class="text-xl font-semibold text-text-primary">{title}</h3>
  <p class="text-text-secondary mt-2">{description}</p>
</div>
```

### Card with AI Accent (Neon Lime left border)

```astro
<div class="bg-surface rounded-xl border border-border p-6 border-l-4 border-l-neon-lime transition-all duration-200 hover:border-electric-blue/50 hover:-translate-y-1 hover:shadow-lg">
  <span class="text-xs font-mono text-neon-lime uppercase tracking-wider">AI Feature</span>
  <h3 class="text-xl font-semibold text-text-primary mt-2">{title}</h3>
  <p class="text-text-secondary mt-2">{description}</p>
</div>
```

### Navigation

```astro
<nav class="fixed top-0 left-0 right-0 z-nav backdrop-blur-xl bg-bg/80 border-b border-border transition-all duration-300">
  <div class="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <a href="/" class="text-xl font-bold text-text-primary">ClosetFit</a>
    <div class="hidden md:flex items-center gap-8">
      <a href="/features" class="text-text-secondary hover:text-text-primary transition-colors duration-200">Features</a>
      <a href="/pricing" class="text-text-secondary hover:text-text-primary transition-colors duration-200">Pricing</a>
      <a href="/blog" class="text-text-secondary hover:text-text-primary transition-colors duration-200">Blog</a>
      <a href="/waitlist" class="inline-flex items-center px-4 py-2 bg-electric-blue text-white rounded-lg hover:bg-electric-blue-light transition-colors duration-200">
        Join Waitlist
      </a>
    </div>
  </div>
</nav>
```

### Pricing Table

```astro
<!-- Active/Popular plan with Neon Lime highlight -->
<div class="relative bg-surface rounded-2xl border-2 border-neon-lime p-8 shadow-glow-lime">
  <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-lime text-bg text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
    Most Popular
  </div>
  <h3 class="text-2xl font-bold text-text-primary">Pro</h3>
  <div class="mt-4">
    <span class="text-4xl font-bold text-text-primary">$9.99</span>
    <span class="text-text-muted">/month</span>
  </div>
  <ul class="mt-6 space-y-3">
    <li class="flex items-center gap-2 text-text-secondary">
      <svg class="w-5 h-5 text-neon-lime shrink-0"><!-- check icon --></svg>
      Unlimited outfit suggestions
    </li>
    <!-- more features -->
  </ul>
  <a href="/waitlist" class="mt-8 block w-full text-center px-6 py-3 bg-neon-lime text-bg font-bold rounded-lg hover:bg-neon-lime-light transition-colors">
    Get Started
  </a>
</div>
```

### FAQ Accordion

```astro
<details class="group border-b border-border">
  <summary class="flex items-center justify-between py-4 cursor-pointer text-text-primary font-medium hover:text-electric-blue transition-colors duration-200">
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
<h1 class="text-3xl sm:text-5xl lg:text-7xl font-bold">

<!-- Mobile: full width, Desktop: contained -->
<div class="px-4 sm:px-6 lg:px-8 max-w-container mx-auto">
```

### Breakpoints

| Breakpoint | Size | Usage |
|-----------|------|-------|
| `sm:` | 640px | Small phones → larger phones |
| `md:` | 768px | Phones → tablets |
| `lg:` | 1024px | Tablets → laptops |
| `xl:` | 1280px | Laptops → desktops |
| `2xl:` | 1536px | Large desktops |

### Touch Targets

All interactive elements MUST be at least 44x44px.

```html
<!-- min-h-[44px] ensures touch target compliance -->
<button class="min-h-[44px] min-w-[44px] px-4 py-2 ...">
<a class="min-h-[44px] inline-flex items-center px-4 py-2 ...">
```

---

## 8-Point Grid System

All spacing uses multiples of 4px (matching the app's design system).

```html
<!-- Section spacing -->
<section class="py-16 sm:py-24">       <!-- 64px / 96px -->

<!-- Card padding -->
<div class="p-6">                       <!-- 24px -->

<!-- Element gaps -->
<div class="space-y-4">                 <!-- 16px -->
<div class="gap-6">                     <!-- 24px -->
<div class="gap-8">                     <!-- 32px -->

<!-- Margins -->
<h2 class="mb-4">                       <!-- 16px -->
<p class="mt-2">                        <!-- 8px -->
```

---

## Typography Scale

```html
<!-- Display / Hero -->
<h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary">

<!-- Page Title -->
<h1 class="text-3xl sm:text-4xl font-bold text-text-primary">

<!-- Section Heading -->
<h2 class="text-2xl sm:text-3xl font-semibold text-text-primary">

<!-- Card Title -->
<h3 class="text-xl font-semibold text-text-primary">

<!-- Body -->
<p class="text-base text-text-secondary leading-relaxed">

<!-- Small / Caption -->
<span class="text-sm text-text-muted">

<!-- Mono / Code / Labels -->
<span class="font-mono text-sm text-electric-blue">
<span class="font-mono text-xs uppercase tracking-wider text-neon-lime">
```

---

## Animation Utilities

### Custom Keyframes in Tailwind

```css
/* In global.css, within @theme or after */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(204, 255, 0, 0.3); }
  50% { box-shadow: 0 0 40px rgba(204, 255, 0, 0.5); }
}

@keyframes shimmer {
  from { background-position: -200% center; }
  to { background-position: 200% center; }
}
```

```html
<!-- Usage with arbitrary values -->
<div class="animate-[fade-up_0.5s_ease-out_both]">
<div class="animate-[glow-pulse_2s_ease-in-out_infinite]">
<div class="animate-[shimmer_2s_linear_infinite]">
```

---

## Accessibility

### Focus Rings

```html
<!-- Visible focus for keyboard navigation -->
<a class="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue">
<button class="focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
```

### Contrast Ratios

| Element | Color | On Background | Ratio | WCAG |
|---------|-------|--------------|-------|------|
| Primary text | `#FFFFFF` | `#121212` | 17.4:1 | AAA |
| Secondary text | `#B0B0B0` | `#121212` | 8.6:1 | AAA |
| Muted text | `#757575` | `#121212` | 4.0:1 | AA |
| Electric Blue | `#2962FF` | `#121212` | 4.2:1 | AA |
| Neon Lime | `#CCFF00` | `#121212` | 14.8:1 | AAA |

### Screen Reader

```html
<!-- Skip link -->
<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>

<!-- Decorative elements -->
<div aria-hidden="true" class="particles-container">...</div>

<!-- Icon buttons -->
<button aria-label="Open menu" class="md:hidden">
  <svg aria-hidden="true">...</svg>
</button>
```

---

## Quick Check

- [ ] All colors use ClosetFit design tokens (no hardcoded hex outside @theme)
- [ ] Neon Lime (#CCFF00) ONLY used for AI features and primary CTAs
- [ ] No light backgrounds anywhere — dark mode only
- [ ] All spacing follows 8-point grid (multiples of 4px)
- [ ] Touch targets minimum 44x44px
- [ ] Mobile-first responsive: styles work on 320px+ widths
- [ ] Focus rings visible on all interactive elements
- [ ] Typography uses the defined scale
- [ ] Contrast ratios meet WCAG AA minimum
- [ ] `sr-only` on skip link and decorative element hiding
