import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await registerUser(form);
            if (data.id) {
                navigate("/login");
            } else {
                setError(data.message || "Registration failed. Try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join Prince Urban Knot</p>
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="auth-field">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Min. 6 characters"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="auth-btn">Create Account</button>
                </form>
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;