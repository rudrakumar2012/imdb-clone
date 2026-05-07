"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconSearch, IconX, IconMenu2 } from "@tabler/icons-react";

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#trending", label: "Trending" },
    { href: "/#top-rated", label: "Top Rated" },
    { href: "/watchlist", label: "My List" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white shrink-0">
          Cine<span className="text-action-gold">Sage</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-6 items-center flex-1 ml-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white hover:text-action-gold transition text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                autoFocus
                className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white text-sm focus:outline-none focus:border-action-gold w-40 sm:w-64"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-white/70 hover:text-white transition"
                aria-label="Close search"
              >
                <IconX size={20} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center text-white/70 hover:text-white transition"
              aria-label="Open search"
            >
              <IconSearch size={20} />
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center text-white/70 hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <IconMenu2 size={24} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-action-gold transition text-sm font-medium py-3 border-b border-white/5 last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}