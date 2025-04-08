import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Watchlist.css"; // Make sure to include this for styling

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load the watchlist from localStorage
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div>
      <header>
        <h1>Your Watchlist</h1>
        <button onClick={() => navigate("/")}>Back to Homepage</button>
      </header>
      <main>
        {watchlist.length === 0 ? (
          <p>Your watchlist is empty. Add some movies!</p>
        ) : (
          <div className="watchlist-container">
            {watchlist.map((movie) => (
              <div key={movie.id} className="watchlist-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width="100"
                />
                <div>
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                  <button onClick={() => removeFromWatchlist(movie.id)}>
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Watchlist;