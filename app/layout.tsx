import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: 'CABANA — Sustainable Modal Underwear',
  description: 'Quiet luxury underwear crafted from soft, sustainable modal.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="font-sans antialiased">
        <Header />
        <CartDrawer />
        {children}
        <Footer />
      </body>
    </html>
  )
}
