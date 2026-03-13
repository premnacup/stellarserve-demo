import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchOrders = () => {
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
  };

  useEffect(() => {
    fetchOrders();
  }, [navigate]);

  useEffect(() => {
    if (selectedOrder) {
      api
        .get(`/orders/${selectedOrder.id}/items`)
        .then((res) => {
          setOrderItems(res.data);
        })
        .catch((err) => {
          console.error("Error fetching order items:", err);
        });
    }
  }, [selectedOrder]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setSubmittingReview(true);
    api
      .post("/reviews", {
        order_id: selectedOrder.id,
        restaurant_id: selectedOrder.restaurant_id,
        rating,
        comment,
      })
      .then(() => {
        setSubmittingReview(false);
        setShowReviewModal(false);
        setSelectedOrder(null);
        setOrderItems([]);
        setRating(5);
        setComment("");
        fetchOrders(); // Refresh orders to update has_review status
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        setSubmittingReview(false);
        alert(err.response?.data?.error || "Failed to submit review");
      });
  };

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

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Finding your feast...</p>
        </div>
      </div>
    );
  }

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
          <span>Back</span>
        </button>
        <h1>Order History</h1>
      </header>

      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order) => (
            <button
              key={order.id}
              className="order-card clickable-order-card"
              onClick={() => setSelectedOrder(order)}
              type="button"
            >
              <div className="order-card-header">
                <span className="restaurant-name">{order.restaurant_name}</span>
                <span
                  className={`order-status status-${(order.status || "pending")
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
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
                <span className="total-amount">฿{order.total}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="no-orders">
          <div className="no-orders-icon">
            <svg
              width="44"
              height="44"
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

      {selectedOrder && (
        <div
          className="order-modal-overlay"
          onClick={() => {
            if (!showReviewModal) {
              setSelectedOrder(null);
              setOrderItems([]);
            }
          }}
        >
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            {!showReviewModal ? (
              <>
                <div className="order-modal-header">
                  <h3>Order Details</h3>
                  <button
                    className="close-modal-btn"
                    onClick={() => {
                      setSelectedOrder(null);
                      setOrderItems([]);
                    }}
                    type="button"
                  >
                    ✕
                  </button>
                </div>

                <div className="order-modal-content">
                  <div className="modal-row">
                    <span className="modal-label">Restaurant</span>
                    <span className="modal-value">
                      {selectedOrder.restaurant_name}
                    </span>
                  </div>
                  <div className="modal-row">
                    <span className="modal-label">Order ID</span>
                    <span className="modal-value">#{selectedOrder.id}</span>
                  </div>
                  <div className="modal-row">
                    <span className="modal-label">Date</span>
                    <span className="modal-value">
                      {formatDate(selectedOrder.created_at)}
                    </span>
                  </div>
                  <div className="modal-row">
                    <span className="modal-label">Status</span>
                    <span className="modal-value">
                      {selectedOrder.status.charAt(0).toUpperCase() +
                        selectedOrder.status.slice(1)}
                    </span>
                  </div>

                  {orderItems.length > 0 && (
                    <>
                      <div className="modal-divider"></div>
                      <div className="modal-items-section">
                        <p
                          className="modal-label"
                          style={{ marginBottom: "12px" }}
                        >
                          Items
                        </p>
                        {orderItems.map((item, index) => (
                          <div
                            key={item.id || index}
                            className="modal-row"
                            style={{ marginBottom: "8px" }}
                          >
                            <span
                              className="modal-value"
                              style={{ fontWeight: 500 }}
                            >
                              {item.quantity}x {item.name}
                            </span>
                            <span className="modal-value">
                              ฿{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="modal-divider"></div>

                  <div className="modal-row modal-total">
                    <span className="modal-label">Total Amount</span>
                    <span className="modal-value">฿{selectedOrder.total}</span>
                  </div>

                  {selectedOrder.status.toLowerCase() === "delivered" && (
                    <div
                      className="modal-actions"
                      style={{ marginTop: "24px" }}
                    >
                      {selectedOrder.has_review ? (
                        <button className="review-btn disabled" disabled>
                          Reviewed
                        </button>
                      ) : (
                        <button
                          className="review-btn"
                          onClick={() => setShowReviewModal(true)}
                        >
                          Leave Review
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="order-modal-header">
                  <h3>Leave Review</h3>
                  <button
                    className="close-modal-btn"
                    onClick={() => setShowReviewModal(false)}
                    type="button"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={handleReviewSubmit}
                  className="order-modal-content"
                >
                  <div className="rating-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= rating ? "active" : ""}`}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>

                  <div className="input-group">
                    <label className="modal-label">Your Comment</label>
                    <textarea
                      className="review-textarea"
                      placeholder="Tell us about your order..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="modal-actions">
                    <button
                      type="submit"
                      className="submit-review-btn"
                      disabled={submittingReview}
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
