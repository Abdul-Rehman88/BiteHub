import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import logo from "../../assets/images/logo2.jpg";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/authSlice";

const ResponsiveNavbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  // console.log("Current user in header:", user); 

  const handleLogout = () => {
    logoutUser();
    dispatch(clearUser());
  };


  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservation", path: "/reservation" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <nav className="flex items-center justify-between w-full relative bg-white px-5 lg:px-[50px] md:px-[30px] py-2.5">
      {/* logo */}
      <Link to="/">
        <img src={logo} alt="logo" className="w-20" />
      </Link>

      {/* Desktop Menu */}
      <ul className="items-center gap-5 text-base text-[#1A1A1A] md:flex hidden">
        {navLinks.map((link, index) => (
          <li key={index} className="relative group capitalize">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "text-[#E09A05]" : "text-[#1A1A1A]"
              }
            >
              {link.name}

              {/* underline effect */}

              <span
                className={`test absolute left-0 -bottom-1 w-0 h-0.5 bg-[#E09A05] transition-all duration-300 group-hover:w-full`}
              ></span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Buttons + Mobile Icon */}
      <div className="flex items-center gap-2.5">
        {/* Sign In Button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="py-[7px] text-base px-4 rounded-full bg-red-600 hover:bg-red-700 text-white hidden sm:flex transition-all duration-150
            active:scale-95 active:translate-y-0.5 "
          >
            Log Out
          </button>
        ) : (
          <NavLink
            to="/LogIn"
            className="py-[7px] text-base px-4 rounded-full bg-[#FFB703] hover:bg-[#E09A05] text-[#1A1A1A] hidden sm:flex transition-all duration-150
            active:scale-95 active:translate-y-0.5 "
          >
            Sign In
          </NavLink>
        )}
        <CiMenuFries
          className="text-[1.8rem] text-[#E09A05]  md:hidden"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
      </div>

      {/* Mobile Sidebar */}
      <aside
        className={`${
          mobileSidebarOpen
            ? "translate-x-0 opacity-100 z-20"
            : "-translate-x-[200px] opacity-0 z-[-1]"
        } md:hidden bg-gray-100 px-5 py-5 text-left absolute top-[89px] left-0   w-full transition-all duration-300 flex flex-col gap-4`}
      >
        <ul className="flex flex-col gap-4 text-[15px] text-[#1A1A1A]">
          {navLinks.map((link, index) => (
            <li key={index} className="relative group capitalize">
              <NavLink
                to={link.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  isActive ? "text-[#E09A05]" : "text-[#1A1A1A]"
                }
              >
                {link.name}
              </NavLink>

              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#E09A05] transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>


        {user ? (
            <button onClick={handleLogout} className="relative group text-left text-[15px] capitalize text-red-600">
            Log Out
            </button>
            ) : (
            <NavLink to="/LogIn" className="relative group text-left text-[15px] capitalize text-[#1A1A1A]  transition md:hidden">
                Sign In
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#E09A05] transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
        )}
      </aside>
    </nav>
  );
};

export default ResponsiveNavbar;
