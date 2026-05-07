import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6">
        <span className="text-action-gold text-xs font-black uppercase tracking-[0.3em]">404</span>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
          Lost in the <br /><span className="italic text-neutral-500">Dark.</span>
        </h1>
        <p className="text-neutral-500 text-lg max-w-md">
          This screening room doesn&apos;t exist. Let&apos;s get you back to the main theater.
        </p>
        <Link
          href="/"
          className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-tight hover:bg-action-gold transition-all"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}