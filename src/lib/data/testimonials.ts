export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: 'champagne' | 'lavender' | 'coral';
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'I used to spend 20 minutes every morning picking an outfit. Now ClosetFit picks one in seconds and I actually look better.',
    name: 'Aaliyah Chen',
    role: 'Marketing Manager',
    initials: 'AC',
    accent: 'champagne',
  },
  {
    quote:
      'The weather-based styling is a game changer. I got caught in the rain for the last time before downloading this app.',
    name: 'Jordan Rivera',
    role: 'UX Designer',
    initials: 'JR',
    accent: 'lavender',
  },
  {
    quote:
      'I discovered I owned 14 black tops and had zero idea. The wardrobe analytics alone are worth the price of Pro.',
    name: 'Priya Patel',
    role: 'Software Engineer',
    initials: 'PP',
    accent: 'champagne',
  },
  {
    quote:
      'Packed for a two-week trip using the capsule builder — 12 items, 28 unique outfits. My suitcase has never been this light.',
    name: 'Marcus Thompson',
    role: 'Travel Blogger',
    initials: 'MT',
    accent: 'coral',
  },
  {
    quote:
      'As someone who is colorblind, the outfit suggestions have been genuinely life-changing. I finally feel confident in what I wear.',
    name: "Liam O'Brien",
    role: 'Product Manager',
    initials: 'LO',
    accent: 'lavender',
  },
  {
    quote:
      'I have a capsule wardrobe of 40 pieces and ClosetFit shows me combinations I never would have thought of. Absolutely brilliant.',
    name: 'Sofia Andersson',
    role: 'Graphic Designer',
    initials: 'SA',
    accent: 'champagne',
  },
];
