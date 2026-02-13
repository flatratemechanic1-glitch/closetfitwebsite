# ClosetFit Website — Project Conventions

## Overview

Marketing website for ClosetFit, an AI-powered wardrobe management app. Built with Astro + Tailwind CSS.

**Tagline**: "Try It On Without Trying It On"
**Aesthetic**: "Noir Luxe" — dark glassmorphism, fashion editorial feel
**Primary differentiator**: Virtual try-on — users see themselves wearing outfits on screen

## Tech Stack

| Layer     | Technology           |
| --------- | -------------------- |
| Framework | Astro                |
| Styling   | Tailwind CSS         |
| Hosting   | Vercel / Static      |
| Fonts     | Clash Display + Inter |

## Key Facts (must match the app)

- **Pricing**: Free ($0, 50 items) / Pro ($9.99/mo) / Premium ($19.99/mo)
- **Annual billing**: Pro $7.99/mo ($95.88/yr) / Premium $15.99/mo ($191.88/yr) — ~20% savings
- **14-day free trial** on Pro for new users
- **Payments**: IAP-only (Apple StoreKit + Google Play Billing) — NOT Stripe
- **Virtual try-on**: Primary feature, must be prominently shown
- **Tagline**: "Try It On Without Trying It On"

## Brand Colors

| Name       | Hex       | CSS Variable        | Role                          |
| ---------- | --------- | ------------------- | ----------------------------- |
| Near Black | `#09090B` | `--color-bg`        | Page background               |
| Lavender   | `#A78BFA` | `--color-lavender`  | Primary actions, trust        |
| Neon Green | `#39FF14` | `--color-coral`     | AI features ONLY              |
| Champagne  | `#C9A87C` | `--color-champagne` | Warm accent, links, highlights |
| Warm White | `#F5F0EB` | `--color-text-primary` | Headings, body text        |

## Content Files

| Content            | File(s)                                                        |
| ------------------ | -------------------------------------------------------------- |
| Pricing tiers      | `src/components/home/PricingSection.astro`, `src/pages/pricing.astro` |
| Pricing toggle     | `src/components/home/PricingToggle.tsx`                        |
| Features           | `src/components/home/FeaturesSection.astro`, `src/pages/features.astro` |
| Testimonials       | `src/lib/data/testimonials.ts`                                 |
| Team               | `src/pages/about.astro`                                        |
| Hero / tagline     | `src/pages/index.astro`                                        |
| FAQ                | `src/components/home/FAQSection.astro`                         |
| CSS colors         | `src/styles/global.css`                                        |

## Website ↔ App Sync Rules

**This website and the ClosetFit app MUST stay in sync.** Any change to the items below in either repo requires an update in the other. Failing to sync will create user-facing contradictions.

**App repo**: `C:\Users\banan\ClosetFit`

### What must stay in sync

| Category | Website source of truth | App source of truth |
|----------|----------------------|-------------------|
| Pricing (tiers, amounts, features per tier) | `src/components/home/PricingSection.astro` + `src/pages/pricing.astro` | `docs/MASTER_PLAN.md` § Monetization |
| Feature list & descriptions | `src/components/home/FeaturesSection.astro` + `src/pages/features.astro` | `docs/MASTER_PLAN.md` § Feature Roadmap |
| Tagline & positioning | `src/pages/index.astro` (hero) | `docs/MASTER_PLAN.md` § Vision |
| Color palette | `src/styles/global.css` (CSS variables) | `src/constants/Colors.ts` (app) |
| Payment method | `src/pages/pricing.astro` (FAQ + badges) | `functions/src/iapReceiptValidator.ts` (app) |
| Annual pricing & trial | `src/components/home/PricingToggle.tsx` | `docs/MASTER_PLAN.md` § Annual Billing |

### Sync checklist (run before any release)

1. Pricing amounts match: Free ($0) / Pro ($9.99 monthly, $7.99 annual) / Premium ($19.99 monthly, $15.99 annual)
2. Feature lists per tier match between this website and app's MASTER_PLAN.md
3. Virtual try-on is prominently featured as the primary differentiator
4. 14-day free trial on Pro is mentioned consistently
5. Payment method references are consistent (should be IAP-only)
6. Color values match between website `global.css` and app's `Colors.ts`
7. Tagline "Try It On Without Trying It On" is consistent

### Known issues (fix before public launch)

- Payment badges show Stripe/PayPal — should reflect IAP-only (Apple Pay + Google Pay)
- FAQ says "processed securely through Stripe" — needs updating to IAP
- 4 fictional team members need replacing with real people or removing
- 6 fictional testimonials need replacing with real quotes or removing
- "1,200+ people on the waitlist" claim needs to be verified or removed
- Pro tier on pricing page is missing "Virtual try-on" and "AI chat assistant" in feature list
