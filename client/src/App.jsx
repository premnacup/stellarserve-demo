import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import Search from "./pages/Search/Search.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import RestaurantMenu from "./pages/RestaurantMenu/RestaurantMenu.jsx";
import BottomNav from "./components/layout/BottomNav.jsx";
import ScrollToTop from "./components/layout/ScrollToTop.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/restaurants/:id" element={<RestaurantMenu />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
