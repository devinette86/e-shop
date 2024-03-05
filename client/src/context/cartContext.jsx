import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  console.log("Cart context user", user);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3102/cart/${user._id}`
        );
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    if (user) fetchCart();
  }, [user]);

  console.log("cart context", cart);

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        `http://localhost:3102/cart/${user._id}/add`,
        {
          productId,
          quantity,
        }
      );

      console.log(response.data);

      setCart(response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3102/cart/${user._id}/delete/${productId}`
      );

      console.log(response.data);

      setCart(response.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const increaseCartItemQuantity = async (itemId) => {
    try {
      const response = await axios.post(
        `http://localhost:3102/cart/${user._id}/increase/${itemId}`
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error increasing item quantity:", error);
    }
  };

  const decreaseCartItemQuantity = async (itemId) => {
    try {
      const response = await axios.post(
        `http://localhost:3102/cart/${user._id}/decrease/${itemId}`
      );

      setCart(response.data);
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
