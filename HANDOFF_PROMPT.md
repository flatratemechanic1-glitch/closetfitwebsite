# Handoff Prompt — Copy everything below this line into a new Claude Code session

---

## Project Context

I'm building **ClosetFitApp.com** — a premium marketing website for an AI-powered virtual try-on and wardrobe management app. The project uses **Astro 6 + Vercel + Tailwind CSS v4 + React Islands**.

### What's done (Phase 1 — COMPLETE):
- Master plan: `WEB_PRESENCE_MASTER_PLAN.md` (read this first — it has the full spec)
- 7 Claude skills in `.claude/skills/` (read these — they define all coding patterns)
- Astro 6 project initialized with `@astrojs/vercel` adapter + `@tailwindcss/vite`
- Animated "Coming Soon" landing page deployed to Vercel
- GitHub repo: https://github.com/flatratemechanic1-glitch/closetfitwebsite
- Auto-deploys on push to `main`
- 8 placeholder app screenshots in `public/screenshots/`

### What needs to be built now (Phase 2 — Core Site Build):

**IMPORTANT: Read these files first before writing any code:**
1. `WEB_PRESENCE_MASTER_PLAN.md` — Full spec (sections 2-4 and 10 are most relevant for Phase 2)
2. `.claude/skills/astro-web-development/SKILL.md` — Astro patterns, Islands, ClientRouter
3. `.claude/skills/web-animation-patterns/SKILL.md` — 4-layer animation system
4. `.claude/skills/tailwind-v4-astro/SKILL.md` — Design tokens, component patterns
5. `.claude/skills/web-seo-standards/SKILL.md` — JSON-LD schemas, meta tags

**Immediate fix:**
- Replace the ugly placeholder favicon at `public/favicon.svg` with a proper ClosetFit branded icon

**Build order for Phase 2:**
1. **Navigation** (`src/components/global/Navigation.astro`) — sticky nav, blur backdrop `bg-bg/80 backdrop-blur-xl`, shrinks on scroll, mobile hamburger menu, links to: Features, Pricing, Blog, "Join Waitlist" CTA button
2. **Footer** (`src/components/global/Footer.astro`) — links, social icons, app store badges
3. **Homepage Hero** — replace the Coming Soon content in `src/pages/index.astro` with: aurora gradient mesh background (plum #4E2A6B, indigo #2E2E78, warm gold rgba(201,168,124,0.30)), mouse-following spotlight overlay (champagne-to-lavender glow), canvas particle system (Champagne #C9A87C), 3D phone mockup showing screenshot (try CSS 3D first — if good enough, skip React Three Fiber), GSAP staggered letter reveal headline "Try It On / Without Putting It On" with gradient text (champagne → lavender) on "Without Putting It On", Coral CTA button with magnetic hover
4. **Problem Section** — animated number count-up ("100+ items"), progress ring animation, CSS scroll-driven fade-in
5. **How It Works** — GSAP ScrollTrigger scroll-pinned 3-step timeline with screenshots sliding in: "Snap Your Closet" → "Virtual Try-On" → "Styled Daily"
6. **Features** — staggered card reveals (Motion library), CSS-only auto-scrolling screenshot marquee (all 8 screenshots, infinite loop, pauses on hover)
7. **Pricing** — plan cards with scroll reveal, toggle annual/monthly, popular plan highlighted with Coral CTA + Lavender AI badge
8. **Testimonials** — carousel with auto-slide
9. **FAQ** — `<details>` accordion with smooth height transitions, FAQPage JSON-LD schema
10. **Final CTA** — full-width gradient section with aurora mesh, large Coral CTA button
11. Additional pages: `/features`, `/pricing`, `/about`, `/download` (fanned screenshot cards), `/waitlist`, `/press`, `/privacy`, `/terms`

### Key design rules ("Noir Luxe"):
- **Dark mode ONLY**: Background `#09090B` (deep obsidian), never use white/light backgrounds
- **Glassmorphism surfaces**: `rgba(255, 255, 255, 0.05)` with `backdrop-blur-xl`, border `rgba(255, 255, 255, 0.08)`. Solid fallback: `#131316`
- **Champagne `#C9A87C`**: Primary brand — links, heading accents, trust actions, nav active states (Light: `#DCC4A0`, Dark: `#A68B5B`)
- **Lavender `#A78BFA`**: AI features ONLY — "AI" badges, tech callouts, lavender left-border on AI cards (Light: `#C4B5FD`, Dark: `#8B5CF6`)
- **Coral `#FF6B8A`**: CTAs and primary action buttons ONLY — "Join Waitlist", "Get Early Access", "Download" (Light: `#FF8FA8`, Dark: `#E84E6E`)
- **NEVER use pure white `#FFFFFF`** for text — always warm cream `#F5F0EB`. Secondary: `#A09B93`. Muted: `#6B6560`
- **Typography**: Clash Display (Fontshare) for headlines/hero/section titles, Inter (Google Fonts) for body/UI/nav, SF Mono/Fira Code for labels/code
- **Aurora gradient mesh backgrounds**: Ambient orbs of plum `#4E2A6B`, indigo `#2E2E78`, warm gold `rgba(201,168,124,0.30)`
- **8-point grid**: All spacing multiples of 4px
- **44px min touch targets**
- **Animation layers**: CSS-first → Motion library → GSAP → Three.js (only escalate when needed)
- **Performance**: Lighthouse >95, only animate `transform` and `opacity`, lazy-load heavy components with `client:visible`
- **Accessibility**: `prefers-reduced-motion` support on ALL animations, proper heading hierarchy, focus rings
- **Zero JS by default**: Use `.astro` components unless React state/interactivity is required

### Tech stack:
- Astro 6 (static output) with `@astrojs/vercel` adapter
- Tailwind CSS v4 via `@tailwindcss/vite` plugin (tokens defined in `src/styles/global.css` using `@theme`)
- React 19 for interactive Islands only (`client:visible` or `client:idle`)
- GSAP + ScrollTrigger (lazy loaded) for complex scroll animations
- Motion library (~3.8kb) for viewport reveals and hover effects
- CSS Scroll-Driven Animations for zero-JS scroll effects

### After building, commit and push to `main` — Vercel auto-deploys.
