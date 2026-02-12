import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import DeferredGlobalUi from '@/components/DeferredGlobalUi'

export const metadata: Metadata = {
  title: 'Cabana Collections — Sustainable Modal Underwear',
  description:
    "Quiet luxury essentials in premium modal. 10% of every purchase supports men's mental health and women's empowerment.",
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
        <DeferredGlobalUi />
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
