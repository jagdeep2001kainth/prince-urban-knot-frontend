import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const CATEGORIES = [
    { label: "Animal Print", value: "Animal Print Tie Set" },
    { label: "Floral", value: "Floral Tie & Pocket Square Set" },
    { label: "Jacquard Paisley", value: "Jacquard Paisley Tie Set" },
    { label: "Jacquard Floral", value: "Jacquard Floral Tie Set" },
    { label: "Jacquard Pattern", value: "Jacquard Pattern Tie Set" },
    { label: "Designer", value: "Designer Pattern Tie Set" },
    { label: "Paisley", value: "Paisley Tie & Pocket Square Set" },
    { label: "Striped", value: "Striped Tie & Pocket Square Set" },
    { label: "Solid", value: "Solid Color Tie & Pocket Square Set" },
];

const Navbar = () => {
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="header">
            {/* Top bar */}
            <div className="header-top">
                <span>Free shipping on orders over $75</span>
            </div>

            {/* Main navbar */}
            <nav className="navbar">
                {/* Left — auth links */}
                <div className="nav-left">
                    {token ? (
                        <span className="nav-welcome">Welcome, {user?.name || "User"}</span>
                    ) : (
                        <>
                            <Link to="/login">Sign In</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>

                {/* Center — brand */}
                <Link to="/" className="nav-brand">Prince Urban Knot</Link>

                {/* Right — actions */}
                <div className="nav-right">
                    {token ? (
                        <>
                            <Link to="/orders">Orders</Link>
                            <button className="nav-logout-btn" onClick={handleLogout}>Sign Out</button>
                        </>
                    ) : (
                        <span className="nav-tagline">Premium Men's Accessories</span>
                    )}
                </div>
            </nav>

            {/* Category nav bar */}
            <div className="nav-categories">
                <Link to="/" className="nav-category-link">All</Link>
                {CATEGORIES.map(cat => (
                    <Link
                        key={cat.value}
                        to={`/?category=${encodeURIComponent(cat.value)}`}
                        className="nav-category-link"
                    >
                        {cat.label}
                    </Link>
                ))}
            </div>
        </header>
    );
};

export default Navbar;
