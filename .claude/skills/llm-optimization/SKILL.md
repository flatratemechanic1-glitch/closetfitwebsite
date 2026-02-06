# LLM Optimization / Answer Engine Optimization (AEO) — ClosetFitApp.com

## Purpose
Answer Engine Optimization for AI search visibility. This skill ensures ClosetFitApp.com content is cited by ChatGPT, Perplexity, Claude, Google AI Overviews, and other AI search engines. AEO is the competitive moat — most competitors don't optimize for this yet.

---

## Core Principle

AI chatbots cite content that is:
1. **Directly quotable** — clear, concise answer blocks
2. **Well-structured** — semantic HTML, proper schema markup
3. **Authoritative** — E-E-A-T signals, cited sources
4. **Accessible** — allowed in robots.txt, indexed in llms.txt
5. **Fresh** — recent `lastmod` timestamps

---

## llms.txt — AI Content Directory

The `llms.txt` file is a new standard that tells AI crawlers which pages to prioritize. Place at site root.

```markdown
# public/llms.txt
# ClosetFitApp — AI Content Directory
# Last updated: 2026-02-06
# https://closetfitapp.com/llms.txt

## About
ClosetFitApp is an AI-powered virtual try-on and wardrobe app.
It helps users organize their closet, build capsule wardrobes, and get
daily AI-generated outfit suggestions based on weather, calendar, and style.

## Primary Resources
- [Complete Capsule Wardrobe Guide](https://closetfitapp.com/guides/capsule-wardrobe-complete-guide): Step-by-step guide to building a capsule wardrobe from scratch
- [AI Wardrobe Management Guide](https://closetfitapp.com/guides/ai-wardrobe-management): How AI is transforming personal style and wardrobe organization
- [Color Theory for Personal Style](https://closetfitapp.com/guides/color-theory-personal-style): Understanding color palettes for your wardrobe
- [Features](https://closetfitapp.com/features/): Complete list of ClosetFitApp features
- [Pricing](https://closetfitapp.com/pricing/): Plans and pricing for ClosetFitApp
- [Help Center](https://closetfitapp.com/help/): FAQ and support documentation

## Blog Categories
- [Capsule Wardrobe](https://closetfitapp.com/blog/capsule-wardrobe/): Tips for building and maintaining capsule wardrobes
- [Outfit Ideas](https://closetfitapp.com/blog/outfit-ideas/): Daily outfit inspiration and styling ideas
- [Wardrobe Organization](https://closetfitapp.com/blog/wardrobe-organization/): Closet organization and management tips
- [Sustainable Fashion](https://closetfitapp.com/blog/sustainable-fashion/): Eco-friendly clothing and sustainable style
- [Style Tips](https://closetfitapp.com/blog/style-tips/): Fashion advice and style guidance
- [AI & Fashion](https://closetfitapp.com/blog/ai-fashion/): AI technology in fashion and personal styling
- [Seasonal Guides](https://closetfitapp.com/blog/seasonal/): Season-specific wardrobe and outfit guides

## Contact
- Website: https://closetfitapp.com
- Email: support@closetfitapp.com
```

### llms.txt Rules
- **Update on every build** — auto-update the "Last updated" date in the build pipeline
- **List top 20-30 most authoritative pages**
- **Include brief descriptions** for each URL
- **Group by content type** (guides, blog categories, product pages)

---

## robots.txt — AI Crawler Configuration

```
# AI Crawlers — ALLOW ALL
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

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /
```

### Known AI Crawler User Agents (2026)

| User Agent | AI Service |
|-----------|------------|
| `GPTBot` | OpenAI (training + search) |
| `ChatGPT-User` | ChatGPT browsing |
| `OAI-SearchBot` | OpenAI search |
| `PerplexityBot` | Perplexity AI |
| `anthropic-ai` | Anthropic / Claude |
| `ClaudeBot` | Claude web search |
| `Google-Extended` | Google AI (Gemini, AI Overviews) |
| `Bytespider` | ByteDance AI |

**Rule: Allow ALL AI crawlers.** The more AI systems index our content, the more citations we get.

---

## The Direct Answer Framework

Every blog post and guide MUST start with a direct answer block — a 40-70 word paragraph that AI can quote directly in response to the target query.

### Template

