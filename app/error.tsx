'use client';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-display text-2xl font-semibold text-steel-50">Something went wrong</h1>
      <p className="max-w-md text-sm text-steel-400">{error.message || 'An unexpected error occurred.'}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded bg-accent px-4 py-2 text-sm font-semibold text-steel-950"
      >
        Try again
      </button>
    </div>
  );
}
