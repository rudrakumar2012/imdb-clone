import React from "react";
import Logo from "../movieLogo.png";

function Navbar() {
  return (
    <div className="flex justify-between border space-x-8 items-center px-5 py-3">
      <img className="w-[80px]" src={Logo} alt="movieLogo" />
      <div className="space-x-7">
        <a className="text-blue-500 text-2xl font-bold" href="/">
          Home
        </a>
        <a className="text-blue-500 text-2xl font-bold" href="/">
          Watchlist
        </a>
      </div>
    </div>
  );
}

export default Navbar;
