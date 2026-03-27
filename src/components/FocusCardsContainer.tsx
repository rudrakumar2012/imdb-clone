"use client";
import { FocusCards } from "./ui/focus-cards";
import { useState } from "react";
import { addToWatchlist, removeFromWatchlist } from "../actions/watchlist";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function FocusCardsContainer({ cards, initialFavorites }: { cards: any[], initialFavorites: number[] }) {
  const [favorites, setFavorites] = useState(new Set(initialFavorites));
  const router = useRouter();

  const handleToggle = async (movie: any, isFav: boolean) => {
    // Optimistic UI update
    const nextFavs = new Set(favorites);
    if (isFav) {
      nextFavs.delete(movie.id);
      setFavorites(nextFavs);
      await removeFromWatchlist(movie.id);
    } else {
      nextFavs.add(movie.id);
      setFavorites(nextFavs);
      await addToWatchlist(movie.id, movie.title, movie.poster_path);
    }
  };

  // We map the cards to include link wrapping so they can be navigated
  const linkedCards = cards.map(c => ({
    ...c,
    // Add custom clicking to redirect the parent
  }));

  return (
    <FocusCards 
      cards={cards} 
      initialFavorites={favorites} 
      onToggleFavorite={handleToggle} 
    />
  );
}
