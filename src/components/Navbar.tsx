"use client";
import Link from "next/link";
import { useState } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white mr-8">
          Cine<span className="text-[#F5C518]">Sage</span>
        </Link>
        <div className="flex gap-6 items-center flex-1">
           <Link href="/" className="text-white hover:text-[#F5C518] transition text-sm font-medium">Home</Link>
           <Link href="/#trending" className="text-white hover:text-[#F5C518] transition text-sm font-medium">Trending</Link>
           <Link href="/#top-rated" className="text-white hover:text-[#F5C518] transition text-sm font-medium">Top Rated</Link>
           <Link href="/watchlist" className="text-white hover:text-[#F5C518] transition text-sm font-medium">My List</Link>
        </div>

        {/* Search */}
        {isSearchOpen ? (
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              autoFocus
              className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white text-sm focus:outline-none focus:border-[#F5C518] w-64"
            />
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="text-white/70 hover:text-white transition"
            >
              <IconX size={20} />
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center text-white/70 hover:text-white transition"
          >
            <IconSearch size={20} />
          </button>
        )}
      </div>
    </nav>
  );
}
