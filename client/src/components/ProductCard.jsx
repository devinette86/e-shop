import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext.jsx";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
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
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
}

export default ProductCard;
