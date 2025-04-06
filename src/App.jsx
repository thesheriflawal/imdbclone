import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Auth from "./components/Auth";
//import Watchlist from "./components/Watchlist";
//import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
     
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
