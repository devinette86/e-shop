import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Header />
      <h1>Welcome to this Shop</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
