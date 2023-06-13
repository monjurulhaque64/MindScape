import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../Provider/AuthProvider';
import { BiLogInCircle } from "react-icons/bi";

const Navbar = () => {
    const { user, loggedOut } = useContext(AuthContext);
    console.log(user?.photoURL)

    const handleLogout = () =>{
        loggedOut()
        .then( () => {

        })
    }
    const navItems = <>

        <li><Link to={'/'}>Home</Link></li>
        <li><Link>Instructor</Link></li>
        <li><Link to={'/classes'}>Classes</Link></li>


        {
            user ? <>

                <li><Link to={'dashboard'}>Drashbord</Link></li>
            </> :

                <>
                    <li><Link to={'/login'}>Log In</Link></li>
                    <li><Link to={'/register'}>Register</Link></li>
                </>
        }
    </>
    return (
        <div className="navbar fixed z-10 bg-opacity-40 container bg-black text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box  w-52 text-black">
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
            <div className="sm:navbar-end ">
                <div className="avatar">
                    {
                        user && <>
                        <div className="w-10 rounded-full ">
                        <img src={user?.photoURL} />
                    </div>
                    <div className=''>
                        <button onClick={handleLogout} className="btn btn-active btn-ghost"><BiLogInCircle /></button>
                    </div>
                        </>
                    }

                </div>
            </div>

        </div>
    );
};

export default Navbar;