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
  alt: 'CABANA hero banner showcasing premium modal fabric',
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
        url: '/assets/Images/CABANA-BOXERS-FRONT.png',
        alt: 'Men’s modal boxer brief front view',
      },
      {
        url: '/assets/Images/CABANA-BOXERS-BACK.png',
        alt: 'Men’s modal boxer brief back view',
      },
      {
        url: '/assets/Images/CABANA-BOXERS-SIDE.png',
        alt: 'Men’s modal boxer brief side view',
      },
      {
        url: '/assets/Images/CABANA-BOXERS-34.png',
        alt: 'Men’s modal boxer brief laid flat',
      },
      {
        url: '/assets/Images/CABANA-MODEL-BOXERS-FRONT.webp',
        alt: 'Model wearing men’s modal boxer brief',
      },
      {
        url: '/assets/Images/CABANA-MONOGRAM-BLACK.png',
        alt: 'CABANA monogram detail',
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
        alt: 'Women’s modal set in soft neutral tone',
      },
      {
        url: '/assets/Images/CABANA-WOMEN2.PNG',
        alt: 'Women’s modal set detail view',
      },
      {
        url: '/assets/Images/CABANA-WOMEN3.PNG',
        alt: 'Women’s modal set lifestyle view',
      },
      {
        url: '/assets/Images/CABANA-WOMEN4.PNG',
        alt: 'Women’s modal set close-up',
      },
      {
        url: '/assets/Images/BeyondWoman.png',
        alt: 'Soft drape of modal fabric',
      },
      {
        url: '/assets/Images/homepage-green.png',
        alt: 'Sustainable lifestyle flat lay',
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
        url: '/assets/Images/CABANA-BOXERS-34.png',
        alt: 'Signature starter set flat lay',
      },
      {
        url: '/assets/Images/CABANA-BOXERS-FRONT.png',
        alt: 'Signature boxer brief front view',
      },
      {
        url: '/assets/Images/CABANA-WOMEN2.PNG',
        alt: 'Signature set pairing with women’s modal set',
      },
      {
        url: '/assets/Images/CABANA-MONOGRAM-BLACK.png',
        alt: 'Signature monogram detail',
      },
      {
        url: '/assets/Images/CABANA-BOXERS-SIDE.png',
        alt: 'Signature boxer brief side view',
      },
      {
        url: '/assets/Images/CABANA-WOMEN3.PNG',
        alt: 'Signature set lifestyle scene',
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
