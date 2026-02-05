'use client';

import Link from 'next/link';
import { navLinks } from './navLinks';
import SiteSearch from './SiteSearch';

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNav({ open, onClose }: MobileNavProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <button
        className="absolute inset-0 bg-black/40"
        aria-label="Close navigation menu"
        onClick={onClose}
      />
      <div className="relative ml-auto h-full w-72 bg-white px-6 py-6 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg tracking-[0.25em]">CABANA</span>
          <button
            className="rounded-full border border-black/10 px-3 py-1 text-sm"
            onClick={onClose}
            aria-label="Close"
          >
            Close
          </button>
        </div>
        <div className="mt-8 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-base text-black/70"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-8 space-y-3">
          <label className="text-xs uppercase tracking-[0.2em] text-black/50">Search</label>
          <SiteSearch className="w-full" />
        </div>
      </div>
    </div>
  );
}
