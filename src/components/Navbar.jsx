import React from "react";
import Logo from "../movieLogo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex flex-col md:flex-row justify-between border space-x-8 items-center px-5 py-3">
      <img className="w-[80px]" src={Logo} alt="movieLogo" />
      <div className="space-x-7">
        <Link className="text-blue-500 text-2xl font-bold" to="/">
          Home
        </Link>
        <Link className="text-blue-500 text-2xl font-bold" to="/watchlist">
          Watchlist
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
