import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop — Cabana Collections',
  description:
    'Browse the full Cabana Collections range of premium modal essentials for men and women.',
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
