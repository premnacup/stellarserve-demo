import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import "./Auth.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // 1. Register the user
      const registerRes = await api.post("/customers/register", {
        name,
        email,
        password,
        role: "customer",
      });

      if (registerRes.data) {
        // 2. Automatically log in after registration
        const loginRes = await api.post("/customers/login", {
          email,
          password,
        });

        if (loginRes.data && loginRes.data.user) {
          localStorage.setItem("user", JSON.stringify(loginRes.data.user));
          navigate("/");
        } else {
          // If login fails for some reason but registration worked
          navigate("/signin");
        }
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

      <h1 className="auth-title">Sign Up</h1>

      <form className="auth-form" onSubmit={handleSignUp}>
        <div className="input-group">
          <input
            type="text"
            className="auth-input"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            className="auth-input"
            placeholder="Email Address"
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
        <div className="input-group">
          <input
            type="password"
            className="auth-input"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-auth-submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="auth-footer-links">
        <Link to="/signin" className="switch-auth">
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
