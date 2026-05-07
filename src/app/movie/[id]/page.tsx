import { getMovie } from "../../../lib/tmdb";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TextReveal } from "../../../components/ui/text-reveal";
import { IconArrowLeft, IconClock, IconCalendar, IconStar } from "@tabler/icons-react";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const movie = await getMovie(resolvedParams.id);

  if (!movie) {
    notFound();
  }

  const bgImage = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const genres: { name: string }[] = (movie as any).genres || [];
  const runtime: number | undefined = (movie as any).runtime;
  const releaseDate: string | undefined = (movie as any).release_date;
  const tagline: string | undefined = (movie as any).tagline;

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <div className="relative h-[50vh] md:h-[80vh] w-full flex items-center justify-center">
        <Image src={bgImage} fill className="object-cover opacity-50 absolute inset-0" alt={movie.title} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Back button */}
        <Link
          href="/"
          className="absolute top-20 left-4 md:left-8 z-20 flex items-center gap-2 text-white/70 hover:text-white transition bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium"
        >
          <IconArrowLeft size={18} />
          Back
        </Link>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center mt-10 md:mt-20">
           <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 drop-shadow-2xl mb-4 md:mb-6">
             {movie.title}
           </h1>
           {tagline && (
             <p className="text-neutral-400 text-sm md:text-base italic mb-4">&ldquo;{tagline}&rdquo;</p>
           )}
           <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-neutral-300 text-sm md:text-xl">
             <span className="text-[#F5C518] bg-black/40 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5">
               <IconStar size={16} className="md:hidden" />
               ★ {movie.vote_average.toFixed(1)}
             </span>
             {runtime && (
               <span className="bg-black/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                 <IconClock size={16} className="hidden md:inline" />
                 {runtime} min
               </span>
             )}
             {releaseDate && (
               <span className="bg-black/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                 <IconCalendar size={16} className="hidden md:inline" />
                 {new Date(releaseDate).getFullYear()}
               </span>
             )}
           </div>
           {genres.length > 0 && (
             <div className="flex flex-wrap justify-center gap-2 mt-4">
               {genres.map((g) => (
                 <span key={g.name} className="text-xs md:text-sm border border-white/20 text-white/70 px-3 py-1 rounded-full">
                   {g.name}
                 </span>
               ))}
             </div>
           )}
        </div>
      </div>

      <div className="bg-black pb-20 md:pb-40">
        <TextReveal text={movie.overview} />
      </div>
    </main>
  );
}