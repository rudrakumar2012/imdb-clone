import React from "react";

function Watchlist({ watchlist }) {
  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        <div className="flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4">
          Action
        </div>
        <div className="flex justify-center items-center h-[3rem] w-[9rem] bg-gray-300 rounded-xl text-white font-bold">
          Action
        </div>
      </div>

      <div className="flex justify-center my-4">
        <input
          type="text"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4 rounded-sm"
          placeholder="Search movie"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th>Ratings</th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((movieObj) => {
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
                  <td>Action</td>
                  <td className="text-red-800 font-bold">Delete</td>
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
