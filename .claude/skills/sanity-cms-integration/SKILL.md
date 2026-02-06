# Sanity CMS Integration — ClosetFitApp.com

## Purpose
Sanity CMS setup, schema definitions, content pipeline, and auto-posting integration for ClosetFitApp.com. Covers the full flow from content creation to published page.

---

## Sanity Project Setup

### Installation

```bash
# In project root
npm install @sanity/astro @sanity/client @sanity/image-url sanity
```

### Sanity Studio Configuration

```ts
// sanity/sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'closetfitapp',
  title: 'ClosetFitApp Blog',
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
```

### Astro Integration

```js
// astro.config.mjs
import sanity from '@sanity/astro';

export default defineConfig({
  integrations: [
    sanity({
      projectId: import.meta.env.SANITY_PROJECT_ID,
      dataset: 'production',
      useCdn: true,
      apiVersion: '2026-01-01',
      // Enable Sanity Studio at /studio route (optional, for local dev)
      studioBasePath: '/studio',
    }),
  ],
});
```

---

## Content Schemas

### Blog Post Schema

```ts
// sanity/schemas/post.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (Meta Description)',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(120).max(160),
      description: 'Used for meta description and social previews. 120-160 characters.',
    }),
    defineField({
      name: 'directAnswer',
      title: 'Direct Answer Block (AEO)',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(150).max(350),
      description: 'The 40-70 word quotable answer block for AI search engines. Must directly answer the title question.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'isInternal', type: 'boolean', title: 'Internal Link?', initialValue: false },
                ],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
        {
          type: 'object',
          name: 'comparisonTable',
          title: 'Comparison Table',
          fields: [
            { name: 'caption', type: 'string', title: 'Table Caption' },
            {
              name: 'headers',
              type: 'array',
              of: [{ type: 'string' }],
              title: 'Column Headers',
            },
            {
              name: 'rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'cells', type: 'array', of: [{ type: 'string' }] },
                  ],
                },
              ],
              title: 'Table Rows',
            },
          ],
        },
        {
          type: 'object',
          name: 'faqSection',
          title: 'FAQ Section',
          fields: [
            {
              name: 'faqs',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'question', type: 'string', title: 'Question' },
                    { name: 'answer', type: 'text', title: 'Answer' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Target keywords for this post. Used for quality gate checks.',
    }),
    defineField({
      name: 'source',
      title: 'Content Source',
      type: 'string',
      options: {
        list: [
          { title: 'Human', value: 'human' },
          { title: 'AI (Auto-posted)', value: 'ai' },
          { title: 'AI + Human Review', value: 'ai-reviewed' },
        ],
      },
      initialValue: 'human',
    }),
  ],
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'heroImage',
      source: 'source',
    },
    prepare({ title, author, media, source }) {
      return {
        title,
        subtitle: `${author || 'Unknown'} · ${source === 'ai' ? '🤖 AI' : '✍️ Human'}`,
        media,
      };
    },
  },
});
```

### Author Schema

```ts
// sanity/schemas/author.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
});
```

### Category Schema

```ts
// sanity/schemas/category.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'targetKeywords',
      title: 'Target Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
```

### Schema Index

```ts
// sanity/schemas/index.ts
import post from './post';
import author from './author';
import category from './category';

export const schemaTypes = [post, author, category];
```

---

## GROQ Queries

### Sanity Client Setup

```ts
// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-01-01',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
```

### Fetch All Posts

```ts
export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      updatedAt,
      heroImage {
        asset->,
        alt
      },
      "category": category->{
        title,
        "slug": slug.current
      },
      "author": author->{
        name,
        image,
        jobTitle
      },
      tags,
      source
    }
  `);
}
```

### Fetch Single Post by Slug

```ts
export async function getPostBySlug(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      directAnswer,
      publishedAt,
      updatedAt,
      heroImage {
        asset->,
        alt
      },
      body[] {
        ...,
        _type == "image" => {
          asset->,
          alt
        }
      },
      "category": category->{
        title,
        "slug": slug.current
      },
      "author": author->{
        name,
        "slug": slug.current,
        image,
        jobTitle,
        bio,
        socialLinks
      },
      tags,
      seoKeywords,
      "relatedPosts": relatedPosts[]->{
        title,
        "slug": slug.current,
        excerpt,
        heroImage { asset->, alt },
        publishedAt
      }
    }
  `, { slug });
}
```

