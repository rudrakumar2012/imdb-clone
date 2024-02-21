import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios

function Banner() {
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [bannerTitle, setBannerTitle] = useState("");

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=3207f49736140b7646c60c12e20d14ed&language=en-US"
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
      className="banner"
      style={{
        backgroundImage: `url(${bannerImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%", // Ensure the banner takes up the full width
        height: "100vh", // Adjust the height as needed
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
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
