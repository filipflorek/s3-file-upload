import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth/AuthContext";

function RouteGuard({ children }) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <></>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RouteGuard;
