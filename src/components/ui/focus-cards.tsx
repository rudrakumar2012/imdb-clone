"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { IconHeartFilled, IconHeart } from "@tabler/icons-react";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    isFavorited,
    onToggleFavorite
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    isFavorited: boolean;
    onToggleFavorite: () => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-neutral-900 overflow-hidden aspect-[2/3] w-full transition-all duration-300 ease-out cursor-pointer group/card",
        /* Blur effect only on desktop (md+) when another card is hovered */
        hovered !== null && hovered !== index && "max-md:blur-none md:blur-sm md:opacity-50 md:shadow-none",
        hovered === index && "max-md:scale-100 md:scale-105 md:shadow-black md:shadow-2xl md:z-10"
      )}
    >
      <Link href={`/movie/${card.id}`} className="block h-full w-full">
        <Image
          src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover absolute inset-0 rounded-lg"
        />
        {/* Overlay: always visible on mobile (with translucent bg), hover-only on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
          <h3 className="text-base md:text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
            {card.title}
          </h3>
          <div className="flex gap-4 items-center mt-1 md:mt-2 text-xs md:text-sm lg:text-base font-medium text-neutral-300">
             <span className="text-action-gold font-bold">★ {card.vote_average?.toFixed(1)}</span>
             <span>•</span>
             <span>{card.release_date ? new Date(card.release_date).getFullYear() : 'N/A'}</span>
          </div>
        </div>
      </Link>
      {/* Favorite button: always accessible on mobile, hover-triggered on desktop */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(); }}
        className="absolute top-3 right-3 z-20 text-action-gold hover:scale-110 transition md:opacity-0 md:group-hover/card:opacity-100"
        aria-label={isFavorited ? "Remove from watchlist" : "Add to watchlist"}
      >
        {isFavorited ? <IconHeartFilled size={28} /> : <IconHeart size={28} />}
      </button>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards, initialFavorites, onToggleFavorite }: { cards: any[], initialFavorites: Set<number>, onToggleFavorite: (movie: any, isFav: boolean) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!cards || cards.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          isFavorited={initialFavorites.has(card.id)}
          onToggleFavorite={() => onToggleFavorite(card, initialFavorites.has(card.id))}
        />
      ))}
    </div>
  );
}