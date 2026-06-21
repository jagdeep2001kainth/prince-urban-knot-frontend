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
import AdminBulkUploadV2 from "./pages/AdminBulkUploadV2";
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
                import AdminBulkUploadV3 from "./pages/AdminBulkUploadV3";
...
<Route path="/admin/bulk-upload-v3" element={
    <PrivateRoute><AdminBulkUploadV3 /></PrivateRoute>
} />
                {/* <Route path="/admin/bulk-upload-v2" element={
    <PrivateRoute><AdminBulkUploadV2 /></PrivateRoute>
} /> */}
                  {/* <Route path="/admin/bulk-upload" element={
                    <PrivateRoute><AdminBulkUpload /></PrivateRoute>
                } /> */}
                {/* <Route path="/admin/bulk-upload" element={
                    <AdminRoute><AdminBulkUpload /></AdminRoute>
                } /> */}
                
            </Routes>
        </div>
    );
}

export default App;