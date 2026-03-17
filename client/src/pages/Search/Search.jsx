import { useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/api";
import RestaurantCard from "../../components/restaurant/RestaurantCard";
import SearchBar from "../../components/ui/SearchBar";
import "../Home/Home.css";

const Search = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    setLoading(true);
    api
      .get("/restaurants")
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredRestaurants = useMemo(() => {
    if (!query.trim()) return restaurants;
    const lowerQuery = query.toLowerCase();
    return restaurants.filter(
      (res) =>
        res.name.toLowerCase().includes(lowerQuery) ||
        res.category?.toLowerCase().includes(lowerQuery) ||
        res.address?.toLowerCase().includes(lowerQuery)
    );
  }, [restaurants, query]);

  const handleSearch = (newQuery) => {
    if (newQuery) {
      setSearchParams({ q: newQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="home-container">
      <div
        className="header"
        style={{
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            padding: "0",
            display: "flex",
            alignItems: "center",
            color: "#2E2837",
          }}
        >
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
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "0" }}>
          {query ? `Results for "${query}"` : "All Restaurants"}
        </h2>
      </div>

      <SearchBar onSearch={handleSearch} initialValue={query} />

      <div className="restaurant-list" style={{ marginTop: "24px" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            Searching for deliciousness...
          </p>
        ) : filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((res) => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))
        ) : (
          <div
            className="empty-state"
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#666",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ color: "#2E2837", marginBottom: "8px" }}>
              No results found for "{query}"
            </h3>
            <p>Try searching for something else, like "Pizza" or "Burger"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
