import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products", {
          headers: {
            Accept: "application/json",
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h2>Our Latest Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
