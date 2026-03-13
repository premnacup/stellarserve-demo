import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [isFavorited, setIsFavorited] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDetails, resMenu, resReviews] = await Promise.all([
          api.get(`/restaurants/${id}`),
          api.get(`/restaurants/${id}/menu`),
          api.get(`/reviews/restaurant/${id}`),
        ]);
        setRestaurant(resDetails.data);
        setMenuItems(resMenu.data);
        setReviews(resReviews.data);

        if (user) {
          const resFavs = await api.get(`/favorites/${user.id}`);
          const isFav = resFavs.data.some((fav) => fav.id === parseInt(id));
          setIsFavorited(isFav);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user?.id]);

  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Please sign in to favorite restaurants");
      return;
    }

    try {
      if (isFavorited) {
        await api.delete(`/favorites/${user.id}/${id}`);
        setIsFavorited(false);
      } else {
        await api.post("/favorites", {
          customer_id: user.id,
          restaurant_id: parseInt(id),
        });
        setIsFavorited(true);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        restaurant_id: parseInt(id),
      },
      true,
    );
  };

  if (loading) return <div className="menu-page">Loading menu...</div>;

  const avgRating = calculateAverageRating();

  return (
    <div className="menu-page">
      <header className="menu-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span>◀</span> Back
        </button>
        <h1 className="restaurant-title">
          {restaurant?.name || "Restaurant Name"}
        </h1>
        <button className="fav-btn" onClick={handleToggleFavorite}>
          {isFavorited ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffb800">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          )}
        </button>
      </header>

      <section className="reviews-summary-section">
        <div className="summary-info">
          <span className="rating-badge">⭐ {avgRating || "0.0"}</span>
          <span className="review-count">({reviews.length} reviews)</span>
        </div>
        <button
          className="toggle-reviews-btn"
          onClick={() => setShowReviews(!showReviews)}
        >
          {showReviews ? "Hide Reviews" : "View Reviews"}
        </button>

        {showReviews && (
          <div className="reviews-dropdown">
            {reviews.length > 0 ? (
              <div className="recent-reviews">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="mini-review-card">
                    <div className="review-top">
                      <span className="reviewer-name">
                        {review.customer_name || "Anonymous"}
                      </span>
                      <span className="review-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <span className="review-date">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews-msg">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        )}
      </section>

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
          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems > 10 ? "10+" : totalItems}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;
