import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal & Policies',
  description: 'CABANA legal documents, consumer rights, and official Australian resources.',
};

export default function LegalIndexPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">Legal & Policies</p>
      <h1 className="font-heading text-4xl">CABANA legal documents</h1>
      <p className="text-sm text-black/60">Last updated: 4 February 2026</p>
      <p className="text-base text-black/60">
        Here you&rsquo;ll find our key legal documents. We encourage you to read these carefully before
        purchasing or using our website.
      </p>

      <div className="section-card space-y-4 p-6">
        <div>
          <Link href="/terms-of-service" className="font-heading text-lg">
            Terms of Service
          </Link>
          <p className="text-sm text-black/60">
            The rules for using our website and purchasing from us, including your rights under
            Australian Consumer Law.
          </p>
        </div>
        <div>
          <Link href="/return-policy" className="font-heading text-lg">
            Returns Policy
          </Link>
          <p className="text-sm text-black/60">
            Details on returns, refunds, and remedies for faulty goods under the ACL.
          </p>
        </div>
        <div>
          <Link href="/shipping-policy" className="font-heading text-lg">
            Shipping Policy
          </Link>
          <p className="text-sm text-black/60">
            Information about delivery methods, timeframes, costs, and Authority to Leave options.
          </p>
        </div>
        <div>
          <Link href="/privacy-policy" className="font-heading text-lg">
            Privacy Policy
          </Link>
          <p className="text-sm text-black/60">
            How we collect, use, and protect your personal information in line with Australian
            privacy law.
          </p>
        </div>
      </div>

      <div className="section-card space-y-3 p-6">
        <h2 className="font-heading text-2xl">Official Australian resources</h2>
        <p className="text-sm text-black/60">
          These resources provide independent guidance on consumer rights, privacy, and dispute
          resolution in Australia and the ACT.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href="https://www.accc.gov.au/" target="_blank" rel="noreferrer" className="text-black/70">
            ACCC
          </a>
          <a
            href="https://www.accesscanberra.act.gov.au/"
            target="_blank"
            rel="noreferrer"
            className="text-black/70"
          >
            Access Canberra
          </a>
          <a href="https://www.acat.act.gov.au/" target="_blank" rel="noreferrer" className="text-black/70">
            ACAT
          </a>
          <a href="https://www.oaic.gov.au/" target="_blank" rel="noreferrer" className="text-black/70">
            OAIC
          </a>
          <a href="https://www.acma.gov.au/" target="_blank" rel="noreferrer" className="text-black/70">
            ACMA
          </a>
        </div>
      </div>

      <p className="text-sm text-black/60">
        Questions about these documents? Email us at{' '}
        {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}.
      </p>
    </div>
  );
}
