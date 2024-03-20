import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/cartContext.jsx";
import CheckoutSteps from "../components/CheckoutSteps";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    totalCartPrice,
  } = useCart();

  console.log("Cart from cartContext:", cart);

  const handleDeleteFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <CheckoutSteps step1></CheckoutSteps>
      {cart && cart.length > 0 ? (
        <div className="cart-container">
          <div className="cart-left-column">
            <h3>Your Cart Items</h3>
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <span className="grid-name">
                  <h4>{item.product.name}</h4>
                </span>
                <span className="grid-image">
                  <img src={item.product.imageUrl} alt={item.product.name} />
                </span>

                <span className="grid-price">{item.product.price} €</span>
                <span className="grid-quantity">Quantity: {item.quantity}</span>

                <span className="grid-buttons">
                  <button onClick={() => increaseCartItemQuantity(item._id)}>
                    <FaPlus />
                  </button>
                  <button onClick={() => decreaseCartItemQuantity(item._id)}>
                    <FaMinus />
                  </button>
                  <button
                    onClick={() => handleDeleteFromCart(item.product._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </span>
              </div>
            ))}
          </div>
          <div className="cart-right-column">
            <h3>
              Total Items:{" "}
              {cart.reduce(
                (accumulator, item) => accumulator + item.quantity,
                0
              )}
            </h3>
            <h3>Total Price: {totalCartPrice.toFixed(2)} €</h3>
            <button onClick={checkoutHandler}>Proceed to Checkout</button>
            <h4>Or...</h4>
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Your cart is empty</p>
          <Link to="/">Go Shopping!</Link>
        </div>
      )}
    </>
  );
};

export default Cart;
