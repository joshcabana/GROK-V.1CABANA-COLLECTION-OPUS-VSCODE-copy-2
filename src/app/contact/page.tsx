import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach the CABANA team for order support, wholesale, or press enquiries.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-8">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-black/50">Contact</p>
        <h1 className="font-heading text-4xl">Get in touch.</h1>
        <p className="text-base text-black/60">
          We&rsquo;re here to help with orders, product questions, and partnerships. Expect a response
          within 1-2 business days.
        </p>
        <form
          className="section-card space-y-4 p-6"
          action="https://formspree.io/f/yourformid"
          method="POST"
        >
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-black/50">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-black/50">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-black/50">Subject</label>
            <select
              name="subject"
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
            >
              <option value="">Select a topic</option>
              <option value="order">Order inquiry</option>
              <option value="product">Product question</option>
              <option value="shipping">Shipping & returns</option>
              <option value="wholesale">Wholesale inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-black/50">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="How can we help?"
              className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm"
            />
            <input type="hidden" name="_subject" value="CABANA Contact Form" />
            <input type="hidden" name="_template" value="table" />
          </div>
          <button className="w-full rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-white">
            Send message
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <div className="section-card p-6">
          <h2 className="font-heading text-2xl">General enquiries</h2>
          <p className="mt-3 text-sm text-black/60">
            {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}
          </p>
          <p className="text-sm text-black/60">Monday – Friday, 9am – 5pm AEST</p>
          <p className="text-sm text-black/60">Based in Canberra (AEST)</p>
        </div>
        <div className="section-card p-6">
          <h2 className="font-heading text-2xl">Customer service</h2>
          <p className="mt-3 text-sm text-black/60">1800 CABANA (1800 222 262)</p>
          <p className="text-sm text-black/60">Average response time: 24 hours</p>
          <p className="text-sm text-black/60">Currently shipping Australia-wide</p>
        </div>
        <div className="section-card p-6">
          <h2 className="font-heading text-2xl">Returns & exchanges</h2>
          <p className="mt-3 text-sm text-black/60">30-day return policy on unworn items.</p>
          <Link href="/return-policy" className="text-sm underline">
            View returns policy
          </Link>
        </div>
        <div className="section-card p-6">
          <h2 className="font-heading text-2xl">Press & partnerships</h2>
          <p className="mt-3 text-sm text-black/60">
            For media enquiries and collaborations, email{' '}
            {process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@cabanacollections.com.au'}.
          </p>
        </div>
      </div>
    </div>
  );
}
