import restaurantPlaceholder from "../../assets/images/restaurant.png";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="restaurant-card"
      style={{ textDecoration: "none", color: "inherit", display: "flex" }}
    >
      <div className="restaurant-img">
        <img src={restaurantPlaceholder} alt={restaurant.name} />
      </div>
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <div className="address">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {restaurant.address || "13th Street, 46 W 12th St, NY"}
        </div>
        <div className="meta">
          <span>🕒 3 min - 1.1 km</span>
          <div className="stars">
            {"★★★★★".split("").map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
