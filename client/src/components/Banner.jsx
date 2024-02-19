import React from "react";

function Banner() {
  return (
    <div
      className="h-[30vh] md:h-[80vh] bg-contain bg-no-repeat bg-center flex items-end"
      style={{
        backgroundImage: `url(https://v3img.voot.com/resizeMedium,w_1090,h_613/v3Storage/assets/bhediya-16x9-1687776267402.jpg)`,
      }}
    >
      <div className="text-white text-xl text-center w-full bg-gray-800/60 p-2">
        Bhediya
      </div>
    </div>
  );
}

export default Banner;
