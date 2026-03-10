import { useState, useEffect } from "react";
import api from "../../api/api";
import RestaurantCard from "../../components/restaurant/RestaurantCard";
import "../Home/Home.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      api
        .get(`/favorites/${user.id}`)
        .then((res) => {
          setFavorites(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching favorites:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  return (
    <div className="home-container">
      <div className="section-header">
        <h2>Favorites</h2>
      </div>

      {loading ? (
        <p style={{ padding: "0 16px" }}>Loading favorites...</p>
      ) : favorites.length > 0 ? (
        <div className="restaurant-list">
          {favorites.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <p style={{ padding: "0 16px" }}>
          You haven't favorited any restaurants yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
