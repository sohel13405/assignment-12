import { useState, useRef, useEffect } from "react";
import {
  FaBell,
  FaBars,
  FaTimes,


} from "react-icons/fa";
import { NavLink, Link} from "react-router-dom";
import logo from "../../../assets/logo-converso.png";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import NotificationBell from "../NotificationBell";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged Out"))
      .catch((err) => toast.error(err.message));
  };

  const navLink = ({ isActive }) =>
    isActive
      ? "text-[#69b7dd]"
      : "hover:text-[#69b7dd] transition";

  return (
    <nav className="sticky top-0 z-50 bg-[#37353E] border-b">

      <div className="max-w-7xl mx-20 ">

        <div className="flex items-center justify-between h-20">

          {/* LEFT */}
          <div className="flex items-center gap-8">

            <Link to="/">
              <img src={logo} className="w-52" />
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex gap-6 text-[#dedada]">

              <NavLink to="/" className={navLink}>
                Home
              </NavLink>


              <NavLink to="/membership" className={navLink}>
                Membership
              </NavLink>

            </div>

          </div>



          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* <div className="hidden lg:block lg:flex gap-2 mx-5">
              <TbBrandFacebookFilled className="bg-white rounded-full  w-5 h-5" />
              <BsTwitterX className="bg-white rounded-full p-1  w-5 h-5" />
              <GrInstagram className="bg-white rounded-full p-1  w-5 h-5" />
            </div> */}

            {/* NOTIFICATION */}
              <NotificationBell></NotificationBell>
            {/* PROFILE */}
            {user ? (
              <div ref={profileRef} className="relative">

                <img
                  onClick={() => setProfileOpen(!profileOpen)}
                  onMouseEnter={() => setProfileOpen(true)}
                  // onMouseLeave={()=> setProfileOpen(false)}
                  src={user?.photoURL}
                  className="w-9 h-9 rounded-full border-2 border-[#69b7dd] cursor-pointer"
                />


                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-lg shadow-lg">

                    <p className="px-4 py-2 border-b font-semibold">
                      {user.displayName}
                    </p>

                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogOut}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <Link
                to="/signin"
                className="bg-[#4494bc] text-white px-4 py-2 rounded-lg hover:bg-[#69b7dd]"
              >
                Join Us
              </Link>
            )}

            {/* MOBILE MENU */}
            <button
              className="md:hidden text-2xl text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>

        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden bg-[#37353E] border-t">

          <div className="flex flex-col gap-4 p-6 text-[#dedada]">

            <NavLink to="/" className={navLink}>
              Home
            </NavLink>

            <NavLink to="/categories" className={navLink}>
              Categories
            </NavLink>

            <NavLink to="/membership" className={navLink}>
              Membership
            </NavLink>

          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;