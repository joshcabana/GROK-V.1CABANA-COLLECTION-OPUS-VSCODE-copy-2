export type Product = {
  id: string;
  slug: string;
  name: string;
  category: 'Men' | 'Women' | 'Sets';
  price: number;
  description: string;
  shortDescription: string;
  features: string[];
  sizes: string[];
  materials: string[];
  care: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  tags: string[];
};

export const products: Product[] = [
  {
    id: 'mens-boxer-brief-black',
    slug: 'mens-boxer-brief-black',
    name: "Men's Modal Boxer Brief",
    category: 'Men',
    price: 42,
    shortDescription: 'Breathable modal blend with a sculpted fit and quiet luxury finish.',
    description:
      'An elevated everyday boxer brief designed for all-day comfort. Crafted from a breathable modal blend, it delivers a smooth hand-feel, supportive stretch, and a refined waistband that stays put.',
    features: [
      'Ultra-soft modal with four-way stretch',
      'Supportive contour pouch with flat seams',
      'No-roll waistband and smooth leg finish',
      'Designed in Australia',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['93% modal', '7% elastane'],
    care: ['Cold gentle wash', 'Line dry in shade', 'Do not bleach or tumble dry'],
    images: [
      '/assets/Images/CABANA-BOXERS-34.png',
      '/assets/Images/CABANA-BOXERS-FRONT.png',
      '/assets/Images/CABANA-BOXERS-BACK.png',
    ],
    rating: 4.8,
    reviewCount: 126,
    tags: ['modal', 'breathable', 'supportive'],
  },
  {
    id: 'womens-set',
    slug: 'womens-set',
    name: "Women's Modal Set",
    category: 'Women',
    price: 68,
    shortDescription: 'Soft, seamless essentials with a barely-there feel.',
    description:
      'A refined two-piece set designed to move with you. This lightweight modal blend feels cool against the skin and offers gentle support without compromising shape.',
    features: [
      'Soft, breathable modal blend',
      'Light support with smooth seams',
      'Day-to-night versatility',
      'Designed in Australia',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    materials: ['92% modal', '8% elastane'],
    care: ['Cold gentle wash', 'Line dry in shade', 'Avoid fabric softener'],
    images: ['/assets/Images/CABANA-WOMEN.webp', '/assets/Images/CABANA-WOMEN2.PNG'],
    rating: 4.7,
    reviewCount: 98,
    tags: ['modal', 'seamless', 'lightweight'],
  },
  {
    id: 'signature-set',
    slug: 'signature-set',
    name: 'Signature Starter Set',
    category: 'Sets',
    price: 98,
    shortDescription: 'A curated bundle of best sellers with 10% savings.',
    description:
      'The starter set includes our signature men’s boxer brief and women’s set, bundled for shared comfort and elevated essentials.',
    features: [
      'Bundle savings applied automatically',
      'Includes 2 best sellers',
      'Ideal for gifting',
      'Limited seasonal runs',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    materials: ['Modal blend', 'Elastane'],
    care: ['Cold gentle wash', 'Line dry in shade'],
    images: ['/assets/Images/CABANA-BOXERS-34.png', '/assets/Images/CABANA-WOMEN.webp'],
    rating: 4.9,
    reviewCount: 64,
    tags: ['bundle', 'gift', 'value'],
  },
];
