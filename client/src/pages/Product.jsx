import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

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
            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
          </strong>
        </p>
        <button disabled={product.countInStock === 0}>Add to Cart</button>
      </div>
    </>
  );
};

export default Product;
