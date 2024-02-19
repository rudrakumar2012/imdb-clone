import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

function Movies() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=3207f49736140b7646c60c12e20d14ed&language=en-US&page=5`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, []);

  return (
    <div className="p-3 m-3">
      <div className="text-2xl font-bold text-center">Trending Movies</div>
      <div className="flex flew-row flex-wrap justify-around">
        {movies.map((movieObj)=>{
          return <MovieCard poster_path={movieObj.poster_path} title={movieObj.title}/>
        })}
      </div>
    </div>
  );
}

export default Movies;

// https://api.themoviedb.org/3/movie/popular?api_key=3207f49736140b7646c60c12e20d14ed&language=en-US&page=1
