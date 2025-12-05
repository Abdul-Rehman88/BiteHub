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
        company:[
        {name:"About Us",path:"/about"},
        {name:"FAQs",path:"/faqs"},
        {name:"Contact Us",path:"/contact"}
        ]   
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
                <div className="flex gap-20 lg:w-1/2">

                    {/* Quick Links */}
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Quick Links</h3>

                        <div className="flex flex-col gap-2">
                            {FooterLinks.main.map((links,index)=>
                            
                                <NavLink 
                                    to={links.path}
                                    key={index}
                                    className={({isActive})=>
                                    (isActive) ?  "text-[#E09A05]" : "text-sm text-gray-600 hover:text-[#E09A05] transition-colors duration-300"
                                    }>
                                    {links.name}
                                </NavLink>    
                            )}    
                        </div>
                    </div>

                    {/* Company */}
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Company</h3>
                        <div className="flex flex-col gap-2">
                            {FooterLinks.company.map((links,index)=>(
                                <NavLink 
                                    to={links.path}
                                    key={index} 
                                    className={({isActive})=>
                                    (isActive) ?  "text-[#E09A05]" : "text-sm text-gray-600 hover:text-[#E09A05] transition-colors duration-300"
                                    }>
                                    {links.name}
                                </NavLink>
                            ))}
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
