import React, { createContext, useState, useContext, useMemo } from "react";
import Toast from "../components/ui/Toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const showNotification = (message) => {
    setNotification(message);
  };

  const addToCart = (item, notify = false) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    if (notify) {
      showNotification(`${item.name} added to cart`);
    }
  };

  const decrementFromCart = (id) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === id);
      if (!existingItem) return prevCart;
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== id);
      }
      return prevCart.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    showNotification("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decrementFromCart,
        clearCart,
        totalItems,
        showNotification,
      }}
    >
      {children}
      {notification && (
        <Toast message={notification} onClose={() => setNotification(null)} />
      )}
    </CartContext.Provider>
  );
};

export default CartContext;
