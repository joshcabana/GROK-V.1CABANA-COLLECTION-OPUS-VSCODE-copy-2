'use client';

import { useCartStorage } from '../lib/useCartStorage';

type CartCountProps = {
  className?: string;
};

export default function CartCount({ className }: CartCountProps) {
  const { itemCount } = useCartStorage();
  if (itemCount === 0) return null;

  return (
    <span className={className ?? 'ml-2 rounded-full bg-ink px-2 py-0.5 text-xs text-white'}>
      {itemCount}
    </span>
  );
}
