import React from "react";

function MovieCard({poster_path, title}) {
  return (
    <div
      className="flex flex-col h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer m-3"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path})`,
      }}
    >
      <div className="flex-grow"></div> {/* This will take up all available space, pushing the title to the bottom */}
      <div className="text-white text-xl text-center w-full bg-gray-800/60 p-1 rounded-xl">
        {title}
      </div>
    </div>
  );
}

export default MovieCard;
