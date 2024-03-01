import React from "react";

function MovieCard({
  poster_path,
  title,
  watchlist,
  handleRemoveFromWatchlist,
  handleAddtoWatchlist,
  movieObj,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="relative flex flex-col h-[40vh] md:h-[35vh] w-3/4 md:w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer mx-auto"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)}
          className="absolute top-4 right-4 flex items-center justify-center h-8 w-8 bg-gray-900/60 rounded-xl"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="absolute top-4 right-4 flex items-center justify-center h-8 w-8 bg-gray-900/60 rounded-xl"
        >
          &#128525;
        </div>
      )}
      <div className="flex-grow"></div>{" "}
      {/* This will take up all available space, pushing the title to the bottom */}
      <div className="text-white text-xl text-center w-full bg-gray-800/60 p-1 rounded-xl">
        {title}
      </div>
    </div>
  );
}

export default MovieCard;
