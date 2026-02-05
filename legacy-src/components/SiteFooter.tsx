import Link from 'next/link';

const year = new Date().getFullYear();

const socialLinks = [
  {
    label: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com',
  },
  {
    label: 'TikTok',
    href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? 'https://tiktok.com',
  },
  {
    label: 'Facebook',
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? 'https://facebook.com',
  },
  {
    label: 'Pinterest',
    href: process.env.NEXT_PUBLIC_PINTEREST_URL ?? 'https://pinterest.com',
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div className="space-y-4">
          <div className="font-heading text-xl tracking-[0.3em]">CABANA</div>
          <p className="text-sm text-black/60">
            Sustainable essentials for people who care about feel, form, and impact.
            15% of every purchase supports mental health and women&rsquo;s empowerment.
          </p>
          <div className="text-sm text-black/60">
            ABN: {process.env.NEXT_PUBLIC_ABN ?? '00 000 000 000'}
          </div>
          <div className="text-sm text-black/60">
            Business Address:{' '}
            {process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? 'Canberra ACT 2601, Australia'}
          </div>
          <div className="text-sm text-black/60">
            Contact: {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-black/70">Shop</p>
          <Link href="/products" className="block text-black/70">
            All Products
          </Link>
          <Link href="/products?category=Men" className="block text-black/70">
            Men
          </Link>
          <Link href="/products?category=Women" className="block text-black/70">
            Women
          </Link>
          <Link href="/products?category=Sets" className="block text-black/70">
            Bundles
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-black/70">Legal</p>
          <Link href="/privacy-policy" className="block text-black/70">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="block text-black/70">
            Terms of Service
          </Link>
          <Link href="/shipping-policy" className="block text-black/70">
            Shipping Policy
          </Link>
          <Link href="/return-policy" className="block text-black/70">
            Returns Policy
          </Link>
          <Link href="/legal" className="block text-black/70">
            Legal Index
          </Link>
          <div className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-black/70"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-black/5 py-4 text-center text-xs text-black/70">
        &copy; {year} CABANA Collections. All rights reserved.
      </div>
    </footer>
  );
}
