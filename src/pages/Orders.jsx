import { useEffect, useState } from "react";
import { getOrders } from "../services/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders().then(setOrders);
    }, []);

    return (
        <div>
            <h2>My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders yet!</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <h3>Order #{order.id}</h3>
                        <p>Status: {order.status}</p>
                        <p>Total: ${order.totalAmount}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.id}>
                                    {item.product.name} x {item.quantity} — ${item.priceAtPurchase}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;