import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FcBookmark, FcPaid } from "react-icons/fc";
import { FaChalkboard, FaChalkboardTeacher, FaHome, FaUserCog, FaWallet } from "react-icons/fa";
import useAdmin from '../Pages/Hooks/useAdmin';
import useInstructor from '../Pages/Hooks/useInstructor';

const Dashboard = () => {
  const {isAdmin} = useAdmin();
  const {isInstructor} = useInstructor();


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
              {isAdmin ? (
                <>
                  <li><NavLink to={'/dashboard/adminhome'}><FaHome></FaHome>Admin Home</NavLink></li>
                  <li><NavLink to={'/dashboard/manageclass'}><FaChalkboard></FaChalkboard>Manage Classes</NavLink></li>
                  <li><NavLink to={'/dashboard/allUsers'}><FaUserCog></FaUserCog>Manage Users</NavLink></li>
                  <li><NavLink to={'/dashboard/paymenthistory'}><FaWallet></FaWallet>Payment History</NavLink></li>
                </>
              ) : isInstructor ? (
                <>
                  <li><NavLink to={'/dashboard/instructorhome'}><FaHome></FaHome>Instructor Home</NavLink></li>
                  <li><NavLink to={'/dashboard/manageinstructorclass'}><FcBookmark></FcBookmark>Manage Classes</NavLink></li>
                  <li><NavLink to={'/dashboard/addclass'}><FcPaid></FcPaid>Add Class</NavLink></li>
                  <li><NavLink to={'/dashboard/paymenthistory'}><FaWallet></FaWallet>Payment History</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to={'/dashboard/myhome'}><FaHome></FaHome>Student Home</NavLink></li>
                  <li><NavLink to={'/dashboard/myselectedclass'}><FcBookmark></FcBookmark>Selected Class</NavLink></li>
                  <li><NavLink to={'/dashboard/myenrollclass'}><FcPaid></FcPaid>Enrolled Classes</NavLink></li>
                  <li><NavLink to={'/dashboard/paymenthistory'}><FaWallet></FaWallet>Payment History</NavLink></li>
                </>
              )}

              <div className="divider "></div>
              <li><NavLink to={'/'}><FaHome></FaHome> Home</NavLink></li>
              <li><NavLink to={'/classes'}><FaChalkboard></FaChalkboard> Classes</NavLink></li>
              <li><NavLink to={'/instructors'}><FaChalkboardTeacher></FaChalkboardTeacher> Instructors</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
