import React from 'react';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import { FcFeedback } from 'react-icons/fc';
import { FaPen } from 'react-icons/fa';

const ManageInstractorClass = () => {
    return (
        <div className='w-full ml-4'>
            <SectionTitle heading={"Manage All Class"}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-blue-400 rounded-lg text-white font-extrabold'>
                        <tr>
                            <th>#</th>
                            <th>Class Photo</th>
                            <th>Class Name</th>
                            <th>Enroll Students</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                            <div className="font-bold">Hart Hagerty</div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-outline btn-success text-2xl"><FaPen></FaPen></button>
                            </th>
                            <th>
                                <button className="btn btn-outline btn-success text-2xl"><FcFeedback></FcFeedback></button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageInstractorClass;
