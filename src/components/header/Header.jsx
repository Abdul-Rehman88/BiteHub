import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import logo from "../../assets/images/logo2.jpg"; // Adjust path if needed

const ResponsiveNavbar = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

    return (
        <nav
            className="flex items-center justify-between w-full relative bg-red-white px-5 lg:px-[50px] md:px-[30px] py-2.5 ">

            {/* logo */}
            <img src={logo} alt="logo" className="w-20" />

            <ul className="items-center gap-5 p-[5px] text-base text-[#1A1A1A] md:flex hidden">

                <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5  hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Home</li>

                <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5  hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Menu</li>

                <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5  hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Reservation</li>

                <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5  hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Cart</li>
            </ul>

            {/* action buttons */}
            <div className="items-center gap-2.5 flex">
                
                <button
                    className="py-[7px] text-base px-4 rounded-full capitalize bg-[#FFB703] text-[#1A1A1A] hover:bg-[#E09A05] transition-all duration-300 sm:flex hidden">Sign
                    up
                </button>

                <CiMenuFries
                    className="text-[1.8rem] mr-1 text-[#E09A05] cursor-pointer md:hidden flex"
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
            </div>

            {/* mobile sidebar */}
            <aside-4
                // className={` ${mobileSidebarOpen ? "translate-x-0 opacity-100 z-20" : "translate-x-[200px] opacity-0 z-[-1]"} md:hidden bg-gray-100 px-5 py-5 text-left absolute top-[89px]  right-0 w-full sm:w-[50%]  transition-all duration-300 flex flex-col gap-4 `}>
                className={` ${mobileSidebarOpen ? "translate-x-0 opacity-100 z-20" : "-translate-x-[200px] opacity-0 z-[-1]"} md:hidden bg-gray-100 px-5 py-5 text-left absolute top-[89px] left-0 w-full sm:w-[50%] transition-all duration-300 flex flex-col gap-4 `}>

                <ul className="items-start gap-4 text-base text-[#1A1A1A] flex flex-col">

                    <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5  hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">home</li>

                    <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5  hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Menu</li>

                    <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5  hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Reservation</li>

                    <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-0.5 before:transition-all before:duration-300 before:absolute relative before:rounded-full before:-bottom-0.5  hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Cart</li>

                </ul>

                <button
                    className="text-base capitalize text-[#1A1A1A] hover:bg-[#E09A05] transition-all duration-300 flex md:hidden ">Sign up
                </button>
            </aside-4>
        </nav>
    );
};

export default ResponsiveNavbar;