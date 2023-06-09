import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navItems = <>

        <li><Link>Home</Link></li>
        <li><Link>Instructor</Link></li>
        <li><Link>Classes</Link></li>
        <li><Link>Drashbord</Link></li>
        <li><Link>Sing In</Link></li>
        <li><Link>Sing Up</Link></li>
        
    </>
    return (
        <div className="navbar bg-base-100 mt-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl logo-name">MindScape</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://media.istockphoto.com/id/1485546774/photo/bald-man-smiling-at-camera-standing-with-arms-crossed.webp?b=1&s=170667a&w=0&k=20&c=c2rsC66nJQAjkN6vCkhyB0vLHUiZhJSACMCBVF9HJJs=" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;