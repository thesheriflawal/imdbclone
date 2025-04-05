import { useEffect, useState } from "react";
import imdbLogo from "./assets/IMDB_Logo.png";
import imdbPro from "./assets/imdbpro.jpg";
import watchList from "./assets/folder-plus-solid.svg";
import navBar from "./assets/bars-solid.svg";
import info from "./assets/info-solid.svg";
import star from "./assets/star-regular.svg";
import eyes from "./assets/eye-solid.svg";

import "./index.css";

const MovieWatchlist = () => {
  const [movies, setMovies] = useState([]);

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=a7f1f2e2e68c9c9b4cd85d8202407baf"
    )
      .then((res) => res.json())
      .then((json) => {
        console.log("Fetched movies:", json.results);
        setMovies(json.results);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  useEffect(() => {
    console.log("Component mounted");
    getMovie();
  }, []);

  return (
    <div>
      {/* ////////////////////////////NAV//////////////////////////// */}
      <header className="header">
        <img
          src={imdbLogo}
          width="100px"
          height="60px"
          className="nav-logo"
          alt="imdb logo"
        />

        <nav>
          <ul>
            <li>
              <div className="menu">
                <img
                  src={navBar}
                  width="20px"
                  className="nav-logo"
                  alt="menu icon"
                />
                <span>Menu</span>
              </div>
            </li>

            <li>
              <div className="search-container">
                <select>
                  <option value="all">All</option>
                  <option value="titles">Titles</option>
                  <option value="tv-episodes">TV Episodes</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="celebs">Companies</option>
                  <option value="Keywords">Keywords</option>
                  <option value="advanced-search">Advanced Search</option>
                </select>
                <input type="text" placeholder="Search..." />
                <button>🔍</button>
              </div>
            </li>

            <li>
              <img
                src={imdbPro}
                width="60px"
                className="nav-logo"
                alt="imdb pro logo"
              />
            </li>

            <li>
              <div className="watch-list">
                <img
                  src={watchList}
                  width="25px"
                  className="nav-logo"
                  alt="watchlist icon"
                />
                <span>Watchlist</span>
              </div>
            </li>

            <li>
              <span>Sign In</span>
            </li>

            <li>
              <div className="lang">
                <span>En</span>
                <span className="arrow-sign">&gt;</span>
              </div>
            </li>
          </ul>
        </nav>
      </header>

      {/* ////////////////////////////HEADER//////////////////////////// */}
      <div className="movie-watchlist-header">
        <h1>Movies Watchlist</h1>
        <p>
          by <span>Sherif Lawal</span>, <span>Obilana Ibrahim</span>,{" "}
          <span>Aribisala Oluwasola</span>, <span>Rex Lawrence</span>
        </p>
        <ul>
          <li>Created 3rd April, 2025</li>
          <li>Modified April, 2025</li>
        </ul>
      </div>

      {/* ////////////////////////////MAIN CONTENT//////////////////////////// */}
      <main>
        <div className="card">
          {movies.map((movie, index) => (
            <div className="watchlist-display" key={movie.id}>
              <div className="movie-details">
                <div className="movie-card-container">
                  <div className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="poster"
                      alt={movie.title}
                    />
                    <div className="namePlusRating">
                      {" "}
                      <span className="title">{`${index + 1}. ${
                        movie.title
                      }`}</span>
                      <div className="yearPlusDuration">
                        <span className="year">{movie.release_date}</span>
                        <span className="duration">1h 25m</span>
                        <span>R</span>
                      </div>
                      <div className="rating-details">
                        <span className="rating">{`⭐️ ${movie.vote_average}`}</span>
                        <span className="views">{`(${movie.popularity})`}</span>
                        <span className="rate">
                          <img
                            src={star}
                            width="10px"
                            className="info-icon"
                            alt="rate icon"
                          />{" "}
                          Rate
                        </span>
                        <span className="watched">
                          <img
                            src={eyes}
                            width="10px"
                            className="info-icon"
                            alt="watched icon"
                          />
                          Mark as watched
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="addToWatchlist">
                    <button>
                      <img
                        src={watchList}
                        width="25px"
                        className="nav-logo"
                        alt="watchlist icon"
                      />
                      <span>Add To Watchlist</span>
                    </button>
                  </div>
                </div>
                <div className="i-circle">
                  <img
                    src={info}
                    width="10px"
                    className="info-icon"
                    alt="info icon"
                  />
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

              <div className="horizontal-rule"></div>
            </div>
          ))}
        </div>
      </main>

      {/* ////////////////////////////FOOTER//////////////////////////// */}
      <footer>
        <div>
          <small>© 2024 Sherif & team development. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
};

export default MovieWatchlist;
