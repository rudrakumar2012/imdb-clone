import React from "react";
import { FocusCardsContainer } from "../../components/FocusCardsContainer";
import { getMoviesByIds } from "../../lib/tmdb";

export default async function EditorialPage() {
  // Fetch curated movies dynamically from TMDB
  const curatedMovieIds = [157336, 27205, 496243]; // Interstellar, Inception, Parasite
  const neonNoir = await getMoviesByIds(curatedMovieIds);

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Editorial Header */}
        <header className="max-w-3xl flex flex-col gap-8">
          <span className="text-[#F5C518] text-xs font-black uppercase tracking-[0.3em]">The Sage Papers</span>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
            The Art of <br /> <span className="italic text-neutral-500">Perspective.</span>
          </h1>
          <p className="text-neutral-400 text-xl md:text-2xl font-medium leading-relaxed">
            Beyond the metadata lies the story. Our editorial team deep-dives into the thematic connective tissue of modern and classic cinema.
          </p>
        </header>

        {/* Feature Collection */}
        <section className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
             <span className="text-[#F5C518] text-[10px] font-black uppercase tracking-widest">Collection 01</span>
             <h2 className="text-3xl font-bold text-white tracking-tight">The Neon Noir Aesthetic</h2>
             <p className="text-neutral-500 max-w-xl">Exploring the intersection of high-tech and low-life through a saturated, high-contrast lens.</p>
          </div>
          <FocusCardsContainer cards={neonNoir} initialFavorites={[]} />
        </section>

        {/* Upcoming Section */}
        <section className="bg-white/5 rounded-3xl p-12 md:p-20 text-center flex flex-col items-center gap-6">
           <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Coming Soon: The Philosophical Sci-Fi Set</h3>
           <p className="text-neutral-500 max-w-lg mx-auto">A curation of stories that use the cold expanse of space to ask the most human questions.</p>
           <div className="mt-4 px-6 py-2 border border-white/20 rounded-full text-xs font-black uppercase tracking-widest text-white/40">In Production</div>
        </section>

      </div>
    </main>
  );
}