### Fetch Posts by Category

```ts
export async function getPostsByCategory(categorySlug: string) {
  return client.fetch(`
    *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      heroImage { asset->, alt },
      "author": author->{ name, image },
      tags
    }
  `, { categorySlug });
}
```

### Fetch All Categories

```ts
export async function getAllCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "postCount": count(*[_type == "post" && category._ref == ^._id])
    }
  `);
}
```

---

## Webhook → Vercel Deploy Hook

When content is published in Sanity, trigger a Vercel rebuild so the static site includes the new content.

### Setup

1. In Vercel dashboard: **Settings → Git → Deploy Hooks** → Create hook for `main` branch
2. Copy the deploy hook URL (e.g., `https://api.vercel.com/v1/integrations/deploy/prj_xxxx/yyyy`)
3. In Sanity dashboard: **API → Webhooks** → Create webhook:
   - **URL**: The Vercel deploy hook URL
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type == "post"`
   - **Projection**: `{ _id, _type, title }`

### Webhook Flow

```
Content published in Sanity Studio
  → Sanity webhook fires
  → Vercel deploy hook receives POST
  → Vercel pulls latest code + rebuilds Astro site
  → New post is live on closetfitapp.com
```

**Typical rebuild time**: 30-90 seconds for a static Astro site.

---

## Auto-Posting Pipeline (n8n → Sanity)

The n8n automation creates posts programmatically via the Sanity API.

### Sanity API Write Client

```ts
// Used by n8n or build scripts — NOT the frontend client
import { createClient } from '@sanity/client';

const writeClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false, // Write operations need the live API
  apiVersion: '2026-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // Read+write token
});
```

### Create a Post via API

```ts
async function createPost(post: {
  title: string;
  slug: string;
  category: string; // category document ID
  authorId: string;
  excerpt: string;
  directAnswer: string;
  body: any[]; // Portable Text blocks
  tags: string[];
  seoKeywords: string[];
}) {
  return writeClient.create({
    _type: 'post',
    title: post.title,
    slug: { _type: 'slug', current: post.slug },
    category: { _type: 'reference', _ref: post.category },
    author: { _type: 'reference', _ref: post.authorId },
    publishedAt: new Date().toISOString(),
    excerpt: post.excerpt,
    directAnswer: post.directAnswer,
    body: post.body,
    tags: post.tags,
    seoKeywords: post.seoKeywords,
    source: 'ai',
  });
}
```

---

## Image Handling

### Sanity CDN → Astro Optimization

```astro
---
import { urlFor } from '../lib/sanity';

const imageUrl = urlFor(post.heroImage)
  .width(1200)
  .height(630)
  .format('webp')
  .quality(80)
  .url();
---

<img
  src={imageUrl}
  alt={post.heroImage.alt}
  width="1200"
  height="630"
  loading="lazy"
  class="rounded-xl w-full"
/>
```

### Responsive Image with srcset

```astro
---
const sizes = [400, 800, 1200];
const srcset = sizes
  .map(w => `${urlFor(post.heroImage).width(w).format('webp').url()} ${w}w`)
  .join(', ');
---

<img
  src={urlFor(post.heroImage).width(800).format('webp').url()}
  srcset={srcset}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  alt={post.heroImage.alt}
  width="1200"
  height="630"
  loading="lazy"
  class="rounded-xl w-full"
/>
```

---

## Preview Mode (Draft Content)

For reviewing unpublished content during development:

```ts
// src/lib/sanity.ts
export const previewClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false, // Drafts not available on CDN
  apiVersion: '2026-01-01',
  token: import.meta.env.SANITY_PREVIEW_TOKEN,
  perspective: 'previewDrafts',
});
```

---

## Quick Check

- [ ] Sanity project created with correct schemas (post, author, category)
- [ ] `@sanity/astro` plugin configured in astro.config.mjs
- [ ] GROQ queries return correct data for all page types
- [ ] Webhook fires on content publish → Vercel rebuilds
- [ ] Blog post includes `directAnswer` field for AEO
- [ ] Images served from Sanity CDN with WebP format
- [ ] Auto-posting pipeline can create posts via Sanity API
- [ ] Posts have `source` field marking human vs AI content
- [ ] Preview mode works for draft content
- [ ] `SANITY_WRITE_TOKEN` and `SANITY_PREVIEW_TOKEN` not exposed to client
