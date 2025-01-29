import React, { useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { BiMenu } from "react-icons/bi";
import {
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Settings, Logout } from "@mui/icons-material";

import * as Actions from "../../store/actions/userActions";

const NAV_LINKS = [
    { path: "/home", display: "Home" },
    { path: "/facilitator", display: "Find a Facilitator" },
    { path: "/services", display: "Services" },
    { path: "/about", display: "About Us" },
    { path: "/contact", display: "Contact" },
];

const Header = () => {
    const { isAuth, userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const headerRef = useRef(null);
    const menuRef = useRef(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        const handleStickyHeader = () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current.classList.add("sticky__header");
            } else {
                headerRef.current.classList.remove("sticky__header");
            }
        };

        window.addEventListener("scroll", handleStickyHeader);
        return () => window.removeEventListener("scroll", handleStickyHeader);
    }, []);

    const toggleMenu = () => {
        menuRef.current.classList.toggle("show__menu");
    };

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAvatarClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(Actions.logout());
        navigate("/home");
        setAnchorEl(null);

    };

    return (
        <header className="header flex items-center" ref={headerRef}>
            <div className="container">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div>
                        <img src="assets/image/logo.png" alt="Logo" />
                    </div>

                    {/* Navigation Links */}
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex items-center gap-[2.7rem]">
                            {NAV_LINKS.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-primaryColor text-[16px] leading-7 font-[600]"
                                                : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                                        }
                                    >
                                        {link.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center gap-4">
                        {isAuth ? (
                            <>
                                <span
                                    className="hidden sm:inline md:hidden lg:inline cursor-pointer underline justify-center font-bold"
                                    style={{ userSelect: "none" }}
                                >
                                    {userInfo?.name}
                                </span>

                                <IconButton
                                    onClick={handleAvatarClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={isMenuOpen ? "account-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={isMenuOpen ? "true" : undefined}
                                >
                                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                        {userInfo?.name[0]}
                                    </Avatar>
                                </IconButton>
                            </>
                        ) : (
                            <button
                                className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                        )}

                        {/* Mobile Menu Icon */}
                        <span className="md:hidden" onClick={toggleMenu}>
                            <BiMenu className="w-6 h-6 cursor-pointer" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Avatar Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={isMenuOpen}
                onClose={handleAvatarClose}
                style={{ zIndex: 9999999 }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleAvatarClose}>My Tickets</MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        navigate("/profile");
                    }}
                >
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </header>
    );
};

export default Header;