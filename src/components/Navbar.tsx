import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";

export function Navbar() {
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
        <div className="flex items-center text-white/70 hover:text-white transition cursor-pointer">
           <IconSearch size={20} />
        </div>
      </div>
    </nav>
  );
}
