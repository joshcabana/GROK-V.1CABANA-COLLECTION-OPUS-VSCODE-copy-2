import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Find your perfect CABANA fit with our size guide for men and women.',
};

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">Size Guide</p>
      <h1 className="font-heading text-4xl">Find your fit.</h1>
      <div className="section-card p-6">
        <h2 className="font-heading text-2xl">Men</h2>
        <p className="mt-2 text-sm text-black/60">S (28-30), M (31-33), L (34-36), XL (37-39)</p>
      </div>
      <div className="section-card p-6">
        <h2 className="font-heading text-2xl">Women</h2>
        <p className="mt-2 text-sm text-black/60">XS (6-8), S (8-10), M (10-12), L (12-14)</p>
      </div>
    </div>
  );
}
