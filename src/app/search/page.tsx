import { getSearchResults } from "../../lib/tmdb";
import { FocusCardsContainer } from "../../components/FocusCardsContainer";
import { getWatchlistIds } from "../../actions/watchlist";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const [watchListIds, searchResults] = await Promise.all([
    getWatchlistIds(),
    query ? getSearchResults(query) : [],
  ]);

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white border-l-4 border-[#F5C518] pl-4">
          Search Results
        </h1>
        {query && (
          <p className="text-neutral-400 text-lg mb-10">
            Showing results for: <span className="text-[#F5C518]">"{query}"</span>
          </p>
        )}

        {query && searchResults.length === 0 ? (
          <div className="text-neutral-400 text-lg h-[40vh] flex items-center justify-center">
            No movies found matching &quot;{query}&quot;. Try a different search term.
          </div>
        ) : query ? (
          <FocusCardsContainer cards={searchResults} initialFavorites={watchListIds} />
        ) : (
          <div className="text-neutral-400 text-lg h-[40vh] flex items-center justify-center">
            Enter a search term to find movies.
          </div>
        )}
      </div>
    </main>
  );
}
