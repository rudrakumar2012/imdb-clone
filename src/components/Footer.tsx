import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-16 px-4 md:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-3xl font-bold tracking-tighter text-white">
            Cine<span className="text-action-gold">Sage</span>
          </Link>
          <p className="text-neutral-500 max-w-sm">
            Hand-curating the noise of cinema since 2026. The future of home discovery is human-led.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Archive</h4>
            <Link href="/#trending" className="text-neutral-500 hover:text-action-gold transition text-sm">The Current Pulse</Link>
            <Link href="/#top-rated" className="text-neutral-500 hover:text-action-gold transition text-sm">The Gold Standard</Link>
            <Link href="/watchlist" className="text-neutral-500 hover:text-action-gold transition text-sm">Curated Library</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Curation</h4>
            <Link href="/editorial" className="text-neutral-500 hover:text-action-gold transition text-sm">The Sage Papers</Link>
            <Link href="/about" className="text-neutral-500 hover:text-action-gold transition text-sm">The Manifesto</Link>
            <Link href="/about#protocols" className="text-neutral-500 hover:text-action-gold transition text-sm">Protocols</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Channel</h4>
            <Link href="/about#inquiries" className="text-neutral-500 hover:text-action-gold transition text-sm">Inquiries</Link>
            <Link href="mailto:support@cinesage.ai" className="text-neutral-500 hover:text-action-gold transition text-sm">Direct Access</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-neutral-600 text-xs">© 2026 CINESAGE. AN INDEPENDENT CURIOSITY.</p>
        <div className="flex gap-6">
          <a href="https://twitter.com/cinesage" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-white transition text-xs">Twitter</a>
          <a href="https://instagram.com/cinesage" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-white transition text-xs">Instagram</a>
          <a href="https://vimeo.com/cinesage" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-white transition text-xs">Vimeo</a>
        </div>
      </div>
    </footer>
  );
}
