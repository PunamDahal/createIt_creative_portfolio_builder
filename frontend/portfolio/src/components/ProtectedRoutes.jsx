import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/Login/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
