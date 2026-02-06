# Web SEO Standards — ClosetFitApp.com

## Purpose
SEO implementation standards for maximum search visibility on ClosetFitApp.com. Covers technical SEO, structured data, Core Web Vitals, and content optimization patterns.

---

## Technical SEO Checklist

Every page on ClosetFitApp.com MUST have:

| Element | Required | Implementation |
|---------|----------|---------------|
| `<title>` | Yes | Unique, 50-60 chars, primary keyword first |
| `<meta name="description">` | Yes | Unique, 150-160 chars, includes CTA |
| Canonical URL | Yes | `<link rel="canonical" href="..." />` |
| Open Graph tags | Yes | og:title, og:description, og:image, og:url, og:type |
| Twitter Card tags | Yes | twitter:card, twitter:title, twitter:description, twitter:image |
| JSON-LD Schema | Yes | At least one schema type per page |
| Semantic HTML | Yes | Proper heading hierarchy, landmark elements |
| `lang="en"` | Yes | On `<html>` element |
| Mobile viewport | Yes | `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Favicon | Yes | SVG preferred + PNG fallback |

---

## SEOHead Component

```astro
---
// src/components/global/SEOHead.astro
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonicalURL?: string;
  schema?: object | object[];
  noindex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    section: string;
    tags: string[];
  };
}

const {
  title,
  description,
  ogImage = '/og-image.png',
  canonicalURL = new URL(Astro.url.pathname, Astro.site).href,
  schema,
  noindex = false,
  article,
} = Astro.props;

const fullTitle = title === 'ClosetFitApp' ? title : `${title} | ClosetFitApp`;
const ogImageURL = new URL(ogImage, Astro.site).href;
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="generator" content={Astro.generator} />

<!-- Primary Meta Tags -->
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />
{noindex && <meta name="robots" content="noindex, nofollow" />}

<!-- Open Graph -->
<meta property="og:type" content={article ? 'article' : 'website'} />
<meta property="og:url" content={canonicalURL} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImageURL} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="ClosetFitApp" />
<meta property="og:locale" content="en_US" />

{article && (
  <>
    <meta property="article:published_time" content={article.publishedTime} />
    {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
    <meta property="article:author" content={article.author} />
    <meta property="article:section" content={article.section} />
    {article.tags.map(tag => <meta property="article:tag" content={tag} />)}
  </>
)}

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageURL} />

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Sitemap -->
<link rel="sitemap" href="/sitemap-index.xml" />

