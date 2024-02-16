import React from "react";
import MovieCard from "./MovieCard";

function Movies() {
  return (
    <div className="p-3 m-3">
      <div className="text-2xl font-bold text-center">Trending Movies</div>
      <div className="flex flew-row flex-wrap justify-around">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        
      </div>
    </div>
  );
}

export default Movies;
