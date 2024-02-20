import React from "react";

function MovieCard({ poster_path, title, handleAddtoWatchlist, movieObj }) {
  return (
    <div
      className="relative flex flex-col h-[45vh] w-[250px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer m-3"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path})`,
      }}
    >
      <div onClick={()=>(handleAddtoWatchlist(movieObj))} className="absolute top-4 right-4 flex items-center justify-center h-8 w-8 bg-gray-900/60 rounded-xl">
        &#128525;
      </div>
      <div className="flex-grow"></div>{" "}
      {/* This will take up all available space, pushing the title to the bottom */}
      <div className="text-white text-xl text-center w-full bg-gray-800/60 p-1 rounded-xl">
        {title}
      </div>
    </div>
  );
}

export default MovieCard;
