import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import api from "../../api/api";
import "./Checkout.css";

const Checkout = () => {
  const { cart, clearCart, restaurantId } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 20; // Fixed ฿20 as requested (though reference image shows something else, I'll stick to user instructions)
  const total = subtotal + deliveryFee;

  const handleConfirmOrder = async () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Please login to place an order.");
      navigate("/signin");
      return;
    }

    const user = JSON.parse(userStr);

    // Check if cart is empty
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customer_id: user.id,
        restaurant_id: restaurantId || cart[0]?.restaurant_id, // Fallback to first item if state is missing
        total: total,
        items: cart.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await api.post("/orders", orderData);

      if (response.data && response.data.order_id) {
        // Prepare success data for redirection
        const orderInfo = {
          order_id: response.data.order_id,
          total: total,
        };

        clearCart();
        navigate("/order-success", { state: orderInfo });
      }
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <header className="checkout-header">
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
        <h1>Payment</h1>
      </header>

      <h2 className="section-title">Item list</h2>
      <div className="item-list">
        {cart.map((item) => (
          <div key={item.id} className="item-row">
            <span className="item-name">
              {item.name} (x{item.quantity})
            </span>
            <span className="item-price">฿{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="divider"></div>

        <div className="summary-row">
          <span className="item-name">Delivery fee</span>
          <span className="item-price">฿{deliveryFee}</span>
        </div>

        <div className="summary-row total">
          <span>Total</span>
          <span>฿{total}</span>
        </div>
      </div>

      <div className="payment-section">
        <h2 className="section-title">Select Payment Method</h2>
        <div className="payment-options">
          <div
            className={`payment-option ${paymentMethod === "card" ? "active" : ""}`}
            onClick={() => setPaymentMethod("card")}
          >
            <div className="payment-icon-box">
              <svg
                className="icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <span>Card</span>
          </div>

          <div
            className={`payment-option ${paymentMethod === "promptpay" ? "active" : ""}`}
            onClick={() => setPaymentMethod("promptpay")}
          >
            <div className="payment-icon-box">
              <svg
                className="icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <span>Promptpay</span>
          </div>

          <div
            className={`payment-option ${paymentMethod === "cash" ? "active" : ""}`}
            onClick={() => setPaymentMethod("cash")}
          >
            <div className="payment-icon-box">
              <svg
                className="icon-svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <circle cx="12" cy="12" r="2"></circle>
                <path d="M6 12h.01M18 12h.01"></path>
              </svg>
            </div>
            <span>Cash</span>
          </div>
        </div>
      </div>

      <div className="checkout-footer">
        <button
          className="btn-confirm"
          onClick={handleConfirmOrder}
          disabled={loading || cart.length === 0}
        >
          {loading ? "Placing Order..." : "Done"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