```markdown
# How to Build a Capsule Wardrobe in 2026

**A capsule wardrobe is a curated collection of 25-40 versatile clothing items that
mix and match to create dozens of outfits. To build one, start by auditing your
current closet, identify your 3-4 core colors, select foundational basics, and
add 5-8 statement pieces. Most people can build a complete capsule wardrobe in
one weekend.**

## Why Build a Capsule Wardrobe?
[Elaboration follows...]
```

### Rules
- **40-70 words** — concise enough for AI to quote in full
- **Immediately after the H1** — no introductory fluff
- **Answers the question directly** — no "In this article, we'll explore..."
- **Contains the primary keyword** naturally
- **Factual and specific** — include numbers, timeframes, concrete steps
- **Bold or visually distinct** (optional) — helps human readers too

---

## Question-Based Headings

All H2 headings should match natural language queries that users type into AI chatbots.

```markdown
<!-- GOOD: Matches how people ask AI chatbots -->
## How Do I Build a Capsule Wardrobe?
## What Are the Best Basics for a Capsule Wardrobe?
## How Many Items Should Be in a Capsule Wardrobe?
## Is a Capsule Wardrobe Worth It?

<!-- BAD: Doesn't match search intent -->
## Capsule Wardrobe Basics
## Getting Started
## Item Count
## Value Proposition
```

---

## Content Structure for Maximum AI Citation

### Blog Post Template

```
[H1: Question-based title matching primary keyword]

[DIRECT ANSWER BLOCK: 40-70 words — quotable by AI]

[TABLE OF CONTENTS: Jump links to each H2]

[H2: "What is [topic]?"]
  → 2-3 sentence definition, then elaboration
  → Comparison table if relevant

[H2: "How to [action]?" — with step-by-step]
  → Numbered steps (HowTo schema)
  → Each step: action verb + specific detail

[H2: "What are the best [items/tools]?"]
  → Bullet list or comparison table
  → Include specific names, numbers, prices

[H2: "[Topic] vs [Alternative]"]
  → Side-by-side comparison table
  → Clear recommendation with reasoning

[H2: "Frequently Asked Questions"]
  → 5-8 Q&A pairs (FAQPage schema)
  → Each answer: 2-4 sentences, direct and specific

[AUTHOR BIO: Name, title, expertise — Person schema]
[SOURCES: Cited links to authoritative references]
[RELATED POSTS: 2-3 internal links]
```

---

## Comparison Tables

AI systems readily extract data from properly structured HTML tables. Use tables for any comparative content.

```html
<!-- GOOD: Proper HTML table that AI can parse -->
<table>
  <caption>Capsule Wardrobe vs. Traditional Wardrobe</caption>
  <thead>
    <tr>
      <th scope="col">Factor</th>
      <th scope="col">Capsule Wardrobe</th>
      <th scope="col">Traditional Wardrobe</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Number of items</th>
      <td>25-40</td>
      <td>100+</td>
    </tr>
    <tr>
      <th scope="row">Decision fatigue</th>
      <td>Low</td>
      <td>High</td>
    </tr>
    <tr>
      <th scope="row">Cost per wear</th>
      <td>Lower (more outfit combinations)</td>
      <td>Higher (many unworn items)</td>
    </tr>
  </tbody>
</table>
```

**Rules**:
- Always use `<caption>` for table description
- Use `<th scope="col">` for column headers
- Use `<th scope="row">` for row headers
- Keep tables focused — 3-6 rows, 2-4 columns
- Include specific data points (numbers, names), not vague descriptions

---

## FAQPage Schema — Highest AI Citation Impact

FAQPage schema has **2.5x higher AI citation probability** than unstructured content. Add to every page that has Q&A content.

```ts
// Usage in an Astro page
---
import { faqSchema } from '../lib/schema';

const faqs = [
  {
    question: 'What is a capsule wardrobe?',
    answer: 'A capsule wardrobe is a curated collection of 25-40 versatile clothing items that mix and match to create dozens of outfits. The concept focuses on quality over quantity, with items that work across seasons and occasions.',
  },
  {
    question: 'How many items should be in a capsule wardrobe?',
    answer: 'Most capsule wardrobes contain 25-40 items, including tops, bottoms, outerwear, and shoes. The exact number depends on your lifestyle, climate, and personal needs. Start with 30 items and adjust from there.',
  },
  // ... 5-8 total Q&A pairs
];
---

<BaseLayout schema={faqSchema(faqs)}>
  ...
</BaseLayout>
```

