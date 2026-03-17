import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import "../Auth/Auth.css";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/restaurant-admins/login", { email, password });

      if (response.data && response.data.admin) {
        localStorage.setItem("restaurantAdmin", JSON.stringify(response.data.admin));
        navigate("/restaurant/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "Login failed. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back
        </button>
      </div>

      <h1 className="auth-title">Restaurant Sign In</h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem" }}>
        Manage your business on StellarServe
      </p>

      <form className="auth-form" onSubmit={handleSignIn}>
        <div className="input-group">
          <input
            type="email"
            className="auth-input"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-auth-submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="auth-footer-links">
        <Link to="/restaurant/register" className="switch-auth">
          Don't have a restaurant account? Register
        </Link>
      </div>
    </div>
  );
};

export default RestaurantLogin;
