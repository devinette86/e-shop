import { useCart } from "../context/cartContext.jsx";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <h1>Your Cart Items</h1>
      {cart.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
