import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { employer } = useSelector((state) => state.auth);
  return employer ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
