import { useLocation, Link, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderInfo = location.state || { order_id: "N/A", total: 0 };

  return (
    <div className="success-container">
      <div className="success-icon">
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h1 className="success-title">Order placed successfully!</h1>
      <p style={{ marginBottom: "32px", color: "#6D727A" }}>
        Your food is on the way. Sit back and relax!
      </p>

      <div className="success-details">
        <div className="detail-row">
          <span className="detail-label">Order ID</span>
          <span className="detail-value">#{orderInfo.order_id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Total Amount</span>
          <span className="detail-value">฿{orderInfo.total}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className="detail-value" style={{ color: "#27AE60" }}>
            Confirmed
          </span>
        </div>
      </div>

      <Link to="/" className="btn-return-home">
        Back to Home
      </Link>
    </div>
  );
};

export default OrderSuccess;
