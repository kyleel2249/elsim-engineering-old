import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-display text-2xl font-semibold text-steel-50">Page not found</h1>
      <p className="max-w-md text-sm text-steel-400">The page you requested does not exist.</p>
      <Link href="/" className="rounded bg-accent px-4 py-2 text-sm font-semibold text-steel-950">
        Back to home
      </Link>
    </div>
  );
}
