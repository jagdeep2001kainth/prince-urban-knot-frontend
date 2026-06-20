import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AdminRoute = ({ children }) => {
    const { token, user } = useAuth();

    if (!token) return <Navigate to="/login" />;
    if (user?.role !== "ADMIN") return <Navigate to="/" />;

    return children;
};

export default AdminRoute;