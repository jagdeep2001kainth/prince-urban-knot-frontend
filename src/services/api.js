const API_URL = "http://localhost:8080/api";

const getToken = () => localStorage.getItem("token");

// Products
export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
};

// Auth
export const registerUser = async (data) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const loginUser = async (data) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
};

// Cart
export const getCart = async () => {
    const response = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
};

export const addToCart = async (productId, quantity) => {
    const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
};

export const removeFromCart = async (cartItemId) => {
    const response = await fetch(`${API_URL}/cart/remove/${cartItemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
};

// Orders
export const placeOrder = async () => {
    const response = await fetch(`${API_URL}/orders/place`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
};

export const getOrders = async () => {
    const response = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
};