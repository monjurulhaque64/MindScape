import React from 'react';
import useCart from '../../Hooks/useCart';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import { Link } from 'react-router-dom';

const MyEnrollClases = () => {
    const [cart] = useCart();
    const data = cart?.data;
    const paymentsData = data?.filter((cartItem) => cartItem.paymentStatus === 'paid');
    return (
        <div className='w-full'>
            <SectionTitle heading={"My all classes"}></SectionTitle>
            <div className='font-bold flex justify-evenly mt-10'>
                <h3>Total Classes: {paymentsData?.length}</h3>
                <Link to={'/dashboard/addreview'}><button className="btn btn-info">Review</button></Link>
            </div>
            <div className="overflow-x-auto mt-10 mb-10 ml-5">
                <table className="table">
                    <thead className='bg-blue-400 rounded-lg text-white font-extrabold'>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentsData?.length > 0 ? (
                            paymentsData?.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{item.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.instructorName}</td>
                                    <td>$ {item.transactionId}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>No items in the cart</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyEnrollClases;