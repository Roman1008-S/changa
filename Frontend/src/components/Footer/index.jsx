import React from "react";
import { Link } from "react-router-dom";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillGithub, AiOutlineInstagram } from "react-icons/ai";

// Social Links
const socialLinks = [
    {
        path: "https://www.linkedin.com",
        icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
    },
    {
        path: "https://github.com",
        icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
    },
    {
        path: "https://www.instagram.com",
        icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
    },
];

// Quick Links Data
const quickLinks = {
    section1: [
        { path: "/home", display: "Home" },
        { path: "/", display: "About Us" },
        { path: "/services", display: "Services" },
        { path: "/", display: "Blog" },
    ],
    section2: [
        { path: "/find-a-facilitator", display: "Find a Facilitator" },
        { path: "/", display: "Request an Appointment" },
        { path: "/", display: "Find a Location" },
        { path: "/", display: "Get an Opinion" },
    ],
    section3: [
        { path: "/", display: "Donate" },
        { path: "/contact", display: "Contact Us" },
    ],
};

const Footer = () => {
    return (
        <footer className="pb-16 pt-10">
            <div className="container">
                <div className="flex flex-col md:flex-row flex-wrap gap-[30px] justify-between">
                    {/* Footer Logo and Social Links */}
                    <div>
                        <img src="assets/image/logo.png" alt="Footer Logo" />
                        <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
                            Copyright © {new Date().getFullYear()} <br />
                            Developed By <b>Roman Shnitko</b> <br />
                            All Rights Reserved.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            {socialLinks.map((link, index) => (
                                <a
                                    href={link.path}
                                    key={index}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Sections */}
                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                            Quick Links
                        </h2>
                        <ul>
                            {quickLinks.section1.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link
                                        to={item.path}
                                        className="text-[16px] leading-7 font-[400] text-textColor"
                                    >
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                            I Want To
                        </h2>
                        <ul>
                            {quickLinks.section2.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link
                                        to={item.path}
                                        className="text-[16px] leading-7 font-[400] text-textColor"
                                    >
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                            Support
                        </h2>
                        <ul>
                            {quickLinks.section3.map((item, index) => (
                                <li key={index} className="mb-4">
                                    <Link
                                        to={item.path}
                                        className="text-[16px] leading-7 font-[400] text-textColor"
                                    >
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;