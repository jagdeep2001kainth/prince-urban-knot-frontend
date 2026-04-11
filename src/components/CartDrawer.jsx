import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../AuthContext";
import { addToCart as syncToBackend, placeOrder } from "../services/api";

const CartDrawer = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!token) {
            // Not logged in — redirect to login
            setOpen(false);
            navigate("/login", { state: { from: "cart" } });
            return;
        }

        // Logged in — sync cart to backend then place order
        try {
            setLoading(true);
            // Sync each item to backend cart
            for (const item of cartItems) {
                await syncToBackend(item.id, item.quantity);
            }
            // Place the order
            await placeOrder();
            clearCart();
            setOpen(false);
            navigate("/orders");
            alert("Order placed successfully!");
        } catch (err) {
            console.error("Checkout failed:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Cart Button */}
            <button className="cart-float-btn" onClick={() => setOpen(true)}>
                🛒 Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>

            {/* Overlay */}
            {open && <div className="cart-overlay" onClick={() => setOpen(false)} />}

            {/* Drawer */}
            <div className={`cart-drawer ${open ? "open" : ""}`}>
                <div className="cart-drawer-header">
                    <h2>Your Cart</h2>
                    <button className="cart-close-btn" onClick={() => setOpen(false)}>✕</button>
                </div>

                {cartItems.length === 0 ? (
                    <p className="cart-empty">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                                    <div className="cart-item-info">
                                        <p className="cart-item-name">{item.name}</p>
                                        <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                        <div className="cart-item-qty">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>🗑</button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <p className="cart-total">Total: <strong>${totalPrice.toFixed(2)}</strong></p>
                            {!token && (
                                <p className="cart-login-hint">Sign in to place your order</p>
                            )}
                            <button
                                className="checkout-btn"
                                onClick={handleCheckout}
                                disabled={loading}
                            >
                                {loading ? "Placing Order..." : token ? "Checkout" : "Sign In to Checkout"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartDrawer;