import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const isLoggeIn = useAuth();

  return !isLoggeIn ? (
    children
  ) : user?.role === "admin" ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to={`/profile/${user?.userId}`} />
  );
};

export default PublicRoute;
