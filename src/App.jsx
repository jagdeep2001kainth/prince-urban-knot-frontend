import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./components/Cart";
import Orders from "./pages/Orders";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
    return (
        <div className="container">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={
                    <PrivateRoute><Cart /></PrivateRoute>
                } />
                <Route path="/orders" element={
                    <PrivateRoute><Orders /></PrivateRoute>
                } />
            </Routes>
        </div>
    );
}

export default App;