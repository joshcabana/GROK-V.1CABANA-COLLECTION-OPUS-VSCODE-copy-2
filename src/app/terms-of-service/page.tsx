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
        <h2 className="font-heading text-2xl">1. Agreement to terms</h2>
        <p className="text-sm text-black/60">
          By accessing or using our website, you agree to these Terms of Service and our Privacy
          Policy. If you do not agree, please do not use our website.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">2. Use of website</h2>
        <p className="text-sm text-black/60">You agree not to:</p>
        <ul className="space-y-2 text-sm text-black/60">
          <li>Engage in unlawful, infringing, or misleading activity.</li>
          <li>Interfere with website security or operation.</li>
          <li>Use automated scraping without permission.</li>
          <li>Transmit malware or malicious code.</li>
          <li>Impersonate another person or brand.</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">3. Products, pricing & orders</h2>
        <ul className="space-y-2 text-sm text-black/60">
          <li>All prices are in AUD and include GST where applicable.</li>
          <li>We may update pricing, availability, or product details without notice.</li>
          <li>We may cancel orders for errors, suspected fraud, or supply limitations.</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">4. Shipping & delivery</h2>
        <p className="text-sm text-black/60">
          Delivery timeframes are estimates only. Risk passes to you upon delivery to the nominated
          address or when Authority to Leave is selected.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">5. Returns, refunds & consumer guarantees</h2>
        <p className="text-sm text-black/60">
          Our returns policy outlines change-of-mind returns. Your rights under Australian Consumer
          Law (ACL) cannot be excluded and apply to faulty goods or services.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">6. Intellectual property</h2>
        <p className="text-sm text-black/60">
          All content on this website (images, designs, text, trademarks) remains the property of
          CABANA and must not be used without permission.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">7. Privacy</h2>
        <p className="text-sm text-black/60">
          We handle personal information in accordance with our Privacy Policy and the Australian
          Privacy Principles.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">8. Disclaimers & liability</h2>
        <p className="text-sm text-black/60">
          To the maximum extent permitted by law, our liability is limited to the remedies
          available under the ACL. Nothing in these terms excludes non-excludable consumer
          guarantees.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">9. User content & reviews</h2>
        <p className="text-sm text-black/60">
          If you submit reviews or content, you grant us a non-exclusive licence to use, display,
          and share that content for promotional purposes.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">10. Programs & pre-orders</h2>
        <p className="text-sm text-black/60">
          Pre-orders and limited releases may have extended delivery timelines. We will notify you
          of any significant delays.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">11. Indemnity</h2>
        <p className="text-sm text-black/60">
          You agree to indemnify CABANA for claims arising from your misuse of the website or breach
          of these terms.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">12. Governing law & disputes</h2>
        <p className="text-sm text-black/60">
          These terms are governed by the laws of the Australian Capital Territory. Any disputes
          will be handled in accordance with ACT law and applicable consumer protections.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">13. Changes to terms</h2>
        <p className="text-sm text-black/60">
          We may update these terms from time to time. The latest version will always be available
          on our website and applies from the date published.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">14. Contact</h2>
        <ul className="space-y-2 text-sm text-black/60">
          <li>Email: {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}</li>
          <li>Location: Canberra ACT, Australia</li>
          <li>ABN: {process.env.NEXT_PUBLIC_ABN ?? '00 000 000 000'}</li>
        </ul>
      </div>
    </div>
  );
}
