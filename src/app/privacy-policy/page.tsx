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

      <p className="text-base text-black/60">
        CABANA Collections (we, us, our) is committed to protecting your privacy and complying with
        the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs). This policy
        explains how we collect, use, disclose, and protect personal information when you use our
        website or purchase from us.
      </p>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Personal information we collect</h2>
        <ul className="space-y-2 text-sm text-black/60">
          <li>Identity and contact details, such as your name, email address, phone number, and delivery address.</li>
          <li>Order details including products purchased, order history, and delivery preferences.</li>
          <li>Payment information handled by our payment providers (we do not store full card details).</li>
          <li>Customer support communications and feedback.</li>
          <li>Technical information such as IP address, device type, and browsing activity via cookies.</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">How we collect information</h2>
        <p className="text-sm text-black/60">
          We collect information directly from you when you place an order, subscribe to updates, or
          contact us. We also collect limited technical data automatically through cookies and
          analytics tools to improve our website experience.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">How we use information</h2>
        <ul className="space-y-2 text-sm text-black/60">
          <li>Process and deliver your orders, including shipping and returns.</li>
          <li>Provide customer support and respond to enquiries.</li>
          <li>Send service-related communications and order updates.</li>
          <li>With your consent, send marketing and product updates (you can opt out at any time).</li>
          <li>Improve our website, products, and customer experience.</li>
        </ul>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Disclosure of personal information</h2>
        <p className="text-sm text-black/60">
          We may disclose personal information to trusted service providers who help us operate our
          business, such as payment processors, shipping carriers, IT providers, and marketing
          platforms. We only share information necessary to perform those services and require them
          to protect your information.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Overseas disclosures</h2>
        <p className="text-sm text-black/60">
          Some service providers may store data outside Australia. When this occurs, we take
          reasonable steps to ensure they handle your information in line with Australian privacy
          requirements.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Security</h2>
        <p className="text-sm text-black/60">
          We use administrative and technical safeguards to protect your information. If a data
          breach occurs that is likely to result in serious harm, we will notify affected individuals
          and the Office of the Australian Information Commissioner (OAIC) as required by law.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Access and correction</h2>
        <p className="text-sm text-black/60">
          You can request access to or correction of your personal information by contacting us. We
          will respond within a reasonable timeframe.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Marketing and communications</h2>
        <p className="text-sm text-black/60">
          We only send marketing communications if you opt in or if permitted by law. You can
          unsubscribe at any time using the link in our emails or by contacting us. We follow the
          Spam Act 2003 requirements for commercial electronic messages.
        </p>
      </div>

      <div className="section-card space-y-4 p-6">
        <h2 className="font-heading text-2xl">Complaints</h2>
        <p className="text-sm text-black/60">
          If you have a privacy concern, please contact us first so we can work to resolve it. If
          you are not satisfied, you can lodge a complaint with the OAIC.
        </p>
        <a
          className="text-sm text-black/60"
          href="https://www.oaic.gov.au/privacy/your-privacy-rights"
          target="_blank"
          rel="noreferrer"
        >
          Learn more about your privacy rights on the OAIC website.
        </a>
      </div>

      <p className="text-sm text-black/60">
        Contact us at {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}.
      </p>
    </div>
  );
}
