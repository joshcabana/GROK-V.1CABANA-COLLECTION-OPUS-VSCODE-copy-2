import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach the CABANA team for order support, wholesale, or press enquiries.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-8">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-black/50">Contact</p>
        <h1 className="font-heading text-4xl">We’re here to help.</h1>
        <p className="text-base text-black/60">
          Share your question below and we’ll reply within 1-2 business days.
        </p>
        <form className="section-card space-y-4 p-6">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-black/50">Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-black/50">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-black/50">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
            />
          </div>
          <button className="w-full rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-white">
            Send message
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <div className="section-card p-6">
          <h2 className="font-heading text-2xl">Support</h2>
          <p className="mt-3 text-sm text-black/60">
            For order updates or returns, email{' '}
            {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}.
          </p>
        </div>
        <div className="section-card p-6">
          <h2 className="font-heading text-2xl">FAQs</h2>
          <div className="mt-3 space-y-3 text-sm text-black/60">
            <p>Shipping is dispatched within 2 business days (excluding pre-orders).</p>
            <p>Returns are available for unworn items within 14 days of delivery.</p>
            <p>Our modal blend is certified for low-impact production.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
