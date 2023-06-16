import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateClass = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const classData = useLoaderData();
  const {_id ,name, availableSeats ,price} = classData;
  console.log(classData)


  

  const onSubmit = (data) => {
    console.log(data);
    const { name, availableSeats, price } = data;
    const classItem = {name, availableSeats: parseFloat(availableSeats), price: parseFloat(price) };
    const id = _id; 
    
    axiosSecure.patch(`/classes/instructor/${id}`, classItem) 
      .then((response) => {
        if (response.data) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Class has been updated!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Update error:', error);
      });
  };
  

    return (
        <div className='w-full'>
        <SectionTitle heading={"Add An Class"}></SectionTitle>
        <div className='w-[992px] h-[400px] bg-[#F3F3F3] mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className=' w-full p-10'>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Class Name</span>
                    </label>
                    <input {...register('name', { required: true })} type="text" defaultValue={name} className="input input-bordered w-full " />
                    {errors.name && <span className="text-red-600">Class Name is required</span>}
                </div>
                <div className='flex gap-4'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Instructor Name</span>
                        </label>
                        <input {...register('instructorName', { required: true })} type="text" defaultValue={user.displayName} readOnly className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Instructor Email</span>
                        </label>
                        <input {...register('instructorEmail', { required: true })} type="text" defaultValue={user.email} readOnly className="input input-bordered w-full " />
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Available Seats</span>
                        </label>
                        <input {...register('availableSeats', { required: true })} type="text" defaultValue={availableSeats} className="input input-bordered w-full " />
                        {errors.availableSeats && <span className="text-red-600">Class Available Seats is required</span>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Price</span>
                        </label>
                        <input {...register('price', { required: true })} type="text" defaultValue={price} className="input input-bordered w-full " />
                        {errors.price && <span className="text-red-600">Class Price is required</span>}
                    </div>
                </div>
                <div className='flex justify-center mt-4'>
                    <input className="btn btn-info " type="submit" value="Submit" />
                </div>
            </form>

        </div>

    </div>
    );
};

export default UpdateClass;