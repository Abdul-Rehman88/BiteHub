import React from "react";
import logo from "../../assets/images/logo.jpg"; // Adjust path if needed

// react icons
import { CgFacebook } from "react-icons/cg";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-white w-full px-5 lg:px-12 md:px-[30px] pt-12.5 pb-7.5">
            <div className="flex flex-col md:flex-row justify-between gap-5 w-full">
                
                <div className="flex flex-col  gap-2 lg:w-1/2">
                    <img src={logo} alt="logo" className="w-[120px]" />
                    <p className="text-gray-600 mt-4 text-sm max-w-[250px]">
                        BiteHub is your go-to platform for delicious meals and seamless reservations.
                    </p>
                    
                    <div>
                        <div className="flex gap-2 text-[#E09A05]">
                            <a className="text-xl p-1.5 cursor-pointer hover:text-white transition-all duration-300 rounded-full hover:bg-[#E09A05]">
                                <CgFacebook />
                            </a>
                            <a className="text-xl p-1.5 cursor-pointer hover:text-white transition-all duration-300 rounded-full hover:bg-[#E09A05]">
                                <BsInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-row gap-20 lg:w-1/2">

                    <div className=" lg:w-1/2">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Quick Links</h3>

                        <div className="flex flex-col gap-2">
                            <span><a className="text-sm text-gray-600 hover:text-[#E09A05] cursor-pointer transition-colors duration-300">Home</a></span>
                            <span><a className="text-sm text-gray-600 hover:text-[#E09A05] cursor-pointer transition-colors duration-300">Menu</a></span>
                            <span><a className="text-sm text-gray-600 hover:text-[#E09A05] cursor-pointer transition-colors duration-300">Reservation</a></span>
                            <span><a className="text-sm text-gray-600 hover:text-[#E09A05] cursor-pointer transition-colors duration-300">Cart</a></span>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className=" lg:w-1/2">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Company</h3>
                        <div className="flex flex-col gap-2">
                            <span><a className="text-sm text-gray-600 hover:text-[#E09A05] cursor-pointer transition-colors duration-300">About Us</a></span>
                            <span><a className="text-sm text-gray-600 hover:text-[#E09A05] cursor-pointer transition-colors duration-300">FAQs</a></span>
                            <span><a className="text-sm text-gray-600 hover:text-[#E09A05] cursor-pointer transition-colors duration-300">Contact Us</a></span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="border-t border-gray-200 pt-5 flex-row flex items-center gap-4 w-full justify-between mt-8">
                <p className="text-gray-400 text-[12px]">© 2024 All Rights Reserved.</p>
                <p className="text-gray-400 text-[12px]">Design By Abdul Rehman</p>
            </div>
        </footer>
    );
};

export default Footer;