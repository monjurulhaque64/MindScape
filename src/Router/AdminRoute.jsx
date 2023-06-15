import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Pages/Hooks/useAdmin";


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { isAdmin, isAdminLoading } = useAdmin(); 
    const location = useLocation();
  
    if (loading || isAdminLoading) {
        return <span className="loading loading-spinner loading-lg mx-72 my-72"></span>
    }
  
    if (user && isAdmin) {
      return children;
    }
    
    return <Navigate to="/" state={{ from: location }} replace />;
  };
  
  export default AdminRoute;