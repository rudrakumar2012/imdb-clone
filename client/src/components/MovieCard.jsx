import React from "react";

function MovieCard() {
  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer m-3 p-3"
      style={{
        backgroundImage: `url(https://images-cdn.ubuy.co.in/63b7b107d4159432fb5ec817-avengers-infinity-war-movie-poster.jpg)`,
      }}
    ></div>
  );
}

export default MovieCard;
