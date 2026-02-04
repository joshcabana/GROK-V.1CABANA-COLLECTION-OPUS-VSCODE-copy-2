import './globals.css';
import type { Metadata } from 'next';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { CartProvider } from './providers';

export const metadata: Metadata = {
  title: {
    default: 'CABANA | Sustainable Australian Underwear',
    template: '%s | CABANA',
  },
  description:
    'CABANA is a sustainable Australian underwear brand creating elevated essentials with transparent impact and modern craftsmanship.',
  metadataBase: new URL('https://cabanacollections.com.au'),
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/Images/apple-touch-icon.png',
  },
  openGraph: {
    title: 'CABANA | Sustainable Australian Underwear',
    description:
      'CABANA is a sustainable Australian underwear brand creating elevated essentials with transparent impact and modern craftsmanship.',
    url: 'https://cabanacollections.com.au',
    siteName: 'CABANA',
    images: ['/assets/Images/social-share-1200x630.jpg'],
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
        <CartProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="min-h-[60vh]">
            {children}
          </main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
