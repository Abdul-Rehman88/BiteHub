
import React, {useState} from "react";

// react icons
import {IoIosSearch} from "react-icons/io";
import {CiMenuFries} from "react-icons/ci";

const ResponsiveNavbar = () => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

    return (
        <nav
            className="flex items-center justify-between w-full relative dark:bg-slate-900 bg-white rounded-full px-[20px] lg:px-[50px] md:px-[30px]  py-[10px]">

            {/* logo */}
            <img src="https://i.ibb.co/0BZfPq6/darklogo.png" alt="logo" className="w-[55px] "/>
            {/* <h1>BiteHub</h1> */}

            {/* nav links */}
            <ul className="items-center gap-[20px] text-[1rem] text-[#1A1A1A] md:flex hidden">

                <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Home</li>    

                <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Menu</li>

                <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Reservation</li>

                <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Cart</li>
            </ul>

            {/* action buttons */}
            <div className="items-center gap-[10px] flex">
                {/* <button
                    className="py-[7px] text-[1rem] px-[16px] dark:text-[#FFB703] rounded-full capitalize hover:text-[#1A1A1A] transition-all duration-300 sm:flex hidden">Sign
                    in
                </button> */}
                <button
                    className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#FFB703] text-[#1A1A1A] hover:bg-[#E09A05] transition-all duration-300 sm:flex hidden">Sign
                    up
                </button>

                <CiMenuFries
                    className="text-[1.8rem] dark:text-[#abc2d3] mr-1 text-[#E09A05] cursor-pointer md:hidden flex"
                    onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}/>
            </div>

            {/* mobile sidebar */}
            <aside
                className={` ${mobileSidebarOpen ? "translate-x-0 opacity-100 z-20" : "translate-x-[200px] opacity-0 z-[-1]"} md:hidden bg-white px-[20px] py-[20px] text-left absolute top-[50px] dark:bg-slate-700 right-0 w-full sm:w-[50%] rounded-md transition-all duration-300 flex flex-col gap-[16px] `}>
                

                <ul className="items-start gap-[16px] text-[1rem] text-[#1A1A1A] flex flex-col">

                    <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">home</li>

                    <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Menu</li>

                    <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Reservation</li>

                    <li className="before:w-0 hover:before:w-full before:bg-[#E09A05] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#E09A05] transition-all duration-300 before:left-0 cursor-pointer capitalize">Cart</li>

                </ul>

                <button
                    className=" text-[1rem]  capitalize  text-[#1A1A1A] hover:bg-[#E09A05] transition-all duration-300 flex md:hidden ">Sign up
                </button>
            </aside>
        </nav>
    );
};

export default ResponsiveNavbar;
          