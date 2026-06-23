import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductList";
import CartDrawer from "../components/CartDrawer";

const HERO_IMAGE = "https://res.cloudinary.com/dlzb0kfc7/image/upload/v1782182251/A_7_ho05nx.png";
const SHOP_NOW_CATEGORY = "Solid Color Tie & Pocket Square Set";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        if (!category) {
            setProducts([]);
            return;
        }
        setLoading(true);
        getProductsByCategory(category)
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [category]);

    // Category page
    if (category) {
        return (
            <div className="home-wrapper">
                <h2 className="category-heading">{category}</h2>
                {loading ? (
                    <p className="loading-text">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="loading-text">No products found.</p>
                ) : (
                    <div className="products-grid">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
                <CartDrawer />
            </div>
        );
    }

    // Hero homepage
    return (
        <div className="home-wrapper">
            <div className="hero">
                <img
                    src={HERO_IMAGE}
                    alt="Prince Urban Knot lifestyle"
                    className="hero-image"
                />
                <div className="hero-overlay">
                    <Link
                        to={`/?category=${encodeURIComponent(SHOP_NOW_CATEGORY)}`}
                        className="hero-btn"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
            <CartDrawer />
        </div>
    );
};

export default Home;
