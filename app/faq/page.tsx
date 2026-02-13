import type { Metadata } from 'next';
import Link from 'next/link';
import { supportEmailHref, sitePolicy } from '@/lib/policy';

export const metadata: Metadata = {
  title: 'FAQ — Cabana Collections',
  description:
    'Common questions about Cabana Collections shipping, returns, sizing, and impact initiatives.',
};

const faqs = [
  {
    question: 'Do you ship internationally?',
    answer: 'No. CABANA currently ships within Australia only.',
  },
  {
    question: 'How do I start a return?',
    answer: 'Email our support team with your order number to begin a return assessment.',
  },
  {
    question: 'How much of each order is allocated to impact initiatives?',
    answer:
      "CABANA allocates 10% of each purchase, mapped by product category to men's mental health or women's empowerment initiatives.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">FAQ</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Frequently Asked Questions
        </h1>

        <div className="mt-8 space-y-4">
          {faqs.map((item) => (
            <section
              key={item.question}
              className="rounded-2xl border border-[#d2d2d7] bg-white p-5"
            >
              <h2 className="text-base font-medium text-[#1d1d1f]">{item.question}</h2>
              <p className="mt-2 text-sm text-[#6e6e73]">{item.answer}</p>
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm text-[#6e6e73]">
          Still need help? Email{' '}
          <a href={supportEmailHref} className="underline hover:no-underline">
            {sitePolicy.supportEmail}
          </a>{' '}
          or use the{' '}
          <Link href="/contact" className="underline hover:no-underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
