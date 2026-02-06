import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'CABANA · Sustainable Underwear',
  description: 'Quietly refined essentials crafted with sustainable modal blends.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className={`${inter.variable} ${playfair.variable} bg-stone text-ink font-body antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <CartDrawer />
        <main id="main-content" className="min-h-[60vh]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
