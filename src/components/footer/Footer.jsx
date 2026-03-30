import logo from "../../assets/images/logo2.jpg"; 
import { Link, NavLink } from "react-router-dom";

// react icons
import { CgFacebook } from "react-icons/cg";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
    const FooterLinks = {
        main:[
        {name:"Home",path:"/"},
        {name:"Menu",path:"/menu"},
        {name:"Reservation",path:"/reservation"},
        {name:"Cart",path:"/cart"}
        ],   
    }
    return (
        <footer className="bg-white w-full px-5 lg:px-[50px] md:px-[30px] pt-12.5 pb-7.5">
            <div className="flex flex-col md:flex-row justify-between gap-5 w-full">
                
                {/* Logo + description */}
                <div className="flex flex-col gap-2 lg:w-1/2">
                    <img src={logo} alt="logo" className="w-[120px]" />

                    <p className="text-gray-600 mt-4 text-sm max-w-[250px]">
                        BiteHub is your go-to platform for delicious meals and seamless reservations.
                    </p>

                    <div className="flex gap-2 text-[#E09A05] mt-2">
                        <a
                            href="#"
                            className="text-xl p-1.5 hover:text-white transition-colors duration-300 rounded-full hover:bg-[#E09A05]"
                        >
                            <CgFacebook />
                        </a>

                        <a
                            href="#"
                            className="text-xl p-1.5 hover:text-white transition-colors duration-300 rounded-full hover:bg-[#E09A05]"
                        >
                            <BsInstagram />
                        </a>
                    </div>
                </div>

                {/* Links Sections */}
                <div className="flex gap-18 md:gap-8 lg:gap-20 lg:w-1/2">

                    {/* Quick Links */}
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Quick Links</h3>

                        <div className="flex flex-col gap-2">
                            {FooterLinks.main.map((links,index)=>         
                                <NavLink
                                    to={links.path}
                                    key={index}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-[#E09A05] flex items-center gap-1"
                                            : "text-sm text-gray-600 hover:text-[#E09A05] transition-colors duration-300 flex items-center gap-1 group"
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 h-3 hidden lg:inline-block lg:opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    {links.name}
                                </NavLink>
                            )}    
                        </div>
                    </div>

                   {/* Contact Info */}
                    <div className="lg:w-1/3">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Contact Us</h3>
                        <div className="flex flex-col gap-3">

                         {/* Address - Google Maps Link */}

                            <a href="https://maps.google.com/?q=Clifton+Block+5+Karachi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-600 flex items-start gap-2 group hover:text-[#E09A05] transition-colors duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 mt-0.5 shrink-0 text-[#E09A05] group-hover:scale-110 transition-transform duration-300"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                                <span >123 Food Street, Block 5,<br/> Clifton, Karachi</span>
                            </a>

                            {/* Phone - Clickable */}

                            <a    href="tel:+923001234567"
                                className="text-sm text-gray-600 flex items-center gap-2 group hover:text-[#E09A05] transition-colors duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 shrink-0 text-[#E09A05] group-hover:scale-110 transition-transform duration-300"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.07 3.2a1 1 0 01-.23 1.02L7.5 9.5a16.06 16.06 0 006.99 7l1.6-1.6a1 1 0 011.02-.23l3.2 1.07a1 1 0 01.68.95V19a2 2 0 01-2 2C9.16 21 3 14.84 3 7V5z" />
                                </svg>
                                <span>+92 300 1234567</span>
                            </a>


                            {/* Hours */}
                            <div className="text-sm text-gray-600 flex items-center gap-2 group">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 shrink-0 text-[#E09A05]"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span> 7:00 PM – 2:00 AM</span>
                            </div>
                        </div>
                    </div>
            </div>
            </div>

                            

            {/* bottom footer */}
            <div className="border-t border-gray-200 pt-5 flex-row flex items-center gap-4 w-full justify-between mt-8">
                <p className="text-gray-400 text-[12px]">© 2024 All Rights Reserved.</p>
                <p className="text-gray-400 text-[12px]">Design By Abdul Rehman</p>
            </div>
            
        </footer>
    );
};

export default Footer;
