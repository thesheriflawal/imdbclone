import React, { useState } from "react";
import info from "../../assets/info-solid.svg";
import star from "../../assets/star-regular.svg";
import eyes from "../../assets/eye-solid.svg";
import watchList from "../../assets/folder-plus-solid.svg";
import "./modal.css";

export default function Modal({ movie }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const rateMovie = (id, rating) => {
    console.log(`Rated movie ${id} with ${rating}`);
    // Implement your logic
  };

  const markAsWatched = (id) => {
    console.log(`Marked movie ${id} as watched`);
    // Implement your logic
  };

  const addToWatchlist = (id) => {
    console.log(`Added movie ${id} to watchlist`);
    // Implement your logic
  };

  return (
    <>
      <div className="i-circle info-icon" onClick={toggleModal}>
        <img
          className="btn-modal info-icon"
          src={info}
          width="10px"
          alt="info icon"
        />
      </div>

      {modal && movie && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <div className="movie-card-container">
              <div className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="poster"
                  alt={movie.title}
                />
                <div className="namePlusRating">
                  <span className="title">{movie.title}</span>
                  <div className="yearPlusDuration">
                    <span className="year">{movie.release_date}</span>
                    <span className="duration">1h 25m</span>
                    <span>R</span>
                  </div>
                  <div className="rating-details">
                    <span className="rating">{`⭐️ ${movie.vote_average.toFixed(
                      1
                    )}`}</span>
                    <span className="views">{`(${movie.popularity.toFixed(
                      1
                    )})`}</span>
                    <span className="rate">
                      <img src={star} width="10px" alt="rate icon" />{" "}
                      <button onClick={() => rateMovie(movie.id, 8)}>
                        Rate 8
                      </button>
                    </span>
                    <span className="watched">
                      <img src={eyes} width="10px" alt="watched icon" />{" "}
                      <button onClick={() => markAsWatched(movie.id)}>
                        Mark as watched
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="movie-summary">
              <span>{movie.overview}</span>
            </div>

            <div className="directorsAndStars">
              <p>Directors</p>
              <span className="directors-name">
                <a href="#">Unknown</a>
              </span>
              <p>Stars</p>
              <span className="directors-name">
                <a href="#">Unknown</a>
              </span>
            </div>

            <button onClick={toggleModal} className="close-modal">
              CLOSE
            </button>
          </div>
          <div className="addToWatchlist">
            <button onClick={() => addToWatchlist(movie.id)}>
              <img src={watchList} width="25px" alt="watchlist icon" />
              <span>Add To Watchlist</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
