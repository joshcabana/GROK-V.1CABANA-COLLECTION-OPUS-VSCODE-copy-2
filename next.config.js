/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/impact.html', destination: '/impact', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy', permanent: true },
      { source: '/terms-of-service.html', destination: '/terms', permanent: true },
      { source: '/shipping-policy.html', destination: '/shipping', permanent: true },
      { source: '/return-policy.html', destination: '/returns', permanent: true },
      { source: '/size-guide.html', destination: '/size-guide', permanent: true },
      { source: '/care-instructions.html', destination: '/care', permanent: true },
      { source: '/legal/index.html', destination: '/legal', permanent: true },
      { source: '/cart.html', destination: '/cart', permanent: true },
      {
        source: '/products/mens-underwear.html',
        destination: '/products/mens-boxer-brief-black',
        permanent: true,
      },
      {
        source: '/products/mens-boxer-brief-black.html',
        destination: '/products/mens-boxer-brief-black',
        permanent: true,
      },
      {
        source: '/products/womens-set.html',
        destination: '/products/womens-modal-set',
        permanent: true,
      },
      { source: '/faq.html', destination: '/contact', permanent: true },
    ]
  },
}

module.exports = nextConfig
