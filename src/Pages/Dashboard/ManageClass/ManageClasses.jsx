import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import Swal from 'sweetalert2';
import { AiFillCheckCircle, AiOutlineClose, AiTwotoneEdit } from 'react-icons/ai';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();


    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await fetch('https://mindscape-server.vercel.app/classes');
        return res.json();
    });



    const handleApprove = classeData => {
        fetch(`https://mindscape-server.vercel.app/classes/approve/${classeData._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                        .then(() => {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `${classeData.name} Approved!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                        .catch(error => {
                            console.log('Error while refetching data:', error);
                        });
                }
            })
            .catch(error => {
                console.log('Error while updating user:', error);
            });
    };

    const handleDeny = classeData => {
        fetch(`https://mindscape-server.vercel.app/classes/deny/${classeData._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch()
                        .then(() => {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `${classeData.name} Deny!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                        .catch(error => {
                            console.log('Error while refetching data:', error);
                        });
                }
            })
            .catch(error => {
                console.log('Error while updating user:', error);
            });
    };
    return (
        <div className='w-full'>
            <SectionTitle heading={'All Classes'} subHeading={'Here All MindScape Classes'}></SectionTitle>
            <div className='overflow-x-auto'>
                <table className='table'>
                    <thead className='bg-blue-400 rounded-lg text-white font-extrabold'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Instructor name</th>
                            <th>Instructor email</th>
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>Actions</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classeData, index) => (
                            <tr key={classeData._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className='flex items-center space-x-3'>
                                        <div className='avatar'>
                                            <div className='mask mask-squircle w-12 h-12'>
                                                <img src={classeData.image} alt={classeData.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className='font-bold'>{classeData.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{classeData.instructorName}</td>
                                <td>{classeData.instructorEmail}</td>
                                <th>{classeData.availableSeats}</th>
                                <th>{classeData.price}</th>
                                <th>
                                    {classeData.status === 'pending' && (
                                        <div>
                                            <button onClick={() => handleApprove(classeData)} className='btn btn-info'>
                                                <AiFillCheckCircle></AiFillCheckCircle>
                                            </button>
                                            <button onClick={() => handleDeny(classeData)} className='btn btn-success ml-2'>
                                                <AiOutlineClose></AiOutlineClose>
                                            </button>
                                        </div>
                                    )}
                                    {classeData.status === 'approve' && (
                                        <div>
                                            <button className='btn btn-info' disabled>
                                                <AiFillCheckCircle></AiFillCheckCircle>
                                            </button>
                                            <button onClick={() => handleDeny(classeData)} className='btn btn-success ml-2'>
                                                <AiOutlineClose></AiOutlineClose>
                                            </button>
                                        </div>
                                    )}
                                    {classeData.status === 'deny' && (
                                        <div>
                                            <button onClick={() => handleApprove(classeData)} className='btn btn-info' >
                                                <AiFillCheckCircle></AiFillCheckCircle>
                                            </button>
                                            <button className='btn btn-success ml-2' disabled>
                                                <AiOutlineClose></AiOutlineClose>
                                            </button>
                                        </div>
                                    )}
                                </th>
                                <th>

                                    <Link to={`feedback/${classeData._id}`}>
                                        <button className='btn btn-info' >
                                            <AiTwotoneEdit></AiTwotoneEdit>
                                        </button>
                                    </Link>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;
