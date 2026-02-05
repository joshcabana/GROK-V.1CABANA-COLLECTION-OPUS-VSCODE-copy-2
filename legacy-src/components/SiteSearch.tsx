'use client';

type SiteSearchProps = {
  className?: string;
  placeholder?: string;
};

export default function SiteSearch({ className, placeholder }: SiteSearchProps) {
  return (
    <form action="/products" className={className ?? ''} role="search">
      <label className="sr-only" htmlFor="site-search">
        Search products
      </label>
      <input
        id="site-search"
        type="search"
        name="query"
        placeholder={placeholder ?? 'Search products'}
        className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm outline-none transition focus:border-black/40"
      />
    </form>
  );
}
