import { Link } from "react-router-dom";

function ProductCard({ product }) {
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
      </Link>
      <img src={product.thumbnail} width={200} alt="" />
      <Link to={`/product/${product._id}`}>
        <p>{product.description}</p>
      </Link>
      <Link to={`/product/${product._id}`}>
        <h3>${product.price}</h3>
      </Link>
      <button>Add to cart</button>
    </div>
  );
}

export default ProductCard;
