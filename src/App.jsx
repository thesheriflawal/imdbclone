// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import "./i18n.js";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Auth from "./components/Auth";
//import Watchlist from "./components/Watchlist";
import "./i18n"; // Import the i18n configuration (add this line)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<Auth />} />
      
    </Routes>
  );
}

export default App;
