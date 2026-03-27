"use client";

import { useState, useEffect, useMemo } from "react";
import { FocusCardsContainer } from "../../components/FocusCardsContainer";
import { Dropdown } from "../../components/ui/dropdown";
import { Search } from "lucide-react";

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

  const filteredAndSortedCards = useMemo(() => {
    let result = [...initialCards];

    // Filter by title
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((movie) =>
        movie.title?.toLowerCase().includes(query)
      );
    }

    // Sort
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
  }, [initialCards, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-black">
      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto pb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white border-l-4 border-[#F5C518] pl-4">
          My Watchlist
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your watchlist..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-[#F5C518] transition"
            />
          </div>

          {/* Sort */}
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

        {/* Movies grid */}
        {filteredAndSortedCards.length === 0 ? (
          <div className="text-neutral-400 text-lg h-[40vh] flex items-center justify-center">
            {searchQuery
              ? `No movies matching "${searchQuery}"`
              : "Your watchlist is currently empty. Discover some movies to add them here!"}
          </div>
        ) : (
          <FocusCardsContainer
            cards={filteredAndSortedCards}
            initialFavorites={filteredAndSortedCards.map(m => m.id)}
          />
        )}
      </div>
    </main>
  );
}
