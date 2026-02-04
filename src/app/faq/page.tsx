import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently asked questions about CABANA products, shipping, returns, and impact.',
};

const faqs = [
  {
    question: 'What materials are CABANA products made from?',
    answer:
      'Our products are crafted from premium modal sourced from sustainably managed beech forests. Modal is breathable, moisture-wicking, and exceptionally soft while maintaining shape and colour.',
  },
  {
    question: 'How do I choose the right size?',
    answer:
      'Our sizing is designed to be true-to-size. Refer to the size guide on each product page, measure your waist at the narrowest point, and size up for a more relaxed fit if needed.',
  },
  {
    question: "What’s the difference between men's and women's collections?",
    answer:
      'Men’s pieces focus on supportive contouring and stay-put waistbands. Women’s sets prioritise light support, seamless edges, and barely-there comfort.',
  },
  {
    question: 'How should I care for CABANA pieces?',
    answer:
      'We recommend cold gentle wash, mild detergent, and line drying in shade. Avoid bleach and high heat to preserve softness and elasticity.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Orders dispatch within 1-3 business days from Canberra. Standard shipping times vary by location and carrier, with tracking provided once shipped.',
  },
  {
    question: 'Do you offer free shipping?',
    answer:
      'Yes. We offer free standard shipping on orders over $150 (after discounts). Shipping costs are calculated at checkout for all other orders.',
  },
  {
    question: 'Can I update my delivery address?',
    answer:
      'If your order hasn’t shipped yet, email our team immediately and we’ll do our best to update your delivery details.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return period for unworn, unwashed items with tags attached. Faulty items are covered under Australian Consumer Law.',
  },
  {
    question: 'Do you allow exchanges?',
    answer:
      'Yes, we can organise exchanges for size changes subject to availability. Follow the same return process and include the size you need.',
  },
  {
    question: 'Where does the 15% donation go?',
    answer:
      '15% of every purchase supports mental health initiatives (men’s collection) and women’s empowerment programs (women’s collection).',
  },
  {
    question: 'How do I contact CABANA?',
    answer:
      'Email support@cabanacollections.com.au and we’ll respond within 1-2 business days. We’re based in Canberra (AEST).',
  },
  {
    question: 'Are your products sustainable?',
    answer:
      'We prioritise low-impact materials and responsible production partners. Our modal blend uses less water than conventional cotton.',
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">FAQs</p>
      <h1 className="font-heading text-4xl">We’ve answered the essentials.</h1>
      <p className="text-sm text-black/60">
        Find answers to common questions about our products, shipping, returns, sizing, and impact.
      </p>
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
