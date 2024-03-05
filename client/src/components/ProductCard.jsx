import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext.jsx";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      console.log("Product ID:", product._id);
      // Assuming you have the product ID and quantity available
      await addToCart(product._id, 1);

      // Optional: You can show a success message or trigger any UI update
      console.log("Item added to cart successfully!");
    } catch (error) {
      // Handle errors if needed
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div
      style={{
        width: "300px",
        boxShadow: "1px 1px 3px gray",
        margin: "10px",
      }}
    >
      <Link to={`/product/${product._id}`}>
        <h3>
          <strong>{product.name}</strong>
        </h3>
        <img src={product.thumbnail} width={200} alt="" />
        <p
          style={{
            height: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.description}
        </p>
        <h3>${product.price}</h3>
      </Link>

      {product.stockCount === 0 ? (
        <button disabled>Out of stock</button>
      ) : (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
    </div>
  );
}

export default ProductCard;
