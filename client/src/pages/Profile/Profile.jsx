import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="profile-container">
      {isLoggedIn ? (
        <>
          <div className="profile-header-logged-in">
            <div className="profile-avatar-container">
              <svg
                className="profile-avatar-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </div>
            <h1 className="profile-greeting">Hello, {user?.name || "User"}</h1>
          </div>

          <div className="profile-menu">
            <button className="menu-item" onClick={() => navigate("/orders")}>
              <span>Order History</span>
              <span className="menu-arrow">&gt;</span>
            </button>
            <button className="menu-item">
              <span>Account Settings</span>
              <span className="menu-arrow">&gt;</span>
            </button>
            <button className="menu-item">
              <span>Personal Settings</span>
              <span className="menu-arrow">&gt;</span>
            </button>
            <button className="menu-item">
              <span>Security Settings</span>
              <span className="menu-arrow">&gt;</span>
            </button>
            <button className="menu-item">
              <span>App Settings</span>
              <span className="menu-arrow">&gt;</span>
            </button>
          </div>

          <div className="profile-actions">
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="profile-header-logged-out">
            <h1 className="profile-greeting-small">Hello, User</h1>
          </div>

          <div className="profile-menu">
            <button className="menu-item">
              <span>App Settings</span>
              <span className="menu-arrow">&gt;</span>
            </button>
          </div>

          <div className="profile-actions">
            <button className="btn-signin" onClick={() => navigate("/signin")}>
              Sign In
            </button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