<!-- JSON-LD Schema -->
{schema && (
  <script type="application/ld+json" set:html={JSON.stringify(
    Array.isArray(schema) ? schema : [schema]
  ).replace(/</g, '\\u003c')} />
)}
```

---

## JSON-LD Schema Markup

### Organization Schema (site-wide)

```ts
// src/lib/schema.ts
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ClosetFitApp',
    url: 'https://closetfitapp.com',
    logo: 'https://closetfitapp.com/logo.png',
    description: 'AI-powered virtual try-on and wardrobe app. See yourself in any outfit, digitally.',
    sameAs: [
      'https://twitter.com/closetfitapp',
      'https://instagram.com/closetfitapp',
      'https://tiktok.com/@closetfitapp',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@closetfitapp.com',
    },
  };
}
```

### Article Schema (blog posts)

```ts
export function articleSchema(post: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: { name: string; url: string };
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: post.url,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ClosetFitApp',
      logo: {
        '@type': 'ImageObject',
        url: 'https://closetfitapp.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url,
    },
    articleSection: post.category,
  };
}
```

### FAQPage Schema (highest AI citation probability)

```ts
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
```

### HowTo Schema

```ts
export function howToSchema(howTo: {
  name: string;
  description: string;
  totalTime: string;
  steps: { name: string; text: string; image?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    totalTime: howTo.totalTime,
    step: howTo.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}
```

### BreadcrumbList Schema

```ts
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

### Person Schema (E-E-A-T author signal)

```ts
export function personSchema(author: {
  name: string;
  url: string;
  image: string;
  jobTitle: string;
  description: string;
  sameAs: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: author.url,
    image: author.image,
    jobTitle: author.jobTitle,
    description: author.description,
    sameAs: author.sameAs,
    worksFor: {
      '@type': 'Organization',
      name: 'ClosetFitApp',
    },
  };
}
```

### Product Schema (app listing)

```ts
export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ClosetFitApp',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'iOS, Android',
    description: 'AI-powered virtual try-on and wardrobe app. See yourself in any outfit, digitally.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free with premium features',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1200',
    },
  };
}
```

---

## Core Web Vitals Targets

| Metric | Target | What It Measures |
|--------|--------|-----------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | How fast the largest visible element loads |
| **INP** (Interaction to Next Paint) | < 200ms | How fast the page responds to user input |
| **CLS** (Cumulative Layout Shift) | < 0.1 | How much the page layout shifts unexpectedly |

### Optimization Strategies

**LCP**:
- Hero image: `loading="eager"` + `fetchpriority="high"`
- Inline critical CSS
- Preload hero fonts if custom
- No render-blocking JavaScript
- Use Astro `<Image>` for automatic optimization

**INP**:
- Minimize main thread work
- Lazy-load non-critical JS via `client:visible` / `client:idle`
- Use `requestAnimationFrame` for animations, not synchronous JS
- Debounce scroll/resize handlers

**CLS**:
- Set explicit `width` and `height` on all images
- Reserve space for dynamic content (skeleton loaders)
- Never inject content above existing content
- Use `transform` animations only (no layout shifts)

---

## Sitemap Configuration

```js
// In astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://closetfitapp.com',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/quiz/results') &&  // Exclude dynamic results
        !page.includes('/404'),              // Exclude error pages
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://closetfitapp.com/blog/',
        'https://closetfitapp.com/guides/',
      ],
    }),
  ],
});
```

---

## Robots.txt

```
# robots.txt — ClosetFitApp.com
User-agent: *
Allow: /
Disallow: /quiz/results
Disallow: /api/

# AI Crawlers — ALLOWED
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

# Sitemap
Sitemap: https://closetfitapp.com/sitemap-index.xml
```

---

## Semantic HTML Rules

```html
<!-- GOOD: Proper landmark structure -->
<body>
  <header>                          <!-- Site header with nav -->
    <nav aria-label="Main">...</nav>
  </header>
  <main id="main-content">         <!-- Primary content -->
    <article>                       <!-- Self-contained content (blog post) -->
      <header>
        <h1>...</h1>
        <time datetime="2026-02-06">...</time>
      </header>
      <section aria-labelledby="intro">
        <h2 id="intro">...</h2>
        <p>...</p>
      </section>
    </article>
    <aside>                         <!-- Related content, sidebar -->
      ...
    </aside>
  </main>
  <footer>                          <!-- Site footer -->
    ...
  </footer>
</body>
```

### Heading Hierarchy
- **One `<h1>` per page** — the page title
- **`<h2>`** for major sections
- **`<h3>`** for subsections within `<h2>`
- **Never skip levels** (no `<h1>` → `<h3>`)
- **Question-based headings** for blog posts (matches search intent)

---

## Internal Linking Strategy

Every blog post MUST include:
- **2-3 links to related posts** in the same category
- **1 link to a pillar guide** (the comprehensive guide for that topic)
- **1 link to a product page** (features, pricing, or download) where relevant
- **Descriptive anchor text** — never "click here" or "read more"

```html
<!-- GOOD -->
<p>Learn how to <a href="/guides/capsule-wardrobe-complete-guide">build a capsule wardrobe from scratch</a> with our step-by-step guide.</p>

<!-- BAD -->
<p>Read more about capsule wardrobes <a href="/guides/capsule-wardrobe-complete-guide">here</a>.</p>
```

---

## Image Optimization Rules

1. **Always use Astro `<Image>` component** — automatic WebP/AVIF, responsive srcset
2. **Always include `alt` text** — describe what the image shows
3. **Set explicit dimensions** — prevents CLS
4. **Hero image**: `loading="eager"` + `fetchpriority="high"`
5. **All other images**: `loading="lazy"` (default)
6. **Use responsive `widths` + `sizes`** — serve smaller images on mobile
7. **OG image**: 1200x630px for every page

---

## Mobile-First Rules

- **Design for mobile first**, then expand for larger screens
- **Min touch target**: 44x44px
- **No horizontal scroll** on any viewport
- **Test on real devices**: iPhone SE (smallest), iPhone 15, Pixel 7, iPad
- **Thumb-friendly**: Primary CTAs in bottom half of mobile viewport
- **Readable text**: Min 16px body text on mobile

---

## Quick Check

- [ ] Every page has unique `<title>` (50-60 chars) and `<meta description>` (150-160 chars)
- [ ] Canonical URL set on every page
- [ ] Open Graph + Twitter Card tags present
- [ ] At least one JSON-LD schema per page
- [ ] FAQPage schema on pages with FAQ sections
- [ ] Article schema on all blog posts
- [ ] Sitemap auto-generated and accessible
- [ ] robots.txt allows AI crawlers
- [ ] Heading hierarchy is correct (one h1, no skipped levels)
- [ ] All images have alt text and explicit dimensions
- [ ] Core Web Vitals: LCP <2.5s, INP <200ms, CLS <0.1
- [ ] Passes Google Rich Results Test
- [ ] Internal links use descriptive anchor text
- [ ] Mobile responsive on iPhone SE, iPhone 15, Pixel 7, iPad
