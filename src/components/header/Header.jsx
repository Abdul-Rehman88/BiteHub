import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import logo from "../../assets/images/logo2.jpg";
import { Link, NavLink } from "react-router-dom";

const ResponsiveNavbar = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
                    <li key={index} className="relative group capitalize"
                    >
                    <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                        isActive ? 'text-[#E09A05]' : "text-[#1A1A1A]" 
                        }>
                        {link.name}

                        {/* underline effect */}
                        
                        <span className={`test absolute left-0 -bottom-1 w-0 h-0.5 bg-[#E09A05] transition-all duration-300 group-hover:w-full`}></span>
                    </NavLink>

                    </li>
                ))}
            </ul>

            {/* Buttons + Mobile Icon */}
            <div className="flex items-center gap-2.5">
                <button className="py-[7px] text-base px-4 rounded-full capitalize bg-[#FFB703] text-[#1A1A1A] hover:bg-[#E09A05] transition-all duration-300 hidden sm:flex">
                    Sign up
                </button>

                <CiMenuFries
                    className="text-[1.8rem] text-[#E09A05]  md:hidden"
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                />
            </div>

            {/* Mobile Sidebar */}
            <aside
                className={`${mobileSidebarOpen
                    ? "translate-x-0 opacity-100 z-20"
                    : "-translate-x-[200px] opacity-0 z-[-1]"
                    } md:hidden bg-gray-100 px-5 py-5 text-left absolute top-[89px] left-0 w-full sm:w-[50%] transition-all duration-300 flex flex-col gap-4`}
            >

                <ul className="flex flex-col gap-4 text-[15px] text-[#1A1A1A]">
                    {navLinks.map((link, index) => (
                        <li key={index} className="relative group capitalize">
                            <NavLink
                                to={link.path}
                                onClick={() => setMobileSidebarOpen(false)}
                               className={({isActive }) =>
                                       isActive ? 'text-[#E09A05]' : "text-[#1A1A1A]"
                                   }>
                                {link.name}
                            </NavLink>

                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#E09A05] transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    ))}
                    
                </ul>
                <button className="relative group text-left text-[15px] capitalize text-[#1A1A1A]  transition md:hidden">
                    Sign up
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#E09A05] transition-all duration-300 group-hover:w-full"></span>
                </button>

            </aside>
        </nav>
    );
};

export default ResponsiveNavbar;
