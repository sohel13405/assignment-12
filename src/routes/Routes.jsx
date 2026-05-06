import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardRedirect from "../components/dashboard/DashboardRedirect ";
import AddPost from "../components/user/AddPost";
import ManageUsers from "../components/admin/ManageUsers";
import Profile from "../components/profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../pages/ErrorPage";
import LoadingSpinner from "../components/shared/loadingSpinner/LoadingSpinner";
import PostDetails from "../components/user/PostDetails";
import MyPost from "../components/user/MyPost";
import CommentsPage from "../pages/CommentsPage";
import AddAnnouncement from "../components/admin/AddAnnouncement";
import Announcements from "../components/admin/Announcements";
import Membership from "../pages/Membership";
import ReportedComments from "../components/admin/Reported Comments/ReportedComments";
import DashboardProfile from "../components/dashboard/DashboardProfile";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
    children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/membership',
          element: <PrivateRoutes>
            <Membership></Membership>
          </PrivateRoutes>
        },
        {
          path: '/postdetails/:id',
          element: <PostDetails></PostDetails>
        },
        {
          path: 'comments/:postId',
          element: <CommentsPage></CommentsPage>
        },
        {
          path: 'announcements',
          element: <PrivateRoutes>
            <Announcements></Announcements>
          </PrivateRoutes>
        }
    ]
  },
  {
    path: '/signin',
    element: <SignIn></SignIn>
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes>
      <DashboardLayout></DashboardLayout>
    </PrivateRoutes>,
    children: [
      {
        index: true,
        element: <DashboardRedirect></DashboardRedirect>
      },
      {
        path: 'add-post',
        element: <AddPost></AddPost>
      },
      {
        path: 'my-post',
        element: <MyPost></MyPost>
      },
      {
        path: 'manage-users',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'reported-comments',
        element: <ReportedComments></ReportedComments>
      },
     
      {
        path: 'add-announcement',
        element: <AddAnnouncement></AddAnnouncement>
      },
      {
        path: 'profile',
        element: <DashboardProfile></DashboardProfile>
      },
      
    ]
  },
 
]);