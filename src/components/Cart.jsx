import { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart, placeOrder } from "../services/api";
import { useAuth } from "../AuthContext";

    const Cart = () => {  // ✅ named export here
    const [cart, setCart] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        if (token) {
            getCart().then(setCart);
        }
    }, [token]);

    const handleRemove = async (cartItemId) => {
        const updated = await removeFromCart(cartItemId);
        setCart(updated);
    };

    const handlePlaceOrder = async () => {
        await placeOrder();
        alert("Order placed successfully!");
        setCart(null);
    };

    if (!cart || cart.items?.length === 0) {
        return <div><h2>Your Cart</h2><p>Your cart is empty!</p></div>;
    }

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.items.map((item) => (
                <div key={item.id} className="cart-item">
                    <p>{item.product.name} x {item.quantity}</p>
                    <p>${item.product.price}</p>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
            ))}
            <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
    );
};
export default Cart;