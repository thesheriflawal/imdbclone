import { createRoot } from "react-dom/client";
import imdbLogo from "./assets/IMDB_Logo.png";
import imdbPro from "./assets/imdbpro.jpg";
import watchList from "./assets/folder-plus-solid.svg";
import navBar from "./assets/bars-solid.svg";
import info from "./assets/info-solid.svg";
import posterPics from "./assets/A1PaCX4oXjL._AC_SL1500_.jpg";
import star from "./assets/star-regular.svg";
import eyes from "./assets/eye-solid.svg";
import "./index.css";

const root = createRoot(document.getElementById("root"));

// API DETAILS
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2YxZjJlMmU2OGM5YzliNGNkODVkODIwMjQwN2JhZiIsIm5iZiI6MTc0MzYwNjg3OC4yODQ5OTk4LCJzdWIiOiI2N2VkNTQ1ZTNkOGU3NGU1MTgwMTMwYjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WVF7-OjP4ZSPwRBBwzyUvZ_I1mCCbs3z5PrtNHtQGSM";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Nav() {
  return (
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
                alt="imdb logo"
              />
              <span>Menu</span>
            </div>
          </li>

          <li>
            <div className="search-container">
              <select>
                <option value="all">
                  All{" "}
                  <span
                    style={{
                      display: "inline-block",
                      transform: "rotate(90deg)",
                    }}
                  ></span>
                </option>
                <option value="titles">Titles</option>
                <option value="tv-episodes">TV Episodes</option>
                <option value="agriculture">Agriculture</option>
                <option value="celebs">Companies</option>
                <option value="Keywords">Keywrods</option>
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
              alt="imdb logo"
            />
          </li>

          <li>
            <div className="watch-list">
              <img
                src={watchList}
                width="25px"
                className="nav-logo"
                alt="imdb logo"
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
  );
}

function Header() {
  return (
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
  );
}



function MainContent() {
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  return (
    <main>
      <div className="card">
        <div className="watchlist-display">
          <div className="movie-details">
            <div className="movie-card">
              <img src={posterPics} className="poster" alt="imdb logo" />
              <div className="namePlusRating">
                <span className="title">1. Black Panter</span>
                <div className="yearPlusDuration">
                  <span className="year">2013</span>
                  <span className="duration">1h 25m</span>
                  <span>R</span>
                </div>
                <div className="rating-details">
                  <span className="rating">⭐️ 6.2</span>
                  <span className="views">(27k)</span>
                  <span className="rate">
                    <img
                      src={star}
                      width="10px"
                      className="info-icon"
                      alt="imdb logo"
                    />{" "}
                    Rate
                  </span>
                  <span className="watched">
                    <img
                      src={eyes}
                      width="10px"
                      className="info-icon"
                      alt="imdb logo"
                    />
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
                alt="imdb logo"
              />
            </div>
          </div>
          <div className="movie-summary">
            <span>
              Two best friends see their trip of of a a lifetime take a a dark
              turn when one of them is struck by a mysterious affliction. Now,
              1D foreign land, they race to to uncover the source before it
              consumes him completely.
            </span>
          </div>
          <div className="directorsAndStars">
            <p>Directors</p>
            <span className="directors-name">
              <a href="#">Derek Lee</a>
              <a href="#">Clif Prowse</a>
            </span>
            <p>Stars</p>
            <span className="directors-name">
              <a href="#">Derek Lee</a>
              <a href="#">Clif Prowse</a>
            </span>
          </div>
        </div>

        <div className="horizontal-rule"></div>

        <div className="watchlist-display">
          <div className="movie-details">
            <div className="movie-card">
              <img src={posterPics} className="poster" alt="imdb logo" />
              <div className="namePlusRating">
                <span className="title">1. Black Panter</span>
                <div className="yearPlusDuration">
                  <span className="year">2013</span>
                  <span className="duration">1h 25m</span>
                  <span>R</span>
                </div>
                <div className="rating-details">
                  <span className="rating">⭐️ 6.2</span>
                  <span className="views">(27k)</span>
                  <span className="rate">
                    <img
                      src={star}
                      width="10px"
                      className="info-icon"
                      alt="imdb logo"
                    />{" "}
                    Rate
                  </span>
                  <span className="watched">
                    <img
                      src={eyes}
                      width="10px"
                      className="info-icon"
                      alt="imdb logo"
                    />
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
                alt="imdb logo"
              />
            </div>
          </div>
          <div className="movie-summary">
            <span>
              Two best friends see their trip of of a a lifetime take a a dark
              turn when one of them is struck by a mysterious affliction. Now,
              1D foreign land, they race to to uncover the source before it
              consumes him completely.
            </span>
          </div>
          <div className="directorsAndStars">
            <p>Directors</p>
            <span className="directors-name">
              <a href="#">Derek Lee</a>
              <a href="#">Clif Prowse</a>
            </span>
            <p>Stars</p>
            <span className="directors-name">
              <a href="#">Derek Lee</a>
              <a href="#">Clif Prowse</a>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <small>© 2024 Ziroll development. All rights reserved.</small>
    </footer>
  );
}

function Page() {
  return (
    <>
      <Nav />
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}

root.render(<Page />);
