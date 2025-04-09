import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Watchlist.css"; // Ensure this file exists and is styled

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="watchlist-section">
      <h2>Your Watchlist</h2>
      <button className="go-back-button" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
      <div className="watchlist-container">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <div key={movie.id} className="watchlist-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="watchlist-poster"
              />
              <div className="watchlist-details">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <button onClick={() => removeFromWatchlist(movie.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;