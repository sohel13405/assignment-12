import useRole from "../../hooks/useRole";
import LoadingSpinner from "../shared/loadingSpinner/LoadingSpinner";
import AdminProfile from "../profile/AdminProfile";
import Profile from "../profile/Profile";


const DashboardProfile = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "admin") {
    return <AdminProfile></AdminProfile>
  }

  return <Profile></Profile> 
};

export default DashboardProfile;