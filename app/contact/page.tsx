import type { Metadata } from 'next';
import { supportEmailHref, sitePolicy } from '@/lib/policy';

export const metadata: Metadata = {
  title: 'Contact — Cabana Collections',
  description:
    'Get in touch with Cabana Collections for support, returns, order questions, or wholesale enquiries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Contact CABANA
        </h1>
        <p className="mt-6 text-base leading-relaxed text-[#1d1d1f]">
          For support, returns, order questions, or wholesale enquiries, contact us via the email
          below.
        </p>

        <section className="mt-8 rounded-2xl border border-[#d2d2d7] bg-white p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Support email</p>
          <p className="mt-2 text-lg text-[#1d1d1f]">
            <a href={supportEmailHref} className="underline hover:no-underline">
              {sitePolicy.supportEmail}
            </a>
          </p>
          <p className="mt-3 text-sm text-[#6e6e73]">
            Service hours: Monday to Friday, 9:00am to 5:00pm AEST.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-[#d2d2d7] bg-white p-5">
          <h2 className="text-lg font-medium text-[#1d1d1f]">Shipping scope</h2>
          <p className="mt-2 text-sm text-[#6e6e73]">
            We currently ship within Australia only. See full details in the Shipping Policy.
          </p>
        </section>
      </div>
    </main>
  );
}
