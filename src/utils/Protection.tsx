import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectionProps {
    children: ReactNode;
  }
  
  const Protection: React.FC<ProtectionProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
  
    return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
  };
  
  export default Protection;