import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import { useAuth } from "../context/auth";

const Home = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3102/api/products");
        setProducts(response.data);
        // Set filteredProducts to all products initially
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  const filterProductsByCategory = (category) => {
    // Update the selected category and filter the products accordingly
    setSelectedCategory(category);
    if (category) {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <>
      {user ? (
        <>
          <h2>Our Latest Products</h2>
          <Filter
            categories={Array.from(
              new Set(products.map((product) => product.category))
            )}
            selectedCategory={selectedCategory}
            onSelectCategory={filterProductsByCategory}
          />
          <div className="products-container">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div>Please login to see our Products!</div>
      )}
    </>
  );
};

export default Home;
