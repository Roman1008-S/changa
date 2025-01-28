import React, { useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavLinks = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/doctors',
        display: 'Find a Facilitator'
    },
    {
        path: '/services',
        display: 'Services'
    },
    {
        path: '/about',
        display: 'About Us'
    },
    {
        path: '/contact',
        display: 'Contact'
    },
]

const Header = () => {
    const { isAuth, userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const headerRef = useRef(null)
    const menuRef = useRef(null)

    const handleStickyHeader = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header')
            } else {
                headerRef.current.classList.remove('sticky__header')
            }
        })
    }

    useEffect(() => {
        handleStickyHeader()
        return () => window.removeEventListener('scroll', handleStickyHeader)
    })

    const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

    return (
        <header className="header flex items-center" ref={headerRef}>
            <div className="container">
                <div className="flex items-center justify-between">
                    <div>
                        <img src="assets/image/logo.png" alt="Logo" />
                    </div>

                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex items-center gap-[2.7rem]">
                            {
                                NavLinks.map((link, index) => <li key={index}>
                                    <NavLink to={link.path}
                                        className={navClass => navClass.isActive
                                            ? "text-primaryColor text-[16px] leading-7 font-[600]"
                                            : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                                        }
                                    >
                                        {link.display}
                                    </NavLink>
                                </li>)
                            }
                        </ul>
                    </div>

                    <div className='flex items-center gap-4'>
                        <div className='hidden'>
                            <Link to='/'>
                                <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                                    <img src="assets/image/avatar-icon.png" className='w-full rounded-full' alt="" />
                                </figure>
                            </Link>
                        </div>
                        {isAuth ? (<span className='hidden sm:inline md:hidden lg:inline cursor-pointer underline justify-center'>{userInfo?.name}</span>) : (
                            <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] 
                                flex items-center justify-center rounded-[50px]'
                                onClick={() => {
                                    navigate('/login')
                                }}
                            >
                                Login
                            </button>
                        )}
                        <span className='md:hidden' onClick={toggleMenu}>
                            <BiMenu className='w-6 h-6 cursor-pointer' />
                        </span>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header