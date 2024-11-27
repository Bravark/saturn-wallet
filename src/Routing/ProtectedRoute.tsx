import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useExtension } from "../store/context";

const ProtectedRoute = () => {
  const { account } = useExtension();
  const location = useLocation();

  return account ? (
    <Outlet />
  ) : (
    <Navigate to="/welcome" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
