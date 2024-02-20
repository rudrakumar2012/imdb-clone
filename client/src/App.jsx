import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Banner from "./components/Banner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [watchlist, setWatchList] = useState([]);

  const handleAddtoWatchlist = (movieObj) => {
    const newWatchlist = [...watchlist, movieObj];
    localStorage.setItem('moviesApp', JSON.stringify(newWatchlist))
    setWatchList(newWatchlist);
    console.log(newWatchlist);
  };

  const handleRemoveFromWatchlist = (movieObj) => {
    const filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });
    setWatchList(filteredWatchlist);
  };

  useEffect(()=>{
    const moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if(!moviesFromLocalStorage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  },[])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />{" "}
                <Movies
                  watchlist={watchlist}
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <>
                <Watchlist watchlist={watchlist}/>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
