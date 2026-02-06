# ClosetFitApp.com — Web Presence Master Plan

> **Goal**: Build a jaw-dropping, next-level web presence with cinematic animations, world-class SEO, and LLM optimization — designed to dominate both Google and AI search engines.

---

## 1. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | **Astro 6** | Zero JS by default, Islands Architecture for interactive components. 40% faster than Next.js. (Note: Cloudflare acquired Astro Jan 2026, but Astro remains MIT-licensed with official adapters for all platforms.) |
| **Hosting** | **Vercel** | Best-in-class DX, preview deployments for every PR, official Astro adapter, excellent edge network (~20 regions). |
| **Styling** | **Tailwind CSS v4** | Utility-first, native CSS-based (no PostCSS), animation utilities built-in. |
| **Animations** | **GSAP + CSS Scroll-Driven Animations** | GSAP ScrollTrigger for complex sequences. Native CSS `animation-timeline: scroll()` for lightweight scroll effects. Zero-JS where possible. |
| **3D / Hero** | **React Three Fiber** (via Astro React Islands) | 3D phone mockup, particle effects, interactive hero. Loaded only when visible via `client:visible`. |
| **Micro-interactions** | **Motion library (3.8kb)** | Lightweight hover effects, viewport reveals, staggered animations. |
| **Page Transitions** | **Astro View Transitions API** | Native browser Shared Element Transitions. Zero additional JS. App-like navigation. |
| **CMS** | **Sanity.io** | Headless CMS, scheduled publishing, webhook triggers, GROQ API. First-class Astro plugin. |
| **Email** | **Kit (ConvertKit)** | Free to 10K subscribers, visual automation builder. |
| **Analytics** | **GA4 + Plausible + Vercel Analytics + GSC** | Behavior tracking + privacy-compliant analytics + speed insights + SEO monitoring. |
| **AI Visibility** | **Otterly.ai** | Track brand citations across ChatGPT, Perplexity, Google AI Overviews. |
| **Content AI** | **n8n + Gemini API** | Orchestrate daily auto-posting pipeline. |

### Monthly Cost

| Phase | Cost |
|-------|------|
| Pre-launch | $0-9/mo (all free tiers, Vercel Hobby plan) |
| At launch | $50-70/mo (Vercel Pro $20/mo + other services) |
| At scale | $170-300/mo |

---

## 2. Domain & URL Architecture

**Rule: Everything under one domain as subdirectories (NOT subdomains).** Subdirectories rank 40% better. All authority pools into closetfitapp.com.

```
closetfitapp.com/                    # Homepage (animated, interactive)
closetfitapp.com/features/           # Feature showcase with scroll animations
closetfitapp.com/pricing/            # Animated pricing comparison
closetfitapp.com/blog/               # Blog hub (daily auto-posted content)
closetfitapp.com/blog/[category]/    # Category pages (7 keyword clusters)
closetfitapp.com/blog/[slug]/        # Individual posts with AEO-optimized structure
closetfitapp.com/guides/             # Long-form pillar content
closetfitapp.com/help/               # Help center / FAQ
closetfitapp.com/about/              # Brand story + mission
closetfitapp.com/quiz/               # Interactive style personality quiz
closetfitapp.com/waitlist/           # Pre-launch email capture
closetfitapp.com/download/           # Smart app store redirect + deep linking
closetfitapp.com/press/              # Press kit + media assets
closetfitapp.com/privacy/            # Privacy policy
closetfitapp.com/terms/              # Terms of service
closetfitapp.com/llms.txt            # LLM content directory (AEO)
```

### Blog Categories (SEO Keyword Clusters)

| Category | URL | Target Keywords |
|----------|-----|-----------------|
| Capsule Wardrobe | `/blog/capsule-wardrobe/` | capsule wardrobe, minimalist wardrobe |
| Outfit Ideas | `/blog/outfit-ideas/` | outfit ideas, what to wear, daily outfit inspiration |
| Wardrobe Organization | `/blog/wardrobe-organization/` | closet organization, wardrobe management |
| Sustainable Fashion | `/blog/sustainable-fashion/` | sustainable fashion, eco-friendly clothing |
| Style Tips | `/blog/style-tips/` | style tips, fashion advice, how to dress better |
| AI & Fashion | `/blog/ai-fashion/` | AI fashion, AI wardrobe app, AI outfit planner |
| Seasonal Guides | `/blog/seasonal/` | spring wardrobe, summer outfits, winter capsule |

---

## 3. Animation & Interactivity Strategy

This is what makes us jaw-dropping. Every section has purposeful motion. The site should feel like a premium product experience, not a static page.

### Animation Tech Layering

| Layer | Technology | Size | Use For |
|-------|-----------|------|---------|
| **Layer 1: Zero-JS** | CSS Scroll-Driven Animations + View Transitions | 0kb | Scroll reveals, parallax, page transitions, progress bars |
| **Layer 2: Lightweight** | Motion library | 3.8kb | Hover effects, viewport triggers, staggered reveals |
| **Layer 3: Complex** | GSAP + ScrollTrigger | ~30kb | Timeline sequences, scrub animations, morphing |
| **Layer 4: Premium** | React Three Fiber (Astro Island) | ~50kb (lazy) | 3D phone mockup in hero, loaded via `client:visible` |

**Rule: Layer 1 first, escalate only when needed. Never sacrifice Core Web Vitals.**

### Homepage Animation Breakdown

```
HERO SECTION
├── Background: Animated gradient mesh (CSS only, shifts between #121212 → #1A237E → #121212)
├── Particles: Canvas-based Electric Blue (#2962FF) particle system, mouse-reactive
├── 3D Phone: React Three Fiber island — floating phone mockup showing app screenshots
│   └── Rotates slowly on load, responds to mouse position
├── Headline: Staggered letter reveal with GSAP ("Wear Everything You Own")
├── Subhead: Fade-up on 200ms delay
└── CTA Button: Neon Lime (#CCFF00) with magnetic hover effect + glow pulse

PROBLEM SECTION (scroll-triggered)
├── "100+ items" counter: Animated number count-up (Motion library inView trigger)
├── "Only wear 20%": Progress ring animation (CSS animation-timeline: view())
└── Section fade-in: CSS scroll-driven (zero JS)

HOW IT WORKS (scroll-triggered)
├── 3-step timeline: GSAP ScrollTrigger scrub animation
│   Step 1: Phone screenshot slides in from left → "Photograph"
│   Step 2: AI tagging visualization → "AI Organizes"
│   Step 3: Outfit suggestion card fans out → "Get Daily Outfits"
└── Each step pinned while explaining, then scrolls to next

FEATURES SECTION (scroll-triggered)
├── Feature cards: Staggered reveal with Motion library (stagger 0.1s)
├── Each card: Hover → lift + shadow + border glow (Electric Blue)
├── AI features: Neon Lime (#CCFF00) left border accent + subtle pulse
└── Screenshots: Parallax scroll effect (CSS scroll-driven)

PRICING SECTION
├── Plan cards: Scroll reveal with scale-up
├── Hover: Card lifts, shadow deepens, border highlights
├── Popular plan: Subtle glow animation (Neon Lime for AI features)
└── Toggle annual/monthly: Smooth number transition animation

SOCIAL PROOF (scroll-triggered)
├── Testimonial cards: Carousel with smooth auto-slide
├── Star ratings: Staggered reveal (fill left to right)
└── Statistics: Counter animation on viewport entry

FAQ SECTION
├── Accordion: Smooth height transition on expand/collapse
└── Each answer: Fade-in on open

FINAL CTA
├── Full-width section with animated gradient background
├── CTA button: Large, Neon Lime, magnetic hover + glow
└── Scroll-triggered confetti/particle burst on viewport entry
```

### Global Animations

| Element | Animation | Tech |
|---------|-----------|------|
| **Page transitions** | Crossfade with shared element persistence | Astro View Transitions API (0kb) |
| **Scroll progress** | Thin progress bar at top of page | CSS `animation-timeline: scroll(root)` (0kb) |
| **Navigation** | Blur backdrop, shrink on scroll | CSS transition + scroll detection |
| **Buttons (primary)** | Hover lift + shadow | CSS `:hover` transition |
| **Buttons (AI/CTA)** | Magnetic cursor pull + glow pulse | Motion library (3.8kb) |
| **Cards** | Hover lift + border highlight | CSS `:hover` transition |
| **Images** | Lazy load with fade-in | Astro `<Image>` + CSS transition |
| **Links** | Underline slide-in from left | CSS `::after` transition |
| **Loading states** | Skeleton shimmer | CSS animation |

### Performance Guardrails

- **ONLY animate `transform` and `opacity`** (GPU-accelerated, no layout recalc)
- **`will-change` on animated elements** (removed after animation completes)
- **Lazy-load ALL heavy components** via `client:visible` (Three.js, GSAP timelines)
- **`prefers-reduced-motion` support**: All animations disabled for accessibility
- **Target: Lighthouse >95 performance** even with all animations
- **Test: 60fps on mobile** (throttled 4x CPU in DevTools)
- **No animation should delay LCP** — hero text renders immediately, 3D loads after

---

## 4. Placeholder Screenshots & Display Strategy

### Source Images

8x iPhone 6.9" App Store screenshots stored in `placeholder-screens/` (01.png–08.png). These are placeholder images — the real ClosetFit app screenshots will be the **exact same dimensions**, so all layout, carousel sizing, and animation timing will carry over with a straight file swap and zero code changes.

### Display Treatments Across the Site

| Location | Treatment | Animation Layer | Details |
|----------|-----------|-----------------|---------|
| **Hero section** | 3D floating phone mockup | Layer 4: React Three Fiber (~50kb lazy via `client:visible`) | Single screenshot rendered inside a 3D phone model. Slowly rotates on load, responds to mouse/gyro position. |
| **How It Works** | GSAP scroll-pinned sequence | Layer 3: GSAP ScrollTrigger (~30kb lazy) | 3 screenshots slide in one at a time as user scrolls through the 3-step process. Each step pins while explaining, then scrolls to next. |
| **Features section** | Auto-scrolling marquee | Layer 1: CSS-only (0kb JS) | All 8 screenshots in a continuous horizontal scroll strip using CSS `@keyframes` animation. Pauses on hover. Electric Blue (#2962FF) glow border on each frame. Duplicated track for seamless infinite loop. |
| **Social proof / gallery** | Carousel with parallax tilt | Layer 2: Motion library (3.8kb) | Swipeable card carousel with slight 3D parallax tilt on each card. Auto-advances every 4s. Dot indicators below. Touch/swipe on mobile. |
| **Download page** | Fanned card spread | Layer 2: Motion library (3.8kb) | Screenshots fanned out like a hand of cards with overlapping edges. Hover on any card expands it forward with a smooth scale + z-index animation. |
| **Blog sidebar** | Rotating showcase | Layer 1: CSS crossfade (0kb JS) | Single frame that crossfades between screenshots every 5s using CSS `animation`. "See it in action" CTA button below. |

### Image Optimization

- All placeholders served via Astro `<Image>` component (WebP/AVIF auto-conversion)
- Lazy-loaded with fade-in transition everywhere except hero (hero screenshot preloaded for LCP)
- `alt` text on every image: descriptive of the screen being shown (update when real screenshots arrive)
- Responsive srcset: serve smaller images on mobile to save bandwidth

---

## 5. LLM Optimization / Answer Engine Optimization (AEO)

This is the competitive moat competitors don't even know exists yet. By 2026, 25% of organic search traffic shifts to AI chatbots (Gartner). We optimize for BOTH Google AND AI search engines.

### Technical AEO Implementation

| Element | Implementation |
|---------|---------------|
| **`llms.txt`** | Place at root — prioritized URL list for AI crawlers. Top 20-30 most authoritative pages. |
| **`robots.txt`** | Allow GPTBot, PerplexityBot, anthropic-ai, Google-Extended, OAI-SearchBot, ChatGPT-User |
| **JSON-LD Schema** | FAQPage (highest AI citation probability), Article, HowTo, Organization, Person, BreadcrumbList, Product |
| **Direct Answer Blocks** | Every blog post starts with a 40-70 word "answer box" that AI can quote directly |
| **Question-Based Headings** | H2s match natural language queries ("How do I build a capsule wardrobe?") |
| **Comparison Tables** | Structured HTML `<table>` elements AI readily extracts |
| **`lastmod` Timestamps** | On every page — AI crawlers prioritize fresh content |
| **Semantic HTML** | `<article>`, `<section>`, `<nav>`, `<header>` — helps AI distinguish content from boilerplate |

### Content Structure for AI Citation

Every blog post follows this AEO-optimized template:

```
[H1: Question-based title matching search intent]

[ANSWER BOX: 40-70 word direct answer — quotable by AI]

[H2: Section heading as natural language question]
[2-3 sentence answer first, then elaboration]
[Comparison table if applicable]
[Step-by-step instructions with HowTo schema]

[FAQ Section: 5-8 Q&A pairs with FAQPage schema]

[Author bio with Person schema — E-E-A-T signal]
[Sources cited with links — trust signal for AI]
```

### `llms.txt` File (New Standard for AI Crawlers)

```markdown
# ClosetFitApp — AI Content Directory
# Last updated: [auto-updated on build]

## Primary Resources
/guides/capsule-wardrobe-complete-guide    1.0
/guides/ai-wardrobe-management             0.9
/guides/color-theory-personal-style        0.8
/blog/wardrobe-organization/               0.8
/features/                                 0.7
/pricing/                                  0.7
/help/                                     0.6

## Blog Categories
/blog/capsule-wardrobe/                    0.8
/blog/outfit-ideas/                        0.7
/blog/sustainable-fashion/                 0.7
/blog/style-tips/                          0.7
```

### Measuring AI Visibility

| Tool | Purpose | When |
|------|---------|------|
| **Otterly.ai** | Brand Visibility Index across ChatGPT, Perplexity, Google AI Overviews | Monthly from launch |
| **Manual testing** | Search target keywords in ChatGPT, Perplexity, Claude | Weekly |
| **Google Search Console** | AI Overview appearances (if/when Google exposes this data) | Ongoing |

---

## 6. AI Auto-Posting Content Pipeline (Maximum Autopilot)

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Daily at 2:00 AM UTC                   │
│                                                           │
│  n8n Scheduled Trigger                                    │
│  ├── Step 1: Topic Selection                              │
│  │   └── Pull from keyword list or trending topics        │
│  ├── Step 2: Content Generation (Gemini API)              │
│  │   └── 800-1200 words, AEO-optimized structure          │
│  │       - Direct answer box (40-70 words)                │
│  │       - Question-based H2 headings                     │
│  │       - FAQ section (5-8 Q&A pairs)                    │
│  │       - Internal links to pillar content               │
│  ├── Step 3: Enhancement                                  │
│  │   └── Meta description, social snippets, alt text      │
│  │       JSON-LD schema (Article + FAQ)                   │
│  ├── Step 4: Quality Gates (auto-reject if fail)          │
│  │   └── Readability 60-80 Flesch-Kincaid                 │
│  │       Word count ≥600                                  │
│  │       Duplicate similarity <85%                        │
│  │       Keyword density 1-2%                             │
│  │       Brand voice check (second AI pass)               │
│  │       Internal links verified against sitemap          │
│  ├── Step 5: Publish to Sanity CMS                        │
│  │   └── Status: "published" if pass, "draft" if fail     │
│  └── Step 6: Webhook → Vercel deploy hook rebuild          │
│      └── Site live with new post                          │
└─────────────────────────────────────────────────────────┘
```

**Fallback**: Posts that fail any gate are saved as drafts in Sanity. Check dashboard ~1x/week.

---

## 7. Email Capture & Pre-Launch Strategy

### Lead Magnets

| Magnet | Format | Expected Conversion |
|--------|--------|---------------------|
| **Style Personality Quiz** | Interactive 8-10 question visual quiz → results page | 15-25% |
| **Capsule Wardrobe Starter Kit** | PDF download | 5-10% |
| **Early Access Waitlist** | Simple email form | 3-5% |
| **7-Day Wardrobe Challenge** | Email sequence | 8-12% |

### Kit Automation Sequences

**Waitlist Welcome**: Day 0 welcome → Day 1 brand story → Day 3 fashion tip → Day 5 app preview → Day 7 referral ask

**7-Day Wardrobe Challenge**: Daily emails guiding users through closet assessment, outfit building, cost-per-wear discovery → Day 7 early access CTA

**Blog Nurture**: Weekly digest + monthly tips + launch countdown

### Target: 5,000+ subscribers before app launch

---

## 8. SEO + AEO Combined Strategy

### Technical SEO

| Element | Implementation |
|---------|---------------|
| **Sitemap** | Auto-generated (`@astrojs/sitemap`) |
| **Robots.txt** | Allow all crawlers including AI bots (GPTBot, PerplexityBot, anthropic-ai) |
| **`llms.txt`** | Prioritized URL directory for AI crawlers |
| **Canonical URLs** | Set on every page |
| **Open Graph + Twitter Cards** | Rich social previews on every page |
| **JSON-LD Schema** | FAQPage, Article, HowTo, Organization, Person, BreadcrumbList, Product |
| **Core Web Vitals** | LCP <2.5s, INP <200ms, CLS <0.1 |
| **Image optimization** | Astro `<Image>` + WebP/AVIF + lazy loading |
| **Semantic HTML** | Proper heading hierarchy, landmark elements |
| **Internal linking** | Every post → 2-3 related posts + 1 pillar |
| **Mobile-first** | Responsive, thumb-friendly, tested on real devices |

### Primary Keyword Targets

1. "capsule wardrobe" — 90K/mo
2. "closet organization" — 40K/mo
3. "what to wear today" — 22K/mo
4. "wardrobe organizer app" — 12K/mo
5. "outfit planner" — 8K/mo
6. "AI fashion app" — 6K/mo

### Programmatic SEO

| Template | Example | Volume |
|----------|---------|--------|
| "Outfit ideas for [occasion]" | "Outfit ideas for job interview" | 100+ pages |
| "How to style [item] [N] ways" | "How to style a blazer 10 ways" | 50+ pages |
| "Capsule wardrobe for [season] [year]" | "Capsule wardrobe for spring 2026" | 12+ pages/yr |
| "[Style type] wardrobe essentials" | "Minimalist wardrobe essentials" | 20+ pages |

---

## 9. Deep Linking (Web → App)

| Platform | Technology | Behavior |
|----------|-----------|----------|
| iOS | Universal Links | HTTPS links open directly in app |
| Android | App Links | Verified HTTPS links open in app |
| Fallback | Smart redirect | No app → App Store → deferred deep link preserves context |

---

## 10. Branding (Web ↔ App Consistency)

From WEBSITE_STYLE_GUIDE.md:

- **Background**: `#121212` (deep charcoal, never `#000000`)
- **Surfaces**: `#1E1E1E` cards, nav, elevated sections
- **Primary**: `#2962FF` (Electric Blue) — links, buttons, trust actions
- **AI accent**: `#CCFF00` (Neon Lime) — **AI features ONLY**, never general UI
- **Typography**: System fonts, same scale as app
- **Dark mode only**: No light mode
- **8-point grid**: All spacing multiples of 4px
- **Min touch targets**: 44px

---

## 11. Claude Skills to Build

> **CRITICAL: All 7 skills MUST be written and committed BEFORE any site building begins.** Skills give Claude the full context to build everything correctly from the start. Building without them means constant corrections and inconsistencies. This is a non-negotiable prerequisite.

We need **7 new skills** to ensure Claude has the best tools for building this jaw-dropping website. Each skill follows the existing pattern: YAML front matter + comprehensive SKILL.md with code examples, rules, and Quick Check.

### Skill 1: `astro-web-development`
**Purpose**: Core Astro 6 development patterns for ClosetFitApp.com
**Covers**:
- Astro 6 project structure, file-based routing, layouts, components
- Islands Architecture — when to use `client:load` vs `client:visible` vs `client:idle`
- Astro + React integration for interactive components
- View Transitions API setup and custom transitions
- Content Collections for blog posts
- Sanity CMS integration (`sanity-astro` plugin)
- Image optimization (`astro:assets`)
- SSG build optimization, prerendering
- Environment variables and Vercel deployment
- **Quick Check**: Performance, hydration, routing validation

### Skill 2: `web-animation-patterns`
**Purpose**: Animation standards for the ClosetFitApp marketing site
**Covers**:
- Animation tech layering (CSS-first → Motion → GSAP → Three.js)
- CSS Scroll-Driven Animations (`animation-timeline: scroll()`, `animation-timeline: view()`)
- GSAP + ScrollTrigger patterns (timelines, scrub, pin)
- Motion library integration (inView, stagger, hover)
- React Three Fiber in Astro Islands (3D hero section)
- Astro View Transitions API (page transitions, shared elements)
- Micro-interactions (magnetic buttons, hover lifts, cursor effects)
- Performance rules: only animate transform/opacity, `will-change` usage, lazy loading
- `prefers-reduced-motion` accessibility requirement
- **Quick Check**: 60fps verification, CWV impact, accessibility

### Skill 3: `web-seo-standards`
**Purpose**: SEO implementation standards for maximum search visibility
**Covers**:
- Technical SEO checklist (sitemap, robots.txt, canonical URLs, meta tags)
- JSON-LD Schema markup (Article, FAQPage, HowTo, Organization, Person, BreadcrumbList, Product)
- Core Web Vitals targets and optimization (LCP <2.5s, INP <200ms, CLS <0.1)
- Open Graph and Twitter Card meta tags
- Image optimization (WebP/AVIF, alt text, lazy loading)
- Semantic HTML requirements (heading hierarchy, landmarks)
- Internal linking strategy
- Mobile-first responsive design rules
- Structured data validation (Google Rich Results Test)
- **Quick Check**: Schema validation, CWV scores, meta tag completeness

### Skill 4: `llm-optimization`
**Purpose**: Answer Engine Optimization (AEO) for AI search visibility
**Covers**:
- `llms.txt` implementation and maintenance
- `robots.txt` configuration for AI crawlers (GPTBot, PerplexityBot, anthropic-ai, etc.)
- Content structure for AI citation (direct answer blocks, question-based headings)
- FAQPage schema (highest AI citation probability — 2.5x impact)
- The Direct Answer Framework: lead with quotable 40-70 word answer → elaboration
- Comparison tables in proper HTML `<table>` structure
- `lastmod` timestamps on every page
- Semantic HTML for AI content extraction
- Author E-E-A-T signals (Person schema, expertise credentials)
- AI visibility monitoring (Otterly.ai, manual testing)
- **Quick Check**: llms.txt exists, AI crawlers allowed, schema validated, answer blocks present

### Skill 5: `tailwind-v4-astro`
**Purpose**: Tailwind CSS v4 patterns for Astro dark-mode marketing sites
**Covers**:
- Tailwind v4 setup in Astro (native CSS, no PostCSS)
- ClosetFit design tokens mapped to Tailwind theme (`@theme` directive)
- Dark mode utility patterns (forced dark — no toggle)
- Responsive breakpoints and mobile-first patterns
- Animation utilities (custom `@keyframes`, transition classes)
- Component patterns: buttons, cards, navigation, pricing tables, FAQ accordions
- 8-point grid system via spacing scale
- Typography scale matching app style guide
- Accessibility: focus rings, contrast ratios, touch targets
- **Quick Check**: Design token consistency, responsive, accessible

### Skill 6: `sanity-cms-integration`
**Purpose**: Sanity CMS setup and content pipeline for auto-posting
**Covers**:
- Sanity project setup and schema definition (blog post, author, category)
- `sanity-astro` plugin configuration
- GROQ queries for content fetching
- Webhook setup for Vercel deploy hook triggers
- Scheduled publishing workflow
- Sanity API for programmatic content creation (n8n pipeline)
- Image handling (Sanity CDN + Astro optimization)
- Preview mode for draft content
- Content modeling best practices
- **Quick Check**: Webhook fires, content renders, API access verified

### Skill 7: `vercel-deployment`
**Purpose**: Vercel deployment and configuration for Astro
**Covers**:
- Vercel project setup from Git repo
- Custom domain configuration (DNS, SSL)
- `@astrojs/vercel` adapter configuration
- `vercel.json` for headers, redirects, and rewrites
- Environment variables
- Preview deployments for PRs
- Vercel Analytics + Speed Insights setup
- Deploy hooks for CMS webhook triggers
- Edge/serverless function configuration
- Monitoring, alerts, and deployment protection
- **Quick Check**: Deploy succeeds, custom domain works, preview deploys work, headers correct, analytics active

---

## 12. New Repository Structure

### Create: `closetfitapp-web/`

```
closetfitapp-web/
├── .claude/
│   └── skills/                          # All 7 skills above
│       ├── astro-web-development/
│       │   └── SKILL.md
│       ├── web-animation-patterns/
│       │   └── SKILL.md
│       ├── web-seo-standards/
│       │   └── SKILL.md
│       ├── llm-optimization/
│       │   └── SKILL.md
│       ├── tailwind-v4-astro/
│       │   └── SKILL.md
│       ├── sanity-cms-integration/
│       │   └── SKILL.md
│       └── vercel-deployment/
│           └── SKILL.md
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro             # HTML shell, head tags, View Transitions
│   │   ├── PageLayout.astro             # Marketing page wrapper
│   │   └── BlogLayout.astro             # Blog post wrapper with sidebar, related posts
│   ├── components/
│   │   ├── global/
│   │   │   ├── Navigation.astro         # Sticky nav, blur backdrop, scroll shrink
│   │   │   ├── Footer.astro             # Links, social, app store badges
│   │   │   ├── ScrollProgress.astro     # Top progress bar (CSS scroll-driven)
│   │   │   └── SEOHead.astro            # Meta tags, OG, JSON-LD, canonical
│   │   ├── home/
│   │   │   ├── Hero.astro               # Animated hero container
│   │   │   ├── HeroParticles.astro      # Canvas particle system
│   │   │   ├── Hero3DPhone.tsx          # React Three Fiber phone mockup (Island)
│   │   │   ├── ProblemSection.astro     # Animated counters + stats
│   │   │   ├── HowItWorks.astro        # GSAP ScrollTrigger timeline
│   │   │   ├── Features.astro           # Staggered card reveals
│   │   │   ├── ScreenshotMarquee.astro  # Auto-scrolling screenshot strip (CSS-only)
│   │   │   ├── Pricing.astro            # Interactive pricing table
│   │   │   ├── Testimonials.astro       # Animated testimonial carousel
│   │   │   ├── FAQ.astro                # Accordion with smooth transitions
│   │   │   └── FinalCTA.astro           # Gradient background + particle burst
│   │   ├── screenshots/
│   │   │   ├── ScreenshotCarousel.tsx   # Swipeable parallax carousel (React Island)
│   │   │   ├── ScreenshotFan.tsx        # Fanned card spread (React Island)
│   │   │   └── ScreenshotShowcase.astro # Crossfading single-frame showcase (CSS-only)
│   │   ├── blog/
│   │   │   ├── PostCard.astro           # Blog post preview card
│   │   │   ├── PostContent.astro        # Article body with schema
│   │   │   ├── AuthorBio.astro          # E-E-A-T author block
│   │   │   ├── RelatedPosts.astro       # Related content grid
│   │   │   └── EmailCapture.astro       # Kit form integration
│   │   ├── quiz/
│   │   │   └── StyleQuiz.tsx            # Interactive quiz (React Island)
│   │   └── ui/
│   │       ├── Button.astro             # All button variants (primary, AI, secondary)
│   │       ├── Card.astro               # Base card component
│   │       ├── Badge.astro              # "Styled by AI" and other badges
│   │       ├── AnimatedCounter.astro    # Number count-up on viewport entry
│   │       └── MagneticButton.tsx       # Magnetic hover effect (React Island)
│   ├── pages/
│   │   ├── index.astro                  # Homepage
│   │   ├── features.astro
│   │   ├── pricing.astro
│   │   ├── about.astro
│   │   ├── download.astro
│   │   ├── press.astro
│   │   ├── waitlist.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── quiz/
│   │   │   ├── index.astro              # Quiz start page
│   │   │   └── results.astro            # Results + email capture
│   │   ├── blog/
│   │   │   ├── index.astro              # Blog hub
│   │   │   ├── [category]/
│   │   │   │   └── index.astro          # Category listing
│   │   │   └── [slug].astro             # Individual blog post
│   │   ├── guides/
│   │   │   └── [slug].astro             # Pillar content pages
│   │   └── help/
│   │       ├── index.astro              # Help center hub
│   │       └── [slug].astro             # Individual help article
│   ├── styles/
│   │   ├── global.css                   # Tailwind imports + custom properties
│   │   ├── animations.css               # CSS scroll-driven animations + keyframes
│   │   └── tokens.css                   # Design tokens from style guide
│   ├── lib/
│   │   ├── sanity.ts                    # Sanity client + GROQ queries
│   │   ├── schema.ts                    # JSON-LD schema generators
│   │   └── seo.ts                       # Meta tag generation utilities
│   └── content/
│       └── config.ts                    # Astro Content Collections config
├── public/
│   ├── screenshots/                     # Placeholder app screenshots (swap with real later)
│   │   ├── 01.png
│   │   ├── 02.png
│   │   ├── 03.png
│   │   ├── 04.png
│   │   ├── 05.png
│   │   ├── 06.png
│   │   ├── 07.png
│   │   └── 08.png
│   ├── llms.txt                         # AI crawler content directory
│   ├── robots.txt                       # SEO + AI crawler rules
│   ├── favicon.svg                      # ClosetFit logo
│   ├── og-image.png                     # Default Open Graph image
│   ├── apple-app-site-association       # iOS Universal Links
│   └── .well-known/
│       └── assetlinks.json              # Android App Links
├── sanity/
│   ├── sanity.config.ts                 # Sanity Studio config
│   └── schemas/
│       ├── post.ts                      # Blog post schema
│       ├── author.ts                    # Author schema
│       └── category.ts                  # Category schema
├── vercel.json                          # Vercel headers, redirects, rewrites config
├── astro.config.mjs                     # Astro config (Vercel adapter, Tailwind, Sanity, Sitemap)
├── tailwind.config.ts                   # Tailwind v4 theme with ClosetFit tokens
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## 13. Implementation Timeline

### Phase 1: Skills First + Foundation (Days 1-5)

> **Non-negotiable: ALL 7 skills must be written and committed before Phase 2 begins.**

- [ ] Create `closetfitapp-web/` repo and initialize git
- [ ] Write all 7 Claude skills (SKILL.md files):
  1. `astro-web-development`
  2. `web-animation-patterns`
  3. `web-seo-standards`
  4. `llm-optimization`
  5. `tailwind-v4-astro`
  6. `sanity-cms-integration`
  7. `vercel-deployment`
- [ ] Initialize Astro 6 project with `@astrojs/vercel` adapter + Tailwind CSS v4
- [ ] Copy placeholder screenshots to `public/screenshots/`
- [ ] Set up Vercel project + connect Git repo
- [ ] Configure DNS: closetfitapp.com → Vercel
- [ ] Deploy "Coming Soon" animated landing page

### Phase 2: Core Site Build (Weeks 1-3)
- [ ] Build BaseLayout with View Transitions + SEOHead
- [ ] Build animated Navigation (blur, scroll-shrink)
- [ ] Build Homepage: Hero with particles + 3D phone mockup showing placeholder screenshots
- [ ] Build Homepage: Problem, HowItWorks (GSAP ScrollTrigger) with screenshot sequence
- [ ] Build Homepage: Features + auto-scrolling screenshot marquee
- [ ] Build Homepage: Pricing, Testimonials, FAQ, Final CTA
- [ ] Build Features, Pricing, About, Download (with fanned card spread), Press pages
- [ ] Implement all JSON-LD schema markup
- [ ] Set up `llms.txt`, `robots.txt` with AI crawlers
- [ ] Connect Kit for email capture
- [ ] Test: Lighthouse >95, CWV passing, schema valid, mobile responsive

### Phase 3: Blog + CMS (Weeks 2-4)
- [ ] Set up Sanity project + blog/author/category schemas
- [ ] Connect `sanity-astro` plugin
- [ ] Build blog templates (index, category, post) with sidebar screenshot showcase
- [ ] Write 3-5 manual pillar posts
- [ ] Configure Sanity webhook → Vercel deploy hook
- [ ] Set up n8n auto-posting pipeline
- [ ] Launch blog with pillar + first auto-posted content

### Phase 4: Quiz + Lead Gen (Weeks 3-5)
- [ ] Build interactive Style Personality Quiz (React Island)
- [ ] Build results page with email capture
- [ ] Set up Kit automation sequences (waitlist + challenge)
- [ ] Connect quiz results to Kit tags for segmentation
- [ ] A/B test quiz placement on homepage

### Phase 5: Polish + Scale (Weeks 5-8)
- [ ] Implement programmatic SEO pages
- [ ] Add Plausible analytics
- [ ] Set up Otterly.ai for AI visibility tracking
- [ ] Launch 7-Day Wardrobe Challenge email sequence
- [ ] Deep linking setup (apple-app-site-association, assetlinks.json)
- [ ] Scale auto-posting to 1-2 posts/day
- [ ] Performance audit: 60fps animations, CWV, mobile

### Phase 6: Pre-App-Launch Push (Weeks 8-12)
- [ ] Ramp content for authority building
- [ ] Social media promotion of quiz + blog
- [ ] Press kit finalization
- [ ] A/B test landing page CTAs
- [ ] **Swap placeholder screenshots with real ClosetFit app screenshots** (zero code changes needed)
- [ ] Target: 5,000+ email subscribers

---

## 14. Files to Reference

| File | Purpose |
|------|---------|
| closetfitapp/docs/WEBSITE_STYLE_GUIDE.md | Colors, typography, spacing, components — brand bible |
| closetfitapp/docs/MASTER_PLAN.md | 4 pillars, pricing, features — marketing copy source |
| closetfitapp/docs/COMPETITIVE_ANALYSIS.md | Competitor weaknesses for content targeting |
| closetfitapp/docs/AI_STRATEGY.md | AI feature descriptions for features page |

---

## 15. Verification

| Check | Target |
|-------|--------|
| **Lighthouse Performance** | >95 on every page (with animations) |
| **Core Web Vitals** | LCP <2.5s, INP <200ms, CLS <0.1 |
| **Animation FPS** | 60fps on mobile (4x CPU throttle in DevTools) |
| **Schema validation** | All JSON-LD passes Google Rich Results Test |
| **AI crawler access** | GPTBot, PerplexityBot, anthropic-ai can access all pages |
| **`llms.txt`** | Exists at root, lists top 20-30 pages |
| **Mobile responsive** | Tested on iPhone SE, iPhone 15, Pixel 7, iPad |
| **Cross-browser** | Chrome, Safari, Firefox, Edge |
| **`prefers-reduced-motion`** | All animations disabled when set |
| **Email flow** | Signup → confirmation → automation sequence works end-to-end |
| **Preview deploys** | Every PR gets a Vercel preview URL for review |
| **Auto-posting** | n8n triggers, Sanity publishes, Vercel rebuilds, post is live |
| **Dark mode consistency** | Every page matches Industrial Cool aesthetic |
| **Screenshot display** | All 6 treatments render correctly with placeholder images |
| **Screenshot swap** | Replacing placeholder PNGs with real screenshots requires zero code changes |
