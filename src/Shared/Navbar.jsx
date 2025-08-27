import { NavLink, useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaUser,
  FaUsers,
  FaTachometerAlt,
  FaKaaba,
  FaSignOutAlt,
} from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../Components/context/AuthContext";

const navItems = [
  { to: "/home/about", label: "About", icon: <FaInfoCircle size={18} /> },
  { to: "/home/salat", label: "Salat", icon: <FaKaaba size={18} /> },
  {
    to: "/home/profile",
    label: "Profile",
    icon: <FaUser size={18} />,
    requiresAuth: true,
  },
  {
    to: "/home/user",
    label: "User",
    icon: <FaUsers size={18} />,
    requiresAdmin: true,
  },
  {
    to: "/home/dashboard",
    label: "Dashboard",
    icon: <FaTachometerAlt size={18} />,
    requiresAdmin: true,
  },
  {
    to: "/home/addfund",
    label: "Add Fund",
    icon: <FaTachometerAlt size={18} />,
    requiresAdmin: true,
  },
  {
    to: "/home/editprofile",
    label: "Edit Profile",
    icon: <FaTachometerAlt size={18} />,
    requiresAdmin: true,
  },
  {
    to: "/home/register",
    label: "Register",
    icon: <FaTachometerAlt size={18} />,
    requiresAdmin: true,
  },
];

const Navbar = () => {
  const { user, isAdmin, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser();
    navigate("/");
  };
  const accessibleNavItems = navItems.filter((item) => {
    if (item.requiresAdmin) {
      return user && isAdmin;
    }
    if (item.requiresAuth) {
      return !!user;
    }
    return true;
  });

  const renderLinks = (items, isMobile = false) =>
    items.map(({ to, label, icon }) => (
      <li key={to} className="relative group">
        <NavLink
          to={to}
          className={({ isActive }) =>
            `flex flex-col lg:flex-row items-center justify-center gap-1 px-2 py-1 rounded-md transition ${
              isActive
                ? "text-pink-600 font-semibold"
                : "text-black hover:text-pink-600"
            }`
          }
        >
          {icon}
          {!isMobile && <span>{label}</span>}
          {isMobile && (
            <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 rounded-md shadow z-50 whitespace-nowrap">
              {label}
            </span>
          )}
        </NavLink>
      </li>
    ));

  const LogoutButton = ({ isMobile = false }) => (
    <li className="relative group">
      <button
        onClick={handleLogout}
        className="flex flex-col lg:flex-row items-center justify-center gap-1 px-2 py-1 rounded-md transition text-black hover:text-pink-600"
      >
        <FaSignOutAlt size={18} />
        {!isMobile && <span>Logout</span>}
        {isMobile && (
          <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 rounded-md shadow z-50 whitespace-nowrap">
            Logout
          </span>
        )}
      </button>
    </li>
  );

  return (
    <>
      {/* Top Navbar for Large Screens */}
      <div className="navbar flext justify-between text-black shadow-sm px-4 bg-transparent backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <div className="navbar-start">
          <NavLink to="/" className="btn btn-ghost text-xl">
            Khan
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu flex gap-7 menu-horizontal px-1">
            {renderLinks(accessibleNavItems)}
            {user && <LogoutButton />}
          </ul>
        </div>

        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="User avatar"
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
          </div>
        </div>
      </div>

      {/* Bottom Fixed Navbar for Small Screens */}
      <div className="fixed bottom-2 left-4 right-4 rounded-full z-50 w-md md:w-200 md:left-3 md:right-3 bg-white/30 backdrop-blur-md shadow-md lg:hidden">
        <ul className="flex justify-around items-center p-3 text-xs font-medium">
          {renderLinks(accessibleNavItems, true)}
          {user && <LogoutButton isMobile={true} />}{" "}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
