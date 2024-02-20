import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Banner from "./components/Banner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [watchlist, setWatchList] = useState([]);

  const handleAddtoWatchlist = (movieObj)=>{
    const newWatchlist = [...watchlist, movieObj]
    setWatchList(newWatchlist)
    console.log(newWatchlist)
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner /> <Movies handleAddtoWatchlist={handleAddtoWatchlist} />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <>
                <Watchlist />
          
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
