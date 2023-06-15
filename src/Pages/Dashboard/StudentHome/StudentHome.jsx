import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';


const StudentHome = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='mb-4 '>
            <SectionTitle heading={"Instructor Information"}></SectionTitle>
            <div className='bg-[#FFEDD5] w-[622px] h-[469px] '>
                <div className=' py-36'>
                    <img className='mx-auto  w-[158px] rounded-full' src={user.photoURL} alt="" />
                    <h1 className='text-center mt-4 text-3xl font-bold'>{user.displayName}</h1>
                </div>
                
            </div>
        </div>
    );
};

export default StudentHome;