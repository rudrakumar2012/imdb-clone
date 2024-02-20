import React from "react";

function Watchlist() {
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
            <tr className="border-b-2">
              <td className="flex items-center px-5 py-5">
                <img
                  className="h-[6rem] 2-[10rem]"
                  src={`https://rukminim2.flixcart.com/image/850/1000/l3bx5e80/poster/p/x/m/small-kgf-poster-kgf-yash-movie-poster-for-room-kgf-chapter-2-original-imageh8qchumcz8k.jpeg?q=20&crop=false`}
                  alt=""
                />
                <div className="mx-10">KGF</div>
              </td>
              <td>8.5</td>
              <td>9</td>
              <td>Action</td>
              <td className="text-red-800 font-bold">Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
