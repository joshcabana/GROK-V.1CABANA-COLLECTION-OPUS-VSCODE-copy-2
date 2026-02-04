import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/500.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/700.css';
import './globals.css';
import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { CartProvider } from './providers';
import CookieBanner from '../components/CookieBanner';
import { siteMetadata } from './metadata';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CABANA Collections',
  url: 'https://cabanacollections.com.au',
  logo: 'https://cabanacollections.com.au/assets/Images/CABANA-Logo-06.jpg',
  sameAs: [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com',
    process.env.NEXT_PUBLIC_TIKTOK_URL ?? 'https://tiktok.com',
    process.env.NEXT_PUBLIC_FACEBOOK_URL ?? 'https://facebook.com',
    process.env.NEXT_PUBLIC_PINTEREST_URL ?? 'https://pinterest.com',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au',
      contactType: 'customer support',
      areaServed: 'AU',
      availableLanguage: ['English'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Level 1, 100 City Walk',
    addressLocality: 'Canberra',
    addressRegion: 'ACT',
    postalCode: '2601',
    addressCountry: 'AU',
  },
  taxID: process.env.NEXT_PUBLIC_ABN ?? '00 000 000 000',
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CABANA Collections',
  url: 'https://cabanacollections.com.au',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://cabanacollections.com.au/products?query={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const metadata: Metadata = {
  title: {
    default: 'CABANA | Sustainable Australian Underwear',
    template: '%s | CABANA',
  },
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.url),
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/Images/apple-touch-icon.png',
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: 'CABANA',
    images: [siteMetadata.ogImage],
    type: 'website',
    locale: 'en_AU',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <body className="bg-stone text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <CartProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="min-h-[60vh]">
            {children}
          </main>
          <SiteFooter />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
