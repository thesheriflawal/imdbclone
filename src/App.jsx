import { useEffect, useState } from "react";
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
      {/* NAV */}
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
                  alt="menu"
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
                alt="imdb pro"
              />
            </li>
            <li>
              <div className="watch-list">
                <img
                  src={watchList}
                  width="25px"
                  className="nav-logo"
                  alt="watchlist"
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

      {/* HEADER */}
      <div className="movie-watchlist-header">
        <h1>Movies watchlist</h1>
        <p>
          by <span>Sherif Lawal</span>, <span>Obilana Ibrahim</span>,{" "}
          <span>Aribisala Oluwasola</span>, <span>Rex Lawrence</span>
        </p>
        <ul>
          <li>Created 3rd April, 2025</li>
          <li>Modified April, 2025</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <main>
        <div className="card">
          {movies.map((movie, index) => (
            <div key={movie.id}>
              <div className="watchlist-display">
                <div className="movie-details">
                  <div className="movie-card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${
                        movie.poster_path || ""
                      }`}
                      className="poster"
                      alt={movie.title}
                    />
                    <div className="namePlusRating">
                      <span className="title">
                        {index + 1}. {movie.title}
                      </span>
                      <div className="yearPlusDuration">
                        <span className="year">
                          {movie.release_date?.split("-")[0]}
                        </span>
                        <span className="duration">1h 45m</span>
                        <span>PG-13</span>
                      </div>
                      <div className="rating-details">
                        <span className="rating">⭐️ {movie.vote_average}</span>
                        <span className="views">
                          ({movie.vote_count} votes)
                        </span>
                        <span className="rate">
                          <img
                            src={star}
                            width="10px"
                            className="info-icon"
                            alt="rate"
                          />{" "}
                          Rate
                        </span>
                        <span className="watched">
                          <img
                            src={eyes}
                            width="10px"
                            className="info-icon"
                            alt="watched"
                          />{" "}
                          Mark as watched
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="i-circle">
                    <img
                      src={info}
                      width="10px"
                      className="info-icon"
                      alt="info"
                    />
                  </div>
                </div>

                <div className="movie-summary">
                  <span>{movie.overview}</span>
                </div>

                <div className="directorsAndStars">
                  <p>Note: No real director/stars info from TMDb basic call</p>
                  <button onClick={() => addToWatchlist(movie)}>
                    + Add to Watchlist
                  </button>
                </div>
              </div>
              <div className="horizontal-rule"></div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer>
        <small>© 2024 Sherif & team development. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default MovieWatchlist;
