import useRole from "../../hooks/useRole";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-converso.png";
import {
    FaBars,
    FaSignOutAlt,
    FaUser,
    FaUsers,
    FaTimes,
    FaCartArrowDown,
} from "react-icons/fa";

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { SidebarLink } from "./SidebarLink";
import LoadingSpinner from "../shared/loadingSpinner/LoadingSpinner";
import Navbar from "../shared/navbar/Navbar";

const DashboardLayout = () => {
    const [open, setOpen] = useState(false);
    const [role, isRoleLoading] = useRole();
    const { logOut } = useAuth();
    const navigate = useNavigate();

    if (isRoleLoading) return <LoadingSpinner />;

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logout Successfully");
                navigate("/");
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <Navbar />

            {/* Hamburger */}
            <div className="px-4 py-5 bg-white shadow flex items-center">
                <button onClick={() => setOpen(prev => !prev)}>
                    <FaBars size={22} />
                </button>
            </div>

            {/* Layout */}
            <div className="flex">

                {open && (
                    <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setOpen(false)}
                    />
                )}


                {/* Sidebar */}
                <aside
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    className={`fixed top-0 left-0 z-50 h-screen bg-[#37353E] text-white transition-all duration-300 ease-in-out
                ${open ? "w-72" : "w-20"}`}
                >

                    {/* Logo */}
                    <div className="flex items-center h-20 px-4 border-b border-white/10">
                        {open ? (
                            <div className="flex items-center justify-between w-full">
                                <NavLink to="/">
                                    <img className="w-52" src={logo} alt="logo" />
                                </NavLink>

                                <button onClick={() => setOpen(false)}>
                                    <FaTimes />
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center w-full">
                                <button onClick={() => setOpen(true)}>
                                    <FaBars size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Menu */}
                    <nav className="mt-6 space-y-2 px-2">

                        {role === "user" && (
                            <>
                                <SidebarLink
                                    open={open}
                                    to="/dashboard/add-post"
                                    icon={<FaCartArrowDown />}
                                    text="Add Post"
                                />

                                <SidebarLink
                                    open={open}
                                    to="/dashboard/my-post"
                                    icon={<FaCartArrowDown />}
                                    text="My Posts"
                                />
                            </>
                        )}

                        {role === "admin" && (
                            <>
                                <SidebarLink
                                    open={open}
                                    to="/dashboard/manage-users"
                                    icon={<FaUsers />}
                                    text="Manage Users"
                                />

                                <SidebarLink
                                    open={open}
                                    to="/dashboard/add-announcement"
                                    icon={<FaUsers />}
                                    text="Make Announcement"
                                />

                                <SidebarLink
                                    open={open}
                                    to="/dashboard/reported-comments"
                                    icon={<FaUsers />}
                                    text="Reported Comments"
                                />
                            </>
                        )}

                    </nav>

                    {/* Bottom */}
                    <div className="absolute bottom-0 w-full px-2 pb-6 space-y-2">

                        <SidebarLink
                            open={open}
                            to="/dashboard/profile"
                            icon={<FaUser />}
                            text="Profile"
                        />

                        <button
                            onClick={handleLogOut}
                            className="flex items-center gap-4 w-full px-4 py-3 hover:bg-white/10 rounded-lg"
                        >
                            <FaSignOutAlt />
                            {open && <span>Logout</span>}
                        </button>

                    </div>

                </aside>


                {/* Content Area */}
                <div
                    className={`flex flex-1 transition-all duration-300
          ${open ? "ml-72" : "ml-20"}`}
                >

                    {/* Main Content */}
                    <main className="flex-1 p-6 max-w-5xl mx-auto">

                        <div className="bg-white rounded-xl shadow p-6 min-h-[80vh]">
                            <Outlet />
                        </div>

                    </main>

                    {/* Right Side Ads */}
                    <aside className="hidden lg:block w-72 p-6">

                        <div className="bg-white rounded-xl shadow p-4 mb-6">
                            <h3 className="font-semibold mb-2">Advertisement</h3>
                            <p className="text-sm text-gray-500">
                                Your ads or widgets can appear here.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow p-4">
                            <h3 className="font-semibold mb-2">Sponsored</h3>
                            <p className="text-sm text-gray-500">
                                Promote products or announcements here.
                            </p>
                        </div>

                    </aside>

                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;