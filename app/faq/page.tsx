import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about CABANA orders, care, and impact.',
};

const faqs = [
  {
    question: 'What fabric do you use?',
    answer:
      'We use premium modal blends for a soft, breathable, and durable finish that feels gentle on skin.',
  },
  {
    question: 'When will my order ship?',
    answer: 'Orders dispatch within 1-2 business days. You’ll receive tracking once shipped.',
  },
  {
    question: 'How do returns work?',
    answer:
      'Unworn items can be returned within 14 days. Faulty products are covered by Australian Consumer Law.',
  },
  {
    question: 'How do you calculate the 15% impact?',
    answer:
      'We dedicate 15% of every purchase to partners supporting mental health and women’s empowerment.',
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">FAQs</p>
      <h1 className="font-heading text-4xl">We’ve answered the essentials.</h1>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="section-card p-6">
            <h2 className="font-heading text-xl">{faq.question}</h2>
            <p className="mt-2 text-sm text-black/60">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
