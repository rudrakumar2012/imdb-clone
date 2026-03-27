import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../lib/tmdb";

export function FeaturedSpotlight({ movie }: { movie: Movie }) {
  if (!movie) return null;

  return (
    <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden bg-black py-20">
      <div className="absolute inset-0 opacity-40">
        <Image 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`} 
          fill 
          className="object-cover object-top md:object-center"
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="bg-[#F5C518] text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">Featured Spotlight</span>
          <span className="text-white/60 text-xs font-medium tracking-tighter uppercase">Curator's Choice</span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter max-w-2xl leading-[0.9]">
          {movie.title}
        </h2>
        
        <div className="flex items-center gap-6 text-neutral-400 font-medium">
          <span className="text-[#F5C518]">★ {movie.vote_average.toFixed(1)} Rating</span>
          <span>{new Date().getFullYear()} Edition</span>
        </div>
        
        <p className="text-neutral-300 text-lg md:text-xl max-w-xl leading-relaxed font-medium italic opacity-90">
          "{movie.overview.length > 250 ? movie.overview.slice(0, 250) + '...' : movie.overview}"
        </p>
        
        <div className="flex gap-4 mt-4">
          <Link 
            href={`/movie/${movie.id}`}
            className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-tight hover:bg-[#F5C518] transition-all flex items-center gap-2 group"
          >
            Experience Now
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-sm tracking-tight hover:bg-white/20 transition-all">
            Add to Library
          </button>
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section id="manifesto" className="py-32 px-4 md:px-8 max-w-4xl mx-auto text-center">
      <h3 className="text-[#F5C518] text-xs font-black uppercase tracking-[0.3em] mb-8">The CineSage Philosophy</h3>
      <p className="text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
        In an era of endless noise, we prioritize the <span className="italic text-neutral-500 underline decoration-[#F5C518]/30 underline-offset-8">silence of quality</span>.
      </p>
      <div className="mt-12 h-px w-24 bg-[#F5C518]/30 mx-auto" />
      <p className="mt-12 text-neutral-500 text-lg md:text-xl font-medium leading-relaxed">
        Our algorithm isn't just code; it's a commitment to the craft of film. We curate discovery to restore the magic of the private screening.
      </p>
    </section>
  );
}
