
import { Navigate } from "react-router";
import LoadingSpinner from "../shared/loadingSpinner/LoadingSpinner";
import useRole from "../../hooks/useRole";




const DashboardRedirect = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "admin") {
    return <Navigate to="/dashboard/profile" replace />;
  }

  if (role === "user") {
    return <Navigate to="/dashboard/profile" replace />;
  }

 

  return null;
};

export default DashboardRedirect;
