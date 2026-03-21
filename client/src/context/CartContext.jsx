import React, { createContext, useState, useContext, useMemo } from "react";
import Toast from "../components/ui/Toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);
  const [notification, setNotification] = useState(null);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const showNotification = (message) => {
    setNotification(message);
  };

  const addToCart = (item, notify = false) => {
    if (
      cart.length > 0 &&
      restaurantId !== null &&
      item.restaurant_id !== restaurantId
    ) {
      showNotification("You can only add items from one restaurant at a time.");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);

      if (prevCart.length === 0) {
        setRestaurantId(item.restaurant_id);
      }

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

      let newCart;
      if (existingItem.quantity === 1) {
        newCart = prevCart.filter((item) => item.id !== id);
      } else {
        newCart = prevCart.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }

      // If cart becomes empty, clear restaurantId
      if (newCart.length === 0) {
        setRestaurantId(null);
      }

      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      if (newCart.length === 0) {
        setRestaurantId(null);
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);
    showNotification("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        restaurantId,
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
