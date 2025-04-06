// src/pages/Homepage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imdbLogo from "../assets/IMDB_Logo.png";
import imdbPro from "../assets/imdbpro.jpg";
import watchList from "../assets/folder-plus-solid.svg";
import navBar from "../assets/bars-solid.svg";
import info from "../assets/info-solid.svg";
import star from "../assets/star-regular.svg";
import eyes from "../assets/eye-solid.svg";
import "../styles/Homepage.css";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [genres, setGenres] = useState([]);
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const [credits, setCredits] = useState({});

  // This useEffect fetches genres and sets up user and watchlist state
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

  // This useEffect fetches movies based on search query, genre, and rating
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

  // This useEffect fetches credits (directors and stars) for each movie and updates state
  useEffect(() => {
    const fetchAllCredits = async () => {
      const creditsToFetch = movies.filter((movie) => !credits[movie.id]);

      const creditPromises = creditsToFetch.map(async (movie) => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=a7f1f2e2e68c9c9b4cd85d8202407baf`
          );
          const data = await response.json();
          const director = data.crew.find((person) => person.job === "Director");
          const stars = data.cast.slice(0, 2).map((actor) => actor.name).join(", ");

          setCredits((prev) => ({
            ...prev,
            [movie.id]: {
              director: director ? director.name : "Unknown",
              stars: stars || "Unknown",
            },
          }));
        } catch (error) {
          console.error(`Error fetching credits for movie ${movie.id}:`, error);
        }
      });

      await Promise.all(creditPromises);
    };

    if (movies.length > 0) {
      fetchAllCredits();
    }
  }, [movies]);

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
    navigate("/auth");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const goToWatchlist = () => {
    navigate("/watchlist");
  };

  const goToMovieDetail = () => {
    navigate("/movie-detail");
  };

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
              <div className="watch-list" onClick={goToWatchlist}>
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
                <span> Hi, {user.username}</span>
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
            {user && (
              <li>
                <span className="sign-in-button" onClick={handleLogout}>
                  Log out
                </span>
              </li>
            )}
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

      {/* ////////////////////////////MAIN//////////////////////////// */}
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
                          <span className="rating">{`⭐️ ${movie.vote_average}`}</span>
                          <span className="views">{`(${movie.popularity})`}</span>
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
                            : "Add to Watchlist"}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="credits">
                    <span className="director">Director: {credits[movie.id]?.director}</span>
                    <span className="stars">Stars: {credits[movie.id]?.stars}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No movies found. Try a differnt search or filter!</p>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <p>{modalMessage}</p>
          <button onClick={redirectToSignup}>Sign Up</button>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
