"use client";
import Image from "next/image";
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
        "rounded-lg relative bg-neutral-900 overflow-hidden aspect-[2/3] w-full transition-all duration-300 ease-out cursor-pointer",
        hovered !== null && hovered !== index && "blur-sm opacity-50 shadow-none",
        hovered === index && "scale-105 shadow-black shadow-2xl z-10"
      )}
      onClick={() => window.location.href = `/movie/${card.id}`}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
        alt={card.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="object-cover absolute inset-0 rounded-lg"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </h3>
        <div className="flex gap-4 items-center mt-2 text-sm md:text-base font-medium text-neutral-300">
           <span className="text-[#F5C518] font-bold">★ {card.vote_average?.toFixed(1)}</span>
           <span>•</span>
           <span>{card.release_date ? new Date(card.release_date).getFullYear() : 'N/A'}</span>
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(); }}
          className="absolute top-4 right-4 z-20 text-[#F5C518] hover:scale-110 transition"
        >
          {isFavorited ? <IconHeartFilled size={28} /> : <IconHeart size={28} />}
        </button>
      </div>
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
