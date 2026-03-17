import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import "../Auth/Auth.css";

const RestaurantRegister = () => {
  const [formData, setFormData] = useState({
    existing_restaurant_id: "",
    restaurant_name: "",
    owner_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    category: "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/restaurants")
      .then(res => setRestaurants(res.data))
      .catch(err => console.error("Failed to load restaurants:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const registerRes = await api.post("/restaurant-admins/register", {
        existing_restaurant_id: formData.existing_restaurant_id,
        restaurant_name: formData.restaurant_name,
        owner_name: formData.owner_name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        category: formData.category
      });

      if (registerRes.data) {
        navigate("/restaurant/login");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: '600px', marginTop: '40px', marginBottom: '40px' }}>
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

      <h1 className="auth-title">Register Restaurant</h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem" }}>
        Join StellarServe as a restaurant partner
      </p>

      <form className="auth-form" onSubmit={handleSignUp}>
        <div className="input-group">
          <select 
            name="existing_restaurant_id" 
            className="auth-input" 
            value={formData.existing_restaurant_id} 
            onChange={handleChange}
            style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1" }}
          >
            <option value="">-- Create New Restaurant --</option>
            {restaurants.map(r => (
              <option key={r.id} value={r.id}>{r.name} - {r.address}</option>
            ))}
          </select>
        </div>

        {!formData.existing_restaurant_id && (
          <>
            <div className="input-group">
              <input
                type="text"
                name="restaurant_name"
                className="auth-input"
                placeholder="Restaurant Name"
                required={!formData.existing_restaurant_id}
                value={formData.restaurant_name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="address"
                className="auth-input"
                placeholder="Restaurant Address"
                required={!formData.existing_restaurant_id}
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <select 
                name="category" 
                className="auth-input" 
                value={formData.category} 
                onChange={handleChange}
                required={!formData.existing_restaurant_id}
                style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid #cbd5e1" }}
              >
                <option value="">Select Category</option>
                <option value="Drink">Drink</option>
                <option value="Food">Food</option>
                <option value="Cake">Cake</option>
                <option value="Snack">Snack</option>
              </select>
            </div>
          </>
        )}
        
        <div className="input-group">
          <input
            type="text"
            name="owner_name"
            className="auth-input"
            placeholder="Owner Full Name"
            required
            value={formData.owner_name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            className="auth-input"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="tel"
            name="phone"
            className="auth-input"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            className="auth-input"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            className="auth-input"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-auth-submit" disabled={loading}>
          {loading ? "Registering..." : "Register Restaurant"}
        </button>
      </form>

      <div className="auth-footer-links">
        <Link to="/restaurant/login" className="switch-auth">
          Already a partner? Sign In
        </Link>
      </div>
    </div>
  );
};

export default RestaurantRegister;
