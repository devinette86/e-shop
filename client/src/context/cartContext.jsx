import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // Get the user object from the authentication context
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const setCartLoading = () => {
    setLoading(true);
  };

  const getCart = async (id) => {
    setCartLoading();
    try {
      const response = await axios.get(
        `http://localhost:3102/user/${user.userId}/cart`
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    if (!user || !user.userId) {
      console.error("User or userId is undefined");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3102/cart/${user.userId}/add`,
        {
          userId: user.userId,
          productId,
          quantity,
        }
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3102/cart/${user.userId}/remove/${itemId}`
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:3102/cart/${user.userId}/clear");
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        getCart,
        addToCart,
        removeFromCart,
        clearCart,
        setCartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
