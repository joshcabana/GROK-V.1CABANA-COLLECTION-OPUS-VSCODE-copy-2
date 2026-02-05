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
  url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1920&q=80',
  alt: 'Soft modal fabric texture in warm natural light',
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
        url: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80',
        alt: 'Black modal boxer brief front view on minimal white background',
      },
      {
        url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
        alt: 'Close-up of premium modal fabric texture showing soft weave',
      },
      {
        url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
        alt: 'Folded underwear stack in minimal packaging',
      },
      {
        url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
        alt: 'Detail of waistband elastic with subtle branding',
      },
      {
        url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=800&q=80',
        alt: 'Fabric detail showing breathable modal blend in soft light',
      },
      {
        url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
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
        url: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80',
        alt: "Women's modal underwear set in soft neutral tone",
      },
      {
        url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80',
        alt: 'Detail of seamless edge finish on modal fabric',
      },
      {
        url: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?auto=format&fit=crop&w=800&q=80',
        alt: 'Flat lay of underwear set with eucalyptus branch',
      },
      {
        url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
        alt: 'Close-up of soft modal fabric drape',
      },
      {
        url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
        alt: 'Lifestyle bedroom scene with natural light',
      },
      {
        url: 'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?auto=format&fit=crop&w=800&q=80',
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
        url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
        alt: 'Starter set bundle arranged minimally',
      },
      {
        url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
        alt: 'Premium gift box packaging',
      },
      {
        url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=800&q=80',
        alt: 'Modal fabric texture close-up',
      },
      {
        url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
        alt: 'Lifestyle flat lay with folded underwear',
      },
      {
        url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
        alt: 'Waistband detail showing premium finish',
      },
      {
        url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
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
