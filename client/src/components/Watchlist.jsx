import { React, useEffect, useState } from "react";
import genreids from "../utility/genre";

function Watchlist({ watchlist, setWatchList, handleRemoveFromWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genre"]);
  const [currGenre, setCurrGenre] = useState("All Genre");

  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  const sortIncreasing = () => {
    const sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList([...sortedIncreasing]);
  };

  const sortDecreasing = () => {
    const sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList([...sortedDecreasing]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genre", ...temp]);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre, index) => {
          return (
            <div
              key={index}
              onClick={() => handleFilter(genre)}
              className={
                currGenre == genre
                  ? "flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4 cursor-pointer"
                  : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-300 rounded-xl text-white font-bold mx-4 cursor-pointer"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center my-4">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4 rounded-sm"
          placeholder="Search movie"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <div className="flex justify-center">
                <div className="p-2">
                  <i
                    onClick={sortIncreasing}
                    className="fa-solid fa-arrow-up cursor-pointer"
                  ></i>
                </div>
                <th className="p-2">Ratings</th>
                <div className="p-2">
                  <i
                    onClick={sortDecreasing}
                    className="fa-solid fa-arrow-down cursor-pointer"
                  ></i>
                </div>
              </div>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist
              .filter((movieObj) => {
                if (currGenre == "All Genre") {
                  return true;
                } else {
                  return genreids[movieObj.genre_ids[0]] == currGenre;
                }
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr key={movieObj.id} className="border-b-2">
                    <td className="flex items-center px-5 py-5">
                      <img
                        className="h-[6rem] 2-[10rem]"
                        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieObj.poster_path}`}
                        alt=""
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>handleRemoveFromWatchlist(movieObj)} className="text-red-800 bg-red-100 font-bold cursor-pointer">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
