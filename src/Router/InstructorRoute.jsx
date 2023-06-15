import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useInstructor from "../Pages/Hooks/useInstructor";




const InstructorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const { isInstructor, isInstructorLoading } = useInstructor(); 
    const location = useLocation();
  
    if (loading || isInstructorLoading) {
        return <span className="loading loading-spinner loading-lg mx-72 my-72"></span>
    }
  
    if (user && isInstructor) {
      return children;
    }
    
    return <Navigate to="/" state={{ from: location }} replace />;
  };

export default InstructorRoute;