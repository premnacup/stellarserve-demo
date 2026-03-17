import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import Search from "./pages/Search/Search.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Checkout from "./pages/Cart/Checkout.jsx";
import OrderSuccess from "./pages/Cart/OrderSuccess.jsx";
import OrderHistory from "./pages/Profile/OrderHistory.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import RestaurantMenu from "./pages/RestaurantMenu/RestaurantMenu.jsx";
import RestaurantLogin from "./pages/RestaurantAdmin/Login.jsx";
import RestaurantRegister from "./pages/RestaurantAdmin/Register.jsx";
import RestaurantDashboard from "./pages/RestaurantAdmin/Dashboard.jsx";
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
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/restaurants/:id" element={<RestaurantMenu />} />
        <Route path="/restaurant/login" element={<RestaurantLogin />} />
        <Route path="/restaurant/register" element={<RestaurantRegister />} />
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
