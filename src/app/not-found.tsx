import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center md:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">404</p>
      <h1 className="font-heading text-4xl">Page not found.</h1>
      <p className="text-sm text-black/60">
        The page you&rsquo;re looking for doesn&rsquo;t exist. Return home or explore the collection.
      </p>
      <Link href="/" className="rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-white">
        Go home
      </Link>
    </div>
  );
}
