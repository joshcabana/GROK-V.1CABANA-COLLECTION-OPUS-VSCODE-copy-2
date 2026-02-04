import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Care Instructions',
  description: 'Keep your CABANA essentials looking and feeling their best with simple care guidance.',
};

export default function CareInstructionsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">Care Instructions</p>
      <h1 className="font-heading text-4xl">Made to last.</h1>
      <div className="section-card p-6">
        <ul className="space-y-2 text-sm text-black/60">
          <li>Wash cold on a gentle cycle with similar colours.</li>
          <li>Use mild detergent and avoid bleach.</li>
          <li>Line dry in shade to preserve softness.</li>
          <li>Do not tumble dry or iron directly on prints.</li>
        </ul>
      </div>
    </div>
  );
}
