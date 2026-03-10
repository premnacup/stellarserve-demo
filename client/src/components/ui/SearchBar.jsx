import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const SearchBar = () => {
  const { totalItems } = useCart();

  return (
    <>
      <div className="header">
        <div className="search-bar">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="location-section">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#2E2837"
          stroke="none"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <span>9 West 46th Street, New York City</span>
        <Link to="/cart" className="cart-icon">
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
      </div>
    </>
  );
};

export default SearchBar;
