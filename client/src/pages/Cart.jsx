import { useCart } from "../context/cartContext.jsx";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  console.log("Cart from cartContext:", cart);

  const handleDeleteFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div>
      <h1>Your Cart Items</h1>
      {cart ? (
        cart.map((item) => (
          <div key={item._id}>
            <h3>Name: {item.product.name}</h3>
            <p>Price: {item.product.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleDeleteFromCart(item.product._id)}>
              Remove from cart
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
