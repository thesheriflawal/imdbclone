import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imdbLogo from "../assets/IMDB_Logo.png";
import imdbPro from "../assets/imdbpro.jpg";
import watchList from "../assets/folder-plus-solid.svg";
import navBar from "../assets/bars-solid.svg";
import info from "../assets/info-solid.svg";
import star from "../assets/star-regular.svg";
import eyes from "../assets/eye-solid.svg";
import tiktok from "../assets/tiktok-brands.svg";
import instagram from "../assets/instagram-brands.svg";
import twitter from "../assets/x-twitter-brands.svg";
import youtube from "../assets/youtube-brands.svg";
import facebook from "../assets/square-facebook-brands.svg";
import qrcode from "../assets/qrcode-solid.svg";
import toggleBtn from "../assets/toggle-on-solid.svg";
import amazon from "../assets/amazon-brands.svg";
import arrowLink from "../assets/arrow-up-right-from-square-solid.svg";
import "../styles/Homepage.css";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [genres, setGenres] = useState([]);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for showing modal
  const [modalMessage, setModalMessage] = useState(""); // State for modal message
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=a7f1f2e2e68c9c9b4cd85d8202407baf&language=en-US"
    )
      .then((res) => res.json())
      .then((json) => setGenres(json.genres))
      .catch((error) => console.error("Error fetching genres:", error));

    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  useEffect(() => {
    const fetchMovies = () => {
      let apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&api_key=a7f1f2e2e68c9c9b4cd85d8202407baf`;

      if (searchQuery.trim()) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&api_key=a7f1f2e2e68c9c9b4cd85d8202407baf`;
      }

      if (selectedGenre) {
        apiUrl += `&with_genres=${selectedGenre}`;
      }

      if (minRating > 0) {
        apiUrl += `&vote_average.gte=${minRating}`;
      }

      fetch(apiUrl)
        .then((res) => res.json())
        .then((json) => setMovies(json.results))
        .catch((error) => console.error("Error fetching movies:", error));
    };

    fetchMovies();
  }, [searchQuery, selectedGenre, minRating]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  const handleGenreChange = (e) => setSelectedGenre(e.target.value);
  const handleRatingChange = (e) => setMinRating(e.target.value);

  const handleSignIn = () => navigate("/auth");

  const addToWatchlist = (movieId) => {
    if (!user) {
      // Show modal if user is not logged in
      setModalMessage("You must be logged in to add movies to the watchlist.");
      setShowModal(true);
      return;
    }

    if (watchlist.includes(movieId)) return;

    const updatedWatchlist = [...watchlist, movieId];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const isInWatchlist = (movieId) => watchlist.includes(movieId);

  const closeModal = () => setShowModal(false);
  const redirectToSignup = () => {
    closeModal();
    navigate("/auth"); // Redirect to the signup page
  };

  return (
    <div>
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
              <form onSubmit={handleSearchSubmit} className="search-container">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search movies..."
                />
                <button type="submit">🔍</button>
              </form>
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
              {user ? (
                <span>{user.username}</span>
              ) : (
                <span className="sign-in-button" onClick={handleSignIn}>
                  Sign In
                </span>
              )}
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

      <div className="popup-bg"></div>

      <main>
        <div className="filters">
          <label htmlFor="genre">Genre:</label>
          <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <label htmlFor="rating">Min Rating:</label>
          <select id="rating" value={minRating} onChange={handleRatingChange}>
            <option value={0}>All Ratings</option>
            <option value={5}>5⭐ & above</option>
            <option value={6}>6⭐ & above</option>
            <option value={7}>7⭐ & above</option>
            <option value={8}>8⭐ & above</option>
          </select>
        </div>

        <div className="card">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
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
                        <span className="title">{`${index + 1}. ${
                          movie.title
                        }`}</span>
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
                            <img
                              src={star}
                              width="10px"
                              className="info-icon"
                              alt="rate icon"
                            />{" "}
                            <button onClick={() => rateMovie(movie.id, 8)}>
                              Rate 8
                            </button>
                          </span>
                          <span className="watched">
                            <img
                              src={eyes}
                              width="10px"
                              className="info-icon"
                              alt="watched icon"
                            />{" "}
                            <button onClick={() => markAsWatched(movie.id)}>
                              Mark as watched
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="addToWatchlist">
                      <button onClick={() => addToWatchlist(movie.id)}>
                        <img
                          src={watchList}
                          width="25px"
                          className="nav-logo"
                          alt="watchlist icon"
                        />
                        <span>
                          {isInWatchlist(movie.id)
                            ? "In Watchlist"
                            : "Add To Watchlist"}
                        </span>
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
            ))
          ) : (
            <p>No movies found. Try a different search or filter!</p>
          )}
        </div>
      </main>

      {/* Modal for Custom Alert */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={redirectToSignup}>Go to Signup</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <footer>
        <div>
          <button className="sign-in-access">Sign in for more access</button>
          <div className="imdb-social-download-link">
            <div className="footer-socials">
              <div className="socials">
                <p>Follow IMDB on social</p>
                <div className="social-icons">
                  <a href="#">
                    <img
                      src={tiktok}
                      width="10px"
                      className="info-icon"
                      alt="tiktok icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src={instagram}
                      width="10px"
                      className="info-icon"
                      alt="instagram icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src={twitter}
                      width="10px"
                      className="info-icon"
                      alt="twitter icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src={youtube}
                      width="10px"
                      className="info-icon"
                      alt="youtube icon"
                    />
                  </a>
                  <a href="#">
                    <img
                      src={facebook}
                      width="10px"
                      className="info-icon"
                      alt="facebook icon"
                    />
                  </a>
                </div>
              </div>
              <div className="qrcode">
                <div className="qr-code-details">
                  <p>Get the IMDb app</p>
                  <span>For Android and IOS</span>
                </div>
                <img src={qrcode} className="info-icon" alt="youtube icon" />
              </div>
            </div>
          </div>
          <div className="page-links">
            <a href="#">
              Help <img src={arrowLink} width="10px" alt="" />
            </a>
            <a href="#">
              Site Index <img src={arrowLink} width="10px" alt="" />
            </a>
            <a href="#">
              IMDbPro <img src={arrowLink} width="10px" alt="" />
            </a>
            <a href="#">
              Box Office Mojo <img src={arrowLink} width="10px" alt="" />
            </a>
            <a href="#">
              License IMDb Data <img src={arrowLink} width="10px" alt="" />
            </a>
            <a href="#">Press Room</a>
            <a href="#">
              Advertising <img src={arrowLink} width="10px" alt="" />
            </a>
            <a href="#">
              Jobs <img src={arrowLink} width="10px" alt="" />
            </a>
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">
              <img src={toggleBtn} width="20px" alt="" /> Your Ads Privacy
              Choices
            </a>
          </div>
          <div className="footer-ending">
            <p>
              an <img src={amazon} width="10px" alt="" />
              mazon company
            </p>
            <small>
              © 2024 Sherif & team development. All rights reserved.
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
