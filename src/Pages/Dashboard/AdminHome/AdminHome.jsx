import React, { useState, useEffect, useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import './adminHome.css'



const AdminHome = () => {
    const [adminData, setAdminData] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [axiosSecure] = useAxiosSecure();
    const { user } = useContext(AuthContext);

    useEffect(() => {


        const totalUsers = async () => {
            try {
                const response = await axiosSecure.get('/users');
                setTotalUsers(response.data.length);
            } catch (error) {
                console.log(error);
            }
        };

        const totalClasses = async () => {
            try {
                const response = await axiosSecure.get('/classes');
                setTotalClasses(response.data.length);
            } catch (error) {
                console.log(error);
            }
        };

        totalUsers();
        totalClasses();
    }, [axiosSecure]);
    console.log(user)

    return (
        <div className='w-full'>
            <SectionTitle heading={"Admin Information"}></SectionTitle>
            <div className='mt-10 flex'>
                <div className='admin-info '>
                    <div className='pt-6'>
                        <img className='admin-image rounded-full mt-10 ' src={user.photoURL} alt="" />
                        <h3 className='title'>{user.displayName}</h3>
                    </div>
                </div>
                <div className='admin-details '>
                    <div className='pt-6 ml-5 my-5'>
                        <h1 className='uppercase text-center text-3xl font-bold'>Overview</h1>
                        <h3 className='text-xl font-semibold'>Total Users: {totalUsers}</h3>
                        <h3 className='text-xl font-semibold'>Total Classes: {totalClasses}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminHome;
