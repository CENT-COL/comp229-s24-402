import react from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const PrivateRoute = ({children}) => {
    const {currentUser} = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;