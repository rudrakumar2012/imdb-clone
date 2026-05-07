"use client";
import { FocusCards } from "./ui/focus-cards";
import { useState } from "react";
import { addToWatchlist, removeFromWatchlist } from "../actions/watchlist";

export function FocusCardsContainer({ cards, initialFavorites, onToggleFavorite }: { cards: any[], initialFavorites: number[], onToggleFavorite?: (movie: any, isFav: boolean) => Promise<void> | void }) {
  const [favorites, setFavorites] = useState(new Set(initialFavorites));

  const handleToggle = async (movie: any, isFav: boolean) => {
    if (onToggleFavorite) {
      await onToggleFavorite(movie, isFav);
      return;
    }

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

  return (
    <FocusCards
      cards={cards}
      initialFavorites={favorites}
      onToggleFavorite={handleToggle}
    />
  );
}