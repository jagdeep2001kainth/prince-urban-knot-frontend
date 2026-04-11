// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api"; // ✅ Use the named fetch function
import ProductCard from "../components/ProductList";
import CartDrawer from "../components/CartDrawer";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data)) // ✅ No need for .data with standard fetch
      .catch(err => console.error(err));
  }, []);

   return (
    <div className="home-wrapper">
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <CartDrawer />
    </div>
  );
};

export default Home;