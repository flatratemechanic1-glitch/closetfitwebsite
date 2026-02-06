import { describe, it, expect } from 'vitest';
import {
  organizationSchema,
  faqSchema,
  howToSchema,
  breadcrumbSchema,
  productSchema,
  articleSchema,
} from '../schema';

describe('organizationSchema', () => {
  it('returns valid Organization schema', () => {
    const result = organizationSchema();
    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('Organization');
    expect(result.name).toBe('ClosetFitApp');
    expect(result.url).toBe('https://closetfitapp.com');
    expect(result.sameAs).toBeInstanceOf(Array);
    expect(result.contactPoint.contactType).toBe('customer support');
  });
});

describe('faqSchema', () => {
  it('returns FAQPage schema with questions', () => {
    const faqs = [
      { question: 'What is ClosetFit?', answer: 'An AI wardrobe app.' },
      { question: 'Is it free?', answer: 'Yes, with premium plans.' },
    ];
    const result = faqSchema(faqs);
    expect(result['@type']).toBe('FAQPage');
    expect(result.mainEntity).toHaveLength(2);
    expect(result.mainEntity[0]['@type']).toBe('Question');
    expect(result.mainEntity[0].name).toBe('What is ClosetFit?');
    expect(result.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
    expect(result.mainEntity[0].acceptedAnswer.text).toBe('An AI wardrobe app.');
  });

  it('handles empty array', () => {
    const result = faqSchema([]);
    expect(result.mainEntity).toHaveLength(0);
  });
});

describe('howToSchema', () => {
  it('returns HowTo schema with 1-indexed positions', () => {
    const result = howToSchema({
      name: 'How to use ClosetFit',
      description: 'Get started in 3 steps',
      totalTime: 'PT5M',
      steps: [
        { name: 'Step 1', text: 'Take a photo' },
        { name: 'Step 2', text: 'Get suggestions', image: 'https://example.com/img.png' },
      ],
    });
    expect(result['@type']).toBe('HowTo');
    expect(result.step[0].position).toBe(1);
    expect(result.step[1].position).toBe(2);
    expect(result.step[0]).not.toHaveProperty('image');
    expect(result.step[1].image).toBe('https://example.com/img.png');
  });
});

describe('breadcrumbSchema', () => {
  it('returns BreadcrumbList with 1-indexed positions', () => {
    const result = breadcrumbSchema([
      { name: 'Home', url: 'https://closetfitapp.com' },
      { name: 'Features', url: 'https://closetfitapp.com/features' },
    ]);
    expect(result['@type']).toBe('BreadcrumbList');
    expect(result.itemListElement[0].position).toBe(1);
    expect(result.itemListElement[1].position).toBe(2);
    expect(result.itemListElement[1].name).toBe('Features');
  });
});

describe('productSchema', () => {
  it('returns SoftwareApplication schema', () => {
    const result = productSchema();
    expect(result['@type']).toBe('SoftwareApplication');
    expect(result.applicationCategory).toBe('LifestyleApplication');
    expect(result.operatingSystem).toBe('iOS, Android');
    expect(result.offers.price).toBe('0');
  });
});

describe('articleSchema', () => {
  it('returns Article schema with all fields', () => {
    const result = articleSchema({
      title: 'Test Article',
      description: 'A test article',
      url: 'https://closetfitapp.com/blog/test',
      image: 'https://closetfitapp.com/img.png',
      datePublished: '2026-01-01',
      dateModified: '2026-01-02',
      author: { name: 'Jane', url: 'https://example.com/jane' },
      category: 'Fashion',
    });
    expect(result['@type']).toBe('Article');
    expect(result.headline).toBe('Test Article');
    expect(result.author.name).toBe('Jane');
    expect(result.publisher.name).toBe('ClosetFitApp');
    expect(result.articleSection).toBe('Fashion');
    expect(result.mainEntityOfPage['@id']).toBe('https://closetfitapp.com/blog/test');
  });
});
