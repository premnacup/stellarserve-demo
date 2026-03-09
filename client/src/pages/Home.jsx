import { useEffect, useState } from "react";
import api from "../api/api";
import "./Home.css";

// Components
import SearchBar from "../components/SearchBar";
import OfferBanner from "../components/OfferBanner";
import CategoryIcons from "../components/CategoryIcons";
import FoodCategories from "../components/FoodCategories";
import RestaurantCard from "../components/RestaurantCard";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api
      .get("/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <SearchBar />
      <OfferBanner />
      <CategoryIcons />
      <FoodCategories />
      {/* Near Me Section */}
      <div className="section-header">
        <h2>Near Me</h2>
        <span>View all</span>
      </div>
      <div className="restaurant-list">
        {restaurants.length > 0 ? (
          restaurants.map((res) => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))
        ) : (
          <p>Loading restaurants...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
