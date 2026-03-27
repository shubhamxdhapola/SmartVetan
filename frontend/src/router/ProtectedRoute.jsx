import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { employer } = useSelector((state) => state.auth);
  return employer ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
