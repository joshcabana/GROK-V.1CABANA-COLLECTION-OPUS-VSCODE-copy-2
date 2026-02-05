import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CABANA · Sustainable Underwear',
  description: 'Quietly refined essentials crafted with sustainable modal blends.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#f5f5f7] text-[#1d1d1f]`}>
        <Header />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
