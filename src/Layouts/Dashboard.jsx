import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { NavLink, Outlet } from 'react-router-dom';
import { FcBookmark, FcPaid } from "react-icons/fc";
import { FaChalkboard, FaChalkboardTeacher, FaHome, FaWallet } from "react-icons/fa";


const Dashboard = () => {
    return (
        <div className='container mx-auto'>
            <div className='pt-16'>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        <Outlet></Outlet>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full bg-blue-500 text-base-content font-semibold">
                            <li><NavLink to={'/dashboard/myhome'}><FaHome ></FaHome>Student Home</NavLink></li>
                            <li><NavLink to={'/dashboard/myselectedclass'}><FcBookmark></FcBookmark>Selected Class</NavLink></li>
                            <li><NavLink to={'/dashboard/myenrollclass'}><FcPaid></FcPaid>Enrolled Classes</NavLink></li>
                            <li><NavLink to={'/dashboard/paymenthistory'}><FaWallet></FaWallet>Payment History</NavLink></li>
                            <div className="divider "></div>
                            <li><NavLink to={'/'}><FaHome></FaHome> Home</NavLink></li>
                            <li><NavLink to={'/classes'}><FaChalkboard></FaChalkboard> Classes</NavLink></li>
                            <li><NavLink to={'/classes'}><FaChalkboardTeacher></FaChalkboardTeacher> Instectors</NavLink></li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;