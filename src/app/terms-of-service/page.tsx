import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'CABANA terms for website use and purchases under Australian law.',
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">Terms of Service</p>
      <h1 className="font-heading text-4xl">Terms for using CABANA.</h1>
      <p className="text-sm text-black/60">Last updated: 4 February 2026</p>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Overview</h2>
        <p className="text-sm text-black/60">
          These terms apply to your use of the CABANA website and any purchases made through it. By
          accessing or using our website, you agree to these terms and our Privacy Policy.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Orders and pricing</h2>
        <ul className="space-y-2 text-sm text-black/60">
          <li>All prices are listed in Australian dollars (AUD) and include GST where applicable.</li>
          <li>We may change prices or availability at any time without notice.</li>
          <li>We reserve the right to cancel orders for errors, suspected fraud, or supply issues.</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Shipping and delivery</h2>
        <p className="text-sm text-black/60">
          Delivery timeframes are estimates only and may vary due to carrier delays. Risk of loss
          passes to you on delivery to the address provided.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Returns and consumer guarantees</h2>
        <p className="text-sm text-black/60">
          Our returns policy outlines change-of-mind returns. Your rights under Australian Consumer
          Law (ACL) cannot be excluded and apply to faulty goods or services.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Intellectual property</h2>
        <p className="text-sm text-black/60">
          All content on this website, including designs, images, and trademarks, remains the
          property of CABANA and may not be used without permission.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Liability</h2>
        <p className="text-sm text-black/60">
          To the maximum extent permitted by law, our liability is limited to the remedies available
          under the ACL. Nothing in these terms excludes non-excludable consumer guarantees.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Changes to these terms</h2>
        <p className="text-sm text-black/60">
          We may update these terms from time to time. The latest version will always be available on
          our website and applies from the date it is published.
        </p>
      </div>

      <p className="text-sm text-black/60">
        Questions? Contact {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}.
      </p>
    </div>
  );
}
