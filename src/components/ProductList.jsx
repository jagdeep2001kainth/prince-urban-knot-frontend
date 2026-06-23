import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [hovered, setHovered] = useState(false);

    const primaryImage = product.imageUrls?.[0] || product.imageUrl;
    const secondaryImage = product.imageUrls?.[1] || primaryImage;

    return (
        <div className="product-card">

            <Link
                to={`/product/${product.id}`}
                className="product-card-link"
            >
                <div
                    className="product-image-wrapper"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <img
                        className="product-image"
                        src={hovered ? secondaryImage : primaryImage}
                        alt={product.name}
                    />
                </div>

                <h3 className="product-name">{product.name}</h3>
            </Link>

            <p className="product-price">${product.price}</p>

            <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>

        </div>
    );
}

export default ProductCard;