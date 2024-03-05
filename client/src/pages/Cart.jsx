import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/cartContext.jsx";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  } = useCart();

  console.log("Cart from cartContext:", cart);

  const handleDeleteFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Calculate the total price using reduce
  const totalPrice = cart.reduce((accumulator, item) => {
    return accumulator + item.product.price * item.quantity;
  }, 0);

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      {cart && cart.length > 0 ? (
        <div
          style={{
            display: "flex",
          }}
        >
          <div>
            <h2>Your Cart Items</h2>
            {cart.map((item) => (
              <div key={item._id}>
                <div>image</div>
                <div>
                  <h4>Name: {item.product.name}</h4>
                  <p>Price: {item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
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
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3>
              Total Items: (
              {cart.reduce(
                (accumulator, item) => accumulator + item.quantity,
                0
              )}
              ){" "}
            </h3>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button>
              <Link to="/">Continue Shopping</Link>
            </button>
            <button onClick={checkoutHandler}>Proceed to Checkout</button>
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
