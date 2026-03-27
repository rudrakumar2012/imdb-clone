import { HeroParallax } from "../components/ui/hero-parallax";
import { getWatchlistIds } from "../actions/watchlist";
import { getTrendingMovies, getTopRatedMovies, Movie } from "../lib/tmdb";
import { FocusCardsContainer } from "../components/FocusCardsContainer";
import { Navbar } from "../components/Navbar";
import { Philosophy, FeaturedSpotlight } from "../components/EditorialSections";

export default async function HomePage() {
  const [trending, topRated, watchListIds] = await Promise.all([
    getTrendingMovies(1),
    getTopRatedMovies(1),
    getWatchlistIds()
  ]);

  const heroProducts = trending.slice(0, 10).map((m: Movie) => ({
    title: m.title,
    thumbnail: `https://image.tmdb.org/t/p/w1280${m.backdrop_path || m.poster_path}`,
    link: `/movie/${m.id}`
  }));

  // Pick a random dynamic movie for the spotlight from the top 10 trending
  const spotlightMovie = trending[Math.floor(Math.random() * Math.min(trending.length, 10))];

  return (
    <main className="min-h-screen bg-black">
      <HeroParallax products={heroProducts} />
      
      <Philosophy />

      <div id="trending" className="py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 flex flex-col gap-2">
          <span className="text-[#F5C518] text-[10px] font-black uppercase tracking-widest">Current Pulse</span>
          <h2 className="text-3xl font-bold text-white">Trending Discovery</h2>
          <p className="text-neutral-500 text-sm font-medium">The stories capturing the global imagination this week.</p>
        </div>
        <FocusCardsContainer cards={trending} initialFavorites={watchListIds} />
      </div>

      {spotlightMovie && <FeaturedSpotlight movie={spotlightMovie} />}

      <div id="top-rated" className="py-20 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 flex flex-col gap-2">
          <span className="text-[#F5C518] text-[10px] font-black uppercase tracking-widest">Gold Standard</span>
          <h2 className="text-3xl font-bold text-white">Top Rated Series</h2>
          <p className="text-neutral-500 text-sm font-medium">Masterpieces as voted by the most rigorous critics.</p>
        </div>
        <FocusCardsContainer cards={topRated} initialFavorites={watchListIds} />
      </div>
    </main>
  );
}
