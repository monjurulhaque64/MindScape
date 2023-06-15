import React from 'react';
import useCart from '../../Hooks/useCart';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import { AiFillCreditCard, AiFillDelete } from "react-icons/ai";
import Swal from 'sweetalert2';

const MySelectedClasses = () => {
    const [cart, refetch] = useCart();
    console.log(cart?.data);
    const total = Array.isArray(cart?.data)
        ? cart.data.reduce((sum, item) => {
              return item.price + sum;
          }, 0)
        : 0;

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                console.log(item._id);
                fetch(`http://localhost:5000/enrolls/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your Class has been deleted.',
                                'success'
                            );
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    };

    return (
        <div className='w-full'>
            <SectionTitle heading={"Add more"} subHeading={"My Cart"}></SectionTitle>
            <div className='font-bold flex justify-evenly mt-10'>
                <h3>Total Selected Class: {cart.data?.length}</h3>
                <h3>Total Price: {total}</h3>
            </div>
            <div className="overflow-x-auto mt-10 mb-10 ml-5">
                <table className="table">
                    <thead className='bg-blue-400 rounded-lg text-white font-extrabold'>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.data?.length > 0 ? (
                            cart.data.map((item, index) => (
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
                                    <td>$ {item.price}</td>
                                    <td>
                                        <button className="btn btn-outline btn-success">
                                            <AiFillCreditCard />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="btn btn-outline btn-warning ml-2"
                                        >
                                            <AiFillDelete />
                                        </button>
                                    </td>
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

export default MySelectedClasses;