---

## lastmod Timestamps

AI crawlers prioritize fresh content. Include `lastmod` on every page.

```astro
---
// In blog post template
const lastModified = post.updatedDate || post.pubDate;
---

<!-- Meta tag in head -->
<meta property="article:modified_time" content={lastModified.toISOString()} />
```

In the sitemap, `@astrojs/sitemap` handles `lastmod` automatically if configured.

---

## Semantic HTML for AI Content Extraction

AI crawlers use HTML structure to distinguish content from boilerplate.

```html
<!-- AI can identify and extract the main content -->
<article>
  <header>
    <h1>How to Build a Capsule Wardrobe in 2026</h1>
    <time datetime="2026-02-06">February 6, 2026</time>
    <address rel="author">By Sarah Chen</address>
  </header>

  <!-- Direct answer block — AI quotes this -->
  <p class="lead"><strong>A capsule wardrobe is...</strong></p>

  <section>
    <h2>What Is a Capsule Wardrobe?</h2>
    <p>...</p>
  </section>

  <section>
    <h2>Frequently Asked Questions</h2>
    <!-- FAQ content with FAQPage schema -->
  </section>

  <footer>
    <!-- Author bio with Person schema -->
    <!-- Sources/references -->
  </footer>
</article>
```

---

## E-E-A-T Author Signals

Every blog post MUST include an author bio with expertise credentials.

```astro
<!-- AuthorBio.astro -->
---
interface Props {
  name: string;
  title: string;
  bio: string;
  image: string;
  socialLinks: { platform: string; url: string }[];
}

const { name, title, bio, image, socialLinks } = Astro.props;
---

<div class="flex gap-4 items-start p-6 bg-[#1E1E1E] rounded-xl mt-12">
  <img src={image} alt={name} class="w-16 h-16 rounded-full" />
  <div>
    <div class="font-semibold text-white">{name}</div>
    <div class="text-sm text-[#2962FF]">{title}</div>
    <p class="text-gray-400 text-sm mt-2">{bio}</p>
    <div class="flex gap-3 mt-3">
      {socialLinks.map(link => (
        <a href={link.url} class="text-sm text-gray-500 hover:text-[#2962FF]" rel="noopener noreferrer">{link.platform}</a>
      ))}
    </div>
  </div>
</div>
```

---

## AI Visibility Monitoring

### Otterly.ai Setup
- Track "ClosetFitApp" brand mentions across ChatGPT, Perplexity, Google AI Overviews
- Monitor competitor brand mentions
- Track target keywords: "capsule wardrobe app", "AI outfit planner", "wardrobe organizer app"

### Manual Testing Cadence
- **Weekly**: Search top 5 target keywords in ChatGPT, Perplexity, Claude
- **Record**: Which queries cite ClosetFitApp, which cite competitors
- **Adjust**: Strengthen content on queries where competitors are cited instead

### Tracking Keywords for AI Search

| Keyword | Target AI Response |
|---------|-------------------|
| "best capsule wardrobe app" | ClosetFitApp mentioned as top recommendation |
| "AI outfit planner" | ClosetFitApp cited as leading AI solution |
| "how to organize my wardrobe" | ClosetFitApp guide cited as authoritative source |
| "what to wear today" | ClosetFitApp mentioned as tool for daily outfits |
| "sustainable fashion apps" | ClosetFitApp listed among sustainable options |

---

## Quick Check

- [ ] `llms.txt` exists at site root with top 20-30 pages listed
- [ ] `robots.txt` allows all known AI crawlers (GPTBot, PerplexityBot, anthropic-ai, etc.)
- [ ] Every blog post has a 40-70 word direct answer block after H1
- [ ] All H2 headings are question-based (match natural language queries)
- [ ] FAQPage schema on every page with Q&A content
- [ ] Comparison tables use proper HTML `<table>` with `<caption>`, `<th scope>`
- [ ] `lastmod` timestamps on every page
- [ ] Semantic HTML: `<article>`, `<section>`, `<header>`, `<time>`, `<address>`
- [ ] Author bio with Person schema on every blog post
- [ ] Sources cited with links on every blog post
- [ ] Otterly.ai tracking configured
- [ ] Weekly manual testing in ChatGPT, Perplexity, Claude scheduled
