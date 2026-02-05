export interface ProductImage {
  url: string
  alt: string
}

export interface ProductVariant {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL'
  colour: string
  inStock: boolean
}

export interface Product {
  id: string
  slug: string
  title: string
  price: number
  compareAtPrice?: number
  description: string
  features: string[]
  images: ProductImage[]
  variants: ProductVariant[]
  category: 'mens' | 'womens' | 'bundle'
  rating: number
  reviewCount: number
}

export const heroImage = {
  url: '/assets/Images/HERO-BANNER.webp',
  alt: 'CABANA modal underwear in a soft natural palette',
}

export const products: Product[] = [
  {
    id: 'mens-boxer-brief-black',
    slug: 'mens-boxer-brief-black',
    title: "Men's Modal Boxer Brief",
    price: 4200,
    description: 'Breathable modal blend with a sculpted fit and quiet luxury finish.',
    features: [
      'Ultra-soft modal with four-way stretch',
      'Supportive contour pouch with flat seams',
      'No-roll waistband and smooth leg finish',
      'Designed in Australia',
    ],
    images: [
      {
        url: '/assets/Images/optimised/boxers-34.jpg',
        alt: 'Black modal boxer brief front view on minimal white background',
      },
      {
        url: '/assets/Images/optimised/boxers-front.jpg',
        alt: 'Close-up of premium modal fabric texture showing soft weave',
      },
      {
        url: '/assets/Images/optimised/boxers-back.jpg',
        alt: 'Folded underwear stack in minimal packaging',
      },
      {
        url: '/assets/Images/optimised/boxers-side.jpg',
        alt: 'Detail of waistband elastic with subtle branding',
      },
      {
        url: '/assets/Images/optimised/boxers-flat.jpg',
        alt: 'Fabric detail showing breathable modal blend in soft light',
      },
      {
        url: '/assets/Images/optimised/boxers-model-front.jpg',
        alt: 'Minimalist product packaging on marble surface',
      },
    ],
    variants: [
      { size: 'S', colour: 'Black', inStock: true },
      { size: 'M', colour: 'Black', inStock: true },
      { size: 'L', colour: 'Black', inStock: true },
      { size: 'XL', colour: 'Black', inStock: false },
    ],
    category: 'mens',
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 'womens-modal-set',
    slug: 'womens-modal-set',
    title: "Women's Modal Set",
    price: 6800,
    description: 'Soft, seamless essentials with a barely-there feel.',
    features: [
      'Buttery-soft modal fabric',
      'Seamless construction for invisible wear',
      'Supportive without compression',
      'Matching bralette and brief',
    ],
    images: [
      {
        url: '/assets/Images/CABANA-WOMEN.webp',
        alt: "Women's modal underwear set in soft neutral tone",
      },
      {
        url: '/assets/Images/optimised/women-2.jpg',
        alt: 'Detail of seamless edge finish on modal fabric',
      },
      {
        url: '/assets/Images/optimised/women-3.jpg',
        alt: 'Flat lay of underwear set with eucalyptus branch',
      },
      {
        url: '/assets/Images/optimised/women-4.jpg',
        alt: 'Close-up of soft modal fabric drape',
      },
      {
        url: '/assets/Images/optimised/women-1.jpg',
        alt: 'Lifestyle bedroom scene with natural light',
      },
      {
        url: '/assets/Images/optimised/women-beyond.jpg',
        alt: 'Sustainable packaging unboxing experience',
      },
    ],
    variants: [
      { size: 'XS', colour: 'Sand', inStock: true },
      { size: 'S', colour: 'Sand', inStock: true },
      { size: 'M', colour: 'Sand', inStock: true },
      { size: 'L', colour: 'Sand', inStock: true },
    ],
    category: 'womens',
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: 'signature-starter-set',
    slug: 'signature-starter-set',
    title: 'Signature Starter Set',
    price: 9800,
    compareAtPrice: 11000,
    description: 'A curated bundle of best sellers with 10% savings.',
    features: [
      'Three pairs of signature boxer briefs',
      'One of each: Black, Navy, Charcoal',
      'Premium gift box packaging',
      '10% bundle discount',
    ],
    images: [
      {
        url: '/assets/Images/optimised/boxers-34.jpg',
        alt: 'Starter set bundle arranged minimally',
      },
      {
        url: '/assets/Images/CABANA-WOMEN.webp',
        alt: 'Premium gift box packaging',
      },
      {
        url: '/assets/Images/optimised/boxers-front.jpg',
        alt: 'Modal fabric texture close-up',
      },
      {
        url: '/assets/Images/optimised/women-2.jpg',
        alt: 'Lifestyle flat lay with folded underwear',
      },
      {
        url: '/assets/Images/optimised/boxers-back.jpg',
        alt: 'Waistband detail showing premium finish',
      },
      {
        url: '/assets/Images/optimised/women-3.jpg',
        alt: 'Unboxing experience with tissue paper',
      },
    ],
    variants: [
      { size: 'S', colour: 'Mixed', inStock: true },
      { size: 'M', colour: 'Mixed', inStock: true },
      { size: 'L', colour: 'Mixed', inStock: true },
      { size: 'XL', colour: 'Mixed', inStock: true },
    ],
    category: 'bundle',
    rating: 4.7,
    reviewCount: 56,
  },
]
