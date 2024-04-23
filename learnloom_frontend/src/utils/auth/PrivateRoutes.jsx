import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        return <Navigate to="/login" />;
    }
    
    return <Outlet />;
};

export default PrivateRoutes;