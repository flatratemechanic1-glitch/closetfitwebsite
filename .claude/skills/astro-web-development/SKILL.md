# Astro Web Development — ClosetFitApp.com

## Purpose
Core Astro 6 development patterns for building ClosetFitApp.com. This skill ensures consistent architecture, proper hydration strategies, and optimal performance across the marketing site.

---

## Project Structure

```
src/
├── layouts/           # BaseLayout, PageLayout, BlogLayout
├── components/
│   ├── global/        # Navigation, Footer, ScrollProgress, SEOHead
│   ├── home/          # Homepage sections (Hero, Features, FAQ, etc.)
│   ├── screenshots/   # Screenshot display components
│   ├── blog/          # Blog-specific components
│   ├── quiz/          # Style quiz (React Island)
│   └── ui/            # Reusable UI components (Button, Card, Badge)
├── pages/             # File-based routing
├── styles/            # global.css, animations.css, tokens.css
├── lib/               # Sanity client, JSON-LD schema, SEO utils
└── content/           # Astro Content Collections config
```

---

## Astro 6 Configuration

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

export default defineConfig({
  site: 'https://closetfitapp.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    sanity({
      projectId: import.meta.env.SANITY_PROJECT_ID,
      dataset: 'production',
      useCdn: true,
      apiVersion: '2026-01-01',
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['three'],
    },
  },
});
```

---

## Islands Architecture — Hydration Directives

**Rule: Default to zero JS. Only hydrate interactive components.**

| Directive | When It Loads JS | Use For |
|-----------|-----------------|---------|
| *(none)* | Never — static HTML only | Most components (nav, footer, cards, sections) |
| `client:visible` | When element enters viewport | Heavy components: 3D phone, carousels, GSAP timelines |
| `client:idle` | After page load, when browser is idle | Non-critical interactive: quiz start button, email forms |
| `client:load` | Immediately on page load | **Rarely used** — only if interaction is above the fold AND critical |
| `client:media` | When media query matches | Responsive-only interactivity (e.g., mobile menu) |

### Examples

```astro
---
// Static — no JS shipped (default)
import Features from '../components/home/Features.astro';

// React Island — loads when visible (3D hero)
import Hero3DPhone from '../components/home/Hero3DPhone';

// React Island — loads when idle (quiz)
import StyleQuiz from '../components/quiz/StyleQuiz';
---

<!-- Static component: zero JS -->
<Features />

<!-- Heavy interactive: load when user can see it -->
<Hero3DPhone client:visible />

<!-- Interactive but not urgent: load when idle -->
<StyleQuiz client:idle />
```

### Rules
- **NEVER use `client:load` for below-the-fold components**
- **NEVER hydrate a component that doesn't need interactivity** — if it only displays data, make it an `.astro` component
- **Prefer `.astro` components** over `.tsx` for anything that doesn't require React state or event handlers
- **Lazy-load Three.js and GSAP** — always use `client:visible`

---

## Layouts

### BaseLayout.astro
The HTML shell for every page. Includes:
- `<html lang="en">` with dark mode class
- `<head>` with SEOHead component (meta, OG, JSON-LD, canonical)
- View Transitions `<ClientRouter />` directive
- Global CSS imports
- Scroll progress bar
- Skip-to-content accessibility link

```astro
---
import { ClientRouter } from 'astro:transitions';
import SEOHead from '../components/global/SEOHead.astro';
import ScrollProgress from '../components/global/ScrollProgress.astro';
import Navigation from '../components/global/Navigation.astro';
import Footer from '../components/global/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonicalURL?: string;
  schema?: object;
  noindex?: boolean;
}

const { title, description, ogImage, canonicalURL, schema, noindex } = Astro.props;
---

<!doctype html>
<html lang="en" class="dark">
  <head>
    <SEOHead
      title={title}
      description={description}
      ogImage={ogImage}
      canonicalURL={canonicalURL}
      schema={schema}
      noindex={noindex}
    />
    <ClientRouter />
  </head>
  <body class="bg-[#121212] text-white antialiased min-h-screen">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[#2962FF] focus:text-white">
      Skip to content
    </a>
    <ScrollProgress />
    <Navigation />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### PageLayout.astro
Wrapper for marketing pages (features, pricing, about, etc.).

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  schema?: object;
}

const props = Astro.props;
---

<BaseLayout {...props}>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
    <slot />
  </div>
</BaseLayout>
```

### BlogLayout.astro
Blog post wrapper with sidebar, related posts, and article schema.

---

## View Transitions

Astro's View Transitions API provides native browser page transitions with zero additional JS.

### Setup
Already included via `<ClientRouter />` in BaseLayout.

### Named Transitions (Shared Elements)
Use `transition:name` to animate elements that persist across pages:

```astro
<!-- On blog listing page -->
<img
  src={post.image}
  transition:name={`post-image-${post.slug}`}
  alt={post.title}
/>

<!-- On individual blog post page -->
<img
  src={post.image}
  transition:name={`post-image-${post.slug}`}
  alt={post.title}
/>
```

### Custom Transition Animations
```astro
---
import { fade, slide } from 'astro:transitions';
---

<!-- Slide transition for page content -->
<div transition:animate={slide({ duration: '0.3s' })}>
  <slot />
</div>

<!-- Fade transition for hero sections -->
<section transition:animate={fade({ duration: '0.2s' })}>
  ...
</section>
```

### Transition Events
Listen for transition lifecycle events for GSAP cleanup:

```astro
<script>
  document.addEventListener('astro:before-swap', () => {
    // Clean up GSAP ScrollTrigger instances before page swap
    ScrollTrigger.getAll().forEach(t => t.kill());
  });

  document.addEventListener('astro:after-swap', () => {
    // Re-initialize animations after page swap
    initAnimations();
  });
</script>
```

---

## Content Collections

For blog posts and guides managed outside Sanity (or as a fallback):

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.enum([
      'capsule-wardrobe',
      'outfit-ideas',
      'wardrobe-organization',
      'sustainable-fashion',
      'style-tips',
      'ai-fashion',
      'seasonal',
    ]),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

---

## Image Optimization

Use Astro's built-in `<Image>` component for automatic WebP/AVIF conversion, responsive srcset, and lazy loading.

```astro
---
import { Image } from 'astro:assets';
import screenshot01 from '../../public/screenshots/01.png';
---

<!-- Optimized image with responsive sizes -->
<Image
  src={screenshot01}
  alt="ClosetFit app home screen showing AI outfit suggestions"
  widths={[400, 800, 1200]}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  format="webp"
  quality={80}
  loading="lazy"
  class="rounded-2xl"
/>

<!-- Hero image: eager load for LCP -->
<Image
  src={screenshot01}
  alt="ClosetFit app home screen"
  widths={[800, 1200]}
  format="webp"
  quality={85}
  loading="eager"
  fetchpriority="high"
  class="rounded-2xl"
/>
```

### Rules
- **Hero screenshot**: `loading="eager"` + `fetchpriority="high"` (LCP element)
- **Everything else**: `loading="lazy"` (default)
- **Always include descriptive `alt` text** — describe what the screen shows
- **Use `widths` + `sizes`** for responsive images
- **Prefer `webp`** format, fall back to original if needed

---

## File-Based Routing

```
src/pages/
├── index.astro              → closetfitapp.com/
├── features.astro           → closetfitapp.com/features/
├── pricing.astro            → closetfitapp.com/pricing/
├── about.astro              → closetfitapp.com/about/
├── download.astro           → closetfitapp.com/download/
├── waitlist.astro           → closetfitapp.com/waitlist/
├── press.astro              → closetfitapp.com/press/
├── privacy.astro            → closetfitapp.com/privacy/
├── terms.astro              → closetfitapp.com/terms/
├── quiz/
│   ├── index.astro          → closetfitapp.com/quiz/
│   └── results.astro        → closetfitapp.com/quiz/results/
├── blog/
│   ├── index.astro          → closetfitapp.com/blog/
│   ├── [category]/
│   │   └── index.astro      → closetfitapp.com/blog/capsule-wardrobe/
│   └── [slug].astro         → closetfitapp.com/blog/how-to-build-capsule-wardrobe/
├── guides/
│   └── [slug].astro         → closetfitapp.com/guides/complete-capsule-wardrobe-guide/
└── help/
    ├── index.astro          → closetfitapp.com/help/
    └── [slug].astro         → closetfitapp.com/help/getting-started/
```

---

## Environment Variables

```env
# .env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_TOKEN=your_read_token
KIT_API_KEY=your_convertkit_api_key
SITE_URL=https://closetfitapp.com
```

Access in Astro:
```astro
---
const sanityId = import.meta.env.SANITY_PROJECT_ID;
const siteUrl = import.meta.env.SITE_URL;
---
```

**Rule**: Never expose `SANITY_TOKEN` or `KIT_API_KEY` to the client. Only use in server-side code or build-time scripts.

---

## Performance Rules

1. **Ship zero JS by default** — use `.astro` components unless React state is needed
2. **Lazy-load all heavy islands** via `client:visible`
3. **Preload critical assets** — hero image, fonts
4. **Use Astro `<Image>`** for all images — automatic optimization
5. **No render-blocking scripts** — use `<script>` at end of body or with `defer`
6. **Target Lighthouse >95 performance** on every page
7. **Clean up GSAP/ScrollTrigger** on View Transition page swaps

---

## Quick Check

- [ ] `output: 'static'` in astro.config.mjs (SSG)
- [ ] `@astrojs/vercel` adapter configured
- [ ] View Transitions enabled in BaseLayout
- [ ] No `.tsx` components without hydration directives
- [ ] No `client:load` on below-the-fold components
- [ ] All images use `<Image>` component with `alt` text
- [ ] Environment variables not exposed to client
- [ ] GSAP cleanup on `astro:before-swap` event
- [ ] Lighthouse performance >95
