import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: 'Cabana Collections — Sustainable Modal Underwear',
  description: 'Quiet luxury underwear crafted from soft, sustainable modal.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <CartDrawer />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
