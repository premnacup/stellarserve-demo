import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import CartContext from "../../context/CartContext";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useContext(CartContext);
  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get(`/restaurants/${id}`),
      api.get(`/restaurants/${id}/menu`),
    ])
      .then(([resDetails, resMenu]) => {
        setRestaurant(resDetails.data);
        setMenuItems(resMenu.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
      },
      true,
    );
  };

  if (loading) return <div className="menu-page">Loading menu...</div>;

  return (
    <div className="menu-page">
      <header className="menu-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span>◀</span> Back
        </button>
        <h1 className="restaurant-title">
          {restaurant?.name || "Restaurant Name"}
        </h1>
        <Link to="/cart" className="cart-link">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {totalItems > 0 && (
            <span className="badge">{totalItems > 9 ? "10+" : totalItems}</span>
          )}
        </Link>
      </header>

      <div className="menu-item-list">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item-card">
            <div className="menu-item-thumbnail"></div>
            <div className="menu-item-info">
              <div className="stars-row">★★★★★</div>
              <h3 className="menu-item-name">{item.name}</h3>
              <span className="menu-item-price">Price: ฿{item.price}</span>
            </div>
            <div className="menu-item-actions">
              <button className="add-btn" onClick={() => handleAddToCart(item)}>
                Add to cart
              </button>
              <button
                className="order-btn"
                onClick={() => {
                  handleAddToCart(item);
                  navigate("/cart");
                }}
              >
                Order now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="menu-footer">
        <button className="proceed-btn" onClick={() => navigate("/cart")}>
          Proceed to order
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;
