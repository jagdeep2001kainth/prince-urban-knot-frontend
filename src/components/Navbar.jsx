import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

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

            {/* Bottom nav bar */}
            <div className="nav-categories">
                <Link to="/">New</Link>
                <Link to="/">Ties</Link>
                <Link to="/">Bow Ties</Link>
                <Link to="/">Pocket Squares</Link>
                <Link to="/">Accessories</Link>
                <Link to="/" className="nav-sale">Sale</Link>
            </div>
        </header>
    );
};

export default Navbar;