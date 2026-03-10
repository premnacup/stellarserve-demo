import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, addToCart, decrementFromCart, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <header className="cart-header">
        <button className="back-link" onClick={() => navigate(-1)}>
          <span>◀</span> Back
        </button>
        <h1 className="cart-title">Cart</h1>
        {cart.length > 0 ? (
          <button className="clear-cart-btn" onClick={clearCart}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        ) : (
          <div style={{ width: "22px" }}></div>
        )}
      </header>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-thumbnail"></div>
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <span className="cart-item-option">
                  Price: ฿{item.price.toFixed(2)}
                </span>
              </div>
              <div className="qty-controls">
                <button
                  className="decrement-btn"
                  onClick={() => decrementFromCart(item.id)}
                >
                  -
                </button>
                <span className="qty-number">{item.quantity}</span>
                <button
                  className="increment-btn"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <footer className="cart-footer">
          <div className="cart-summary">
            <span className="summary-label">Total:</span>
            <span className="summary-total">฿{total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </footer>
      )}
    </div>
  );
}

export default Cart;
