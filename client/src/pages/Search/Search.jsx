import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import RestaurantCard from "../../components/restaurant/RestaurantCard";
import SearchBar from "../../components/ui/SearchBar";
import "../Home/Home.css";

const Search = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <div className="header" style={{ marginBottom: "16px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ←
        </button>
        <h2 style={{ fontSize: "18px", fontWeight: "700" }}>All Restaurants</h2>
      </div>

      <SearchBar />

      <div className="restaurant-list" style={{ marginTop: "24px" }}>
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
};

export default Search;
