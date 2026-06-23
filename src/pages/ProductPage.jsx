import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`${API_URL}/products/${id}`)
            .then(r => r.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="loading-text">Loading...</p>;
    if (!product) return <p className="loading-text">Product not found.</p>;

    const images = product.imageUrls?.length > 0
        ? product.imageUrls
        : [product.imageUrl];

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="product-page">
            <button className="product-page-back" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="product-page-layout">
                {/* Left — images */}
                <div className="product-page-images">
                    <div className="product-page-main-image">
                        <img
                            src={images[selectedImage]}
                            alt={product.name}
                        />
                    </div>
                    {images.length > 1 && (
                        <div className="product-page-thumbnails">
                            {images.map((url, i) => (
                                <img
                                    key={i}
                                    src={url}
                                    alt={`${product.name} view ${i + 1}`}
                                    className={`product-page-thumb ${selectedImage === i ? "active" : ""}`}
                                    onClick={() => setSelectedImage(i)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right — details */}
                <div className="product-page-details">
                    <h1 className="product-page-name">{product.name}</h1>
                    <p className="product-page-price">${product.price}</p>

                    <p className="product-page-stock">
                        {product.stock > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                    </p>

                    <p className="product-page-description">{product.description}</p>

                    <div className="product-page-quantity">
                        <label>Quantity</label>
                        <div className="quantity-controls">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                disabled={quantity <= 1}
                            >−</button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                                disabled={quantity >= product.stock}
                            >+</button>
                        </div>
                    </div>

                    <button
                        className="product-page-add-btn"
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                    >
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
