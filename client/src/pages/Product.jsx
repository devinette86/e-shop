import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cartContext.jsx";

const Product = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:3102/api/products/${productId}`
      );
      console.log(data);
      setProduct(data);
    };

    fetchProduct();
  }, [productId]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <>
      <div
        style={{
          width: "1000px",
          boxShadow: "1px 1px 3px gray",
          margin: "10px",
        }}
      >
        <Link to="/">Go Back</Link>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <p>
          Availability:{" "}
          <strong>
            {product.stockCount > 0 ? "In Stock" : "Out of Stock"}
          </strong>
        </p>
        <button onClick={handleAddToCart} disabled={product.stockCount === 0}>
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default Product;
