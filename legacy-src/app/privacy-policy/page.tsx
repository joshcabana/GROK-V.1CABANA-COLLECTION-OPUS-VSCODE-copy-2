import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How CABANA collects, uses, and protects personal information in Australia.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">Privacy Policy</p>
      <h1 className="font-heading text-4xl">Your privacy matters.</h1>
      <p className="text-sm text-black/60">Last updated: 4 February 2026</p>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Who we are</h2>
        <p className="text-sm text-black/60">
          CABANA Collections (we, us, our) is an Australian business based in Canberra, ACT. We
          comply with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">What this policy covers</h2>
        <p className="text-sm text-black/60">
          This policy explains how we collect, use, disclose, store, and protect personal
          information when you visit our website, place an order, or contact us.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Information we collect</h2>
        <ul className="space-y-2 text-sm text-black/60">
          <li>Identity and contact details (name, email, phone, delivery address).</li>
          <li>Order information (products purchased, order history, delivery preferences).</li>
          <li>Payment information handled securely by third-party payment providers.</li>
          <li>Customer support communications and feedback.</li>
          <li>Technical data (IP address, device, browser, cookie data, analytics).</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">How we use your information</h2>
        <ul className="space-y-2 text-sm text-black/60">
          <li>Process and deliver orders, including shipping and returns.</li>
          <li>Send order confirmations, shipping updates, and service notifications.</li>
          <li>Provide customer support and respond to enquiries.</li>
          <li>Improve our website, products, and customer experience.</li>
          <li>Send marketing updates if you opt in (you can unsubscribe anytime).</li>
          <li>Prevent fraud and comply with legal obligations.</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">When we disclose information</h2>
        <p className="text-sm text-black/60">
          We do not sell personal information. We may disclose information to service providers
          such as payment processors, shipping carriers, IT providers, and marketing platforms
          solely to perform services for us.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Overseas disclosures (APP 8)</h2>
        <p className="text-sm text-black/60">
          Some providers may store data outside Australia. When this occurs, we take reasonable
          steps to ensure they handle your information in line with Australian privacy requirements.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Security (APP 11)</h2>
        <p className="text-sm text-black/60">
          We implement technical and organisational safeguards to protect your information. Access
          is limited to authorised personnel and trusted service providers.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Data breaches (NDB scheme)</h2>
        <p className="text-sm text-black/60">
          If a data breach is likely to result in serious harm, we will notify affected individuals
          and the Office of the Australian Information Commissioner (OAIC) as required by law.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Retention and deletion</h2>
        <p className="text-sm text-black/60">
          We keep personal information only as long as needed for the purposes outlined in this
          policy or to meet legal requirements, after which it is securely deleted or de-identified.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Your choices and rights</h2>
        <ul className="space-y-2 text-sm text-black/60">
          <li>Request access to or correction of your personal information.</li>
          <li>Opt out of marketing communications at any time.</li>
          <li>Manage cookie preferences through your browser settings.</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Marketing & the Spam Act</h2>
        <p className="text-sm text-black/60">
          We only send marketing communications with your consent or as permitted by law. Every
          marketing email includes an unsubscribe link.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Cookies & analytics</h2>
        <p className="text-sm text-black/60">
          We use cookies and analytics tools (such as Google Analytics) to understand site
          performance and improve your experience. You can disable cookies in your browser, though
          some functionality may be affected.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Third-party links</h2>
        <p className="text-sm text-black/60">
          Our website may link to third-party sites. We are not responsible for their privacy
          practices and encourage you to review their policies.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Children</h2>
        <p className="text-sm text-black/60">
          Our website is not directed at children under 16. We do not knowingly collect personal
          information from children.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Changes to this policy</h2>
        <p className="text-sm text-black/60">
          We may update this policy from time to time. The latest version will always be available
          on our website.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Contact us</h2>
        <p className="text-sm text-black/60">
          For privacy questions, contact {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ??
            'support@cabanacollections.com.au'}.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Complaints</h2>
        <p className="text-sm text-black/60">
          If you believe we have breached the APPs, please contact us first. If you are not satisfied
          with our response, you can lodge a complaint with the OAIC at www.oaic.gov.au.
        </p>
      </div>
    </div>
  );
}
