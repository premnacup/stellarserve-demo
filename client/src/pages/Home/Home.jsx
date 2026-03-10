import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Home.css";

// Components
import SearchBar from "../../components/ui/SearchBar";
import OfferBanner from "../../components/ui/OfferBanner";
import CategoryIcons from "../../components/restaurant/CategoryIcons";
import FoodCategories from "../../components/restaurant/FoodCategories";
import RestaurantCard from "../../components/restaurant/RestaurantCard";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter logic:
  // - If category selected: show all in that category
  // - If no category: show top 3
  const filteredRestaurants = activeCategory
    ? restaurants.filter((res) => res.category === activeCategory)
    : restaurants.slice(0, 3);

  return (
    <div className="home-container">
      <SearchBar />
      <OfferBanner />
      <CategoryIcons
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />
      <FoodCategories />
      {/* Near Me Section */}
      <div className="section-header">
        <h2>Near Me</h2>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/search")}>
          View all
        </span>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((res) => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))
        ) : (
          <p>No restaurants found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
