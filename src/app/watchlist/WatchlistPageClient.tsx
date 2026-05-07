"use client";

import { useState, useEffect, useMemo } from "react";
import { FocusCardsContainer } from "../../components/FocusCardsContainer";
import { Dropdown } from "../../components/ui/dropdown";
import { removeFromWatchlist } from "../../actions/watchlist";
import { Search, HeartOff } from "lucide-react";
import Link from "next/link";

type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

const sortOptions = [
  { value: "newest", label: "Recently Added" },
  { value: "oldest", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
];

interface WatchlistPageClientProps {
  initialCards: any[];
}

export function WatchlistPageClient({ initialCards }: WatchlistPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [cards, setCards] = useState(initialCards);
  const [favorites, setFavorites] = useState<Set<number>>(() => new Set(initialCards.map(m => m.id)));

  useEffect(() => {
    setCards(initialCards);
    setFavorites(new Set(initialCards.map(m => m.id)));
  }, [initialCards]);

  const handleToggleFavorite = async (movie: any, isFav: boolean) => {
    const nextFavs = new Set(favorites);
    if (isFav) {
      nextFavs.delete(movie.id);
      setFavorites(nextFavs);
      await removeFromWatchlist(movie.id);
      setCards(prev => prev.filter(m => m.id !== movie.id));
    } else {
      nextFavs.add(movie.id);
      setFavorites(nextFavs);
    }
  };

  const filteredAndSortedCards = useMemo(() => {
    let result = [...cards];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((movie) =>
        movie.title?.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [cards, searchQuery, sortBy]);

  const isEmpty = initialCards.length === 0;

  return (
    <main className="min-h-screen bg-black">
      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto pb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white border-l-4 border-action-gold pl-4">
          My Watchlist
        </h1>

        {!isEmpty && (
          <>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your watchlist..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-action-gold focus:ring-1 focus:ring-action-gold transition"
                  aria-label="Search watchlist"
                />
              </div>
              <div className="flex items-center gap-2">
                <Dropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={(value) => setSortBy(value as SortOption)}
                />
              </div>
            </div>

            {/* Results count */}
            <p className="text-neutral-400 text-sm mb-6">
              {filteredAndSortedCards.length} {filteredAndSortedCards.length === 1 ? "movie" : "movies"} in your watchlist
            </p>
          </>
        )}

        {/* Movies grid or empty states */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-[40vh] gap-6">
            <HeartOff size={64} className="text-neutral-600" />
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2">Your watchlist is empty</h2>
              <p className="text-neutral-500 mb-6">Discover movies and add them to your watchlist.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-action-gold text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-action-gold/90 transition"
              >
                Browse Movies
              </Link>
            </div>
          </div>
        ) : filteredAndSortedCards.length === 0 ? (
          <div className="text-neutral-400 text-lg h-[40vh] flex items-center justify-center">
            No movies matching &ldquo;{searchQuery}&rdquo;
          </div>
        ) : (
          <FocusCardsContainer
            cards={filteredAndSortedCards}
            initialFavorites={Array.from(favorites)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </main>
  );
}