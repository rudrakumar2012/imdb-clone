import { getMovie, getTrendingMovies } from "../../../lib/tmdb";
import { notFound } from "next/navigation";
import Image from "next/image";
import { TextReveal } from "../../../components/ui/text-reveal";



export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const movie = await getMovie(resolvedParams.id);

  if (!movie) {
    notFound();
  }

  const bgImage = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <div className="relative h-[80vh] w-full flex items-center justify-center">
        <Image src={bgImage} fill className="object-cover opacity-50 absolute inset-0" alt={movie.title} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center mt-20">
           <h1 className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 drop-shadow-2xl mb-6">
             {movie.title}
           </h1>
           <p className="text-xl md:text-2xl text-[#F5C518] bg-black/40 px-4 py-2 rounded-lg font-semibold">
              ★ {movie.vote_average.toFixed(1)} Rating
           </p>
        </div>
      </div>
      
      <div className="bg-black pb-40">
        <TextReveal text={movie.overview} />
      </div>
    </main>
  );
}
