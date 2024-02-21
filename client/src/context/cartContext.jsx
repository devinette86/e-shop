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
        `http://localhost:3102/user/${user._id}/cart`
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("user", user);

  const addToCart = async (productId, quantity) => {
    console.log("User ID:", user._id); // Log user._id to the console
    console.log("Request URL:", `http://localhost:3102/cart/${user._id}/add`); // Log the request URL
    // console.log(quantity, user, productId);
    if (!user || !user._id) {
      console.error("User or userId is undefined");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3102/cart/${user._id}/add`,
        {
          productId,
          quantity,
        }
      );
      console.log("Full Response:", response);
      // Update the cart state with the received data
      setCart(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      console.log("Error response:", error.response);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3102/cart/${user._id}/remove/${itemId}`
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:3102/cart/${user._id}/clear`);
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
