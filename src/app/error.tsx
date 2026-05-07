"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6">
        <span className="text-action-gold text-xs font-black uppercase tracking-[0.3em]">Error</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
          Something went wrong
        </h1>
        <p className="text-neutral-500 max-w-md">
          We couldn&apos;t load this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-action-gold transition-all"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}