import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./components/Cart";
import Orders from "./pages/Orders";
import PrivateRoute from "./components/PrivateRoute";
import AdminBulkUpload from "./pages/AdminBulkUpload";
import AdminRoute from "./components/AdminRoute";
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
                  <Route path="/admin/bulk-upload" element={
                    <PrivateRoute><AdminBulkUpload /></PrivateRoute>
                } />
                <Route path="/admin/bulk-upload" element={
                    <AdminRoute><AdminBulkUpload /></AdminRoute>
                } />
                
            </Routes>
        </div>
    );
}

export default App;