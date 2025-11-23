
import React from "react";

// react icons
import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 shadow-md rounded-xl w-full p-6 md:p-9">
            <div className="flex justify-between gap-[30px] flex-wrap w-full">
                <div className="">
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">About The
                        Store</h3>
                    <div className="flex flex-col gap-[8px] text-black">
                                            <span><a
                                                className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Home</a></span>
                        <span><a className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Become a customer</a></span>
                        <span><a className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">About us</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">FAQ</a></span>
                        <span><a className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Return policy</a></span>
                        <span><a className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Contact us</a></span>
                    </div>
                </div>

                <div className="">
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">Use Cases</h3>
                    <div className="flex flex-col gap-[8px] text-black">
                                            <span><a
                                                className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Use Cases</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Web-designers</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Marketers</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Small Business</a></span>
                        <span><a className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Website Builder</a></span>
                    </div>
                </div>

                <div className="">
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">Resources</h3>
                    <div className="flex flex-col gap-[8px] text-black">
                                            <span><a
                                                className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Resources</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Academy</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Blog</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Themes</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Hosting</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Developers</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Support</a></span>
                    </div>
                </div>


                <div className="">
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">Company</h3>
                    <div className="flex flex-col gap-[8px] text-black">
                                            <span><a
                                                className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">About Us</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Careers</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">FAQs</a></span>
                        <span><a
                            className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Teams</a></span>
                        <span><a className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">Contact Us</a></span>
                    </div>
                </div>

                <div className="">
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">Get in
                        touch</h3>
                    <div className="flex gap-[7px] text-black">
                        <a className="text-[1.3rem] p-1.5 cursor-pointer hover:text-white transition-all duration-300 dark:text-slate-400 rounded-full hover:bg-blue-400">
                            <CgFacebook/>
                        </a>
                        <a className="text-[1.2rem] p-1.5 cursor-pointer hover:text-white transition-all duration-300 dark:text-slate-400 rounded-full hover:bg-blue-400">
                            <BsTwitter/>
                        </a>
                        <a className="text-[1.2rem] p-1.5 cursor-pointer hover:text-white transition-all duration-300 dark:text-slate-400 rounded-full hover:bg-blue-400">
                            <BsInstagram/>
                        </a>
                        <a className="text-[1.2rem] p-1.5 cursor-pointer hover:text-white transition-all duration-300 dark:text-slate-400 rounded-full hover:bg-blue-400">
                            <BsLinkedin/>
                        </a>
                    </div>
                </div>
            </div>

            <div
                className="md:flex-row border-t dark:border-slate-700 border-gray-200 pt-[20px] flex-col flex items-center gap-[15px] w-full justify-between mt-8">

                <div
                    className="flex flex-wrap gap-y-[6px] gap-x-[15px] sm:gap-[15px] text-gray-400">
                                            <span><a
                                                className="text-[0.9rem] dark:text-slate-500 hover:text-blue-400 cursor-pointer">Privacy Policy</a></span>
                    <span><a
                        className="text-[0.9rem] dark:text-slate-500 hover:text-blue-400 cursor-pointer">Terms of Use</a></span>
                    <span><a
                        className="text-[0.9rem] dark:text-slate-500 hover:text-blue-400 cursor-pointer">Sales and Refunds</a></span>
                    <span><a
                        className="text-[0.9rem] dark:text-slate-500 hover:text-blue-400 cursor-pointer">Legal</a></span>
                    <span><a
                        className="text-[0.9rem] dark:text-slate-500 hover:text-blue-400 cursor-pointer">Site Map</a></span>
                </div>

                <p className="text-gray-400 dark:text-slate-500 cursor-pointer text-[0.8rem]">© 2024 All Rights
                    Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
                    