import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios

function Banner() {
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [bannerTitle, setBannerTitle] = useState("");
  const apiKey = import.meta.env.VITE_REACT_MOVIE_API_KEY;

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
        );
        const randomMovie =
          response.data.results[
            Math.floor(Math.random() * response.data.results.length)
          ];
        setBannerImageUrl(
          `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
        );
        setBannerTitle(randomMovie.title);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchRandomMovie();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div
    className="banner h-[50vh] md:h-[60vh] lg:h-[90vh] bg-center bg-cover flex flex-col justify-end"
      style={{
        backgroundImage: `url(${bannerImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div className="text-white text-xl text-center w-full bg-gray-800/60 p-2">
        {bannerTitle}
      </div>
    </div>
  );
}

export default Banner;
