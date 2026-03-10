import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/signin");
      return;
    }

    const user = JSON.parse(userStr);

    api
      .get(`/orders/customer/${user.id}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [navigate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <div className="orders-container">Loading orders...</div>;

  return (
    <div className="orders-container">
      <header className="orders-header">
        <button className="back-btn" onClick={() => navigate("/profile")}>
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
        <h1>Order History</h1>
      </header>

      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <span className="restaurant-name">{order.restaurant_name}</span>
                <span
                  className={`order-status status-${(order.status || "pending").toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {order.status || "pending"}
                </span>
              </div>

              <div className="order-details">
                <span>Order #{order.id}</span>
                <span>{formatDate(order.created_at)}</span>
              </div>

              <div className="order-total">
                <span>Total Amount</span>
                <span>฿{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders">
          <div className="no-orders-icon">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <p>You have not placed any orders yet.</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
