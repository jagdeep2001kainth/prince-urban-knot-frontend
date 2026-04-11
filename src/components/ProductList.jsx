import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { useCart } from "../context/CartContext";


function ProductCard({ product }) {
     const { addToCart } = useCart();
    return (
        <div className="product-card">
            <h3 className="product-name">{product.name}</h3>
            <img className="product-image" src={product.imageUrl} alt={product.name} />
            <p className="product-description">{product.description}</p>
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