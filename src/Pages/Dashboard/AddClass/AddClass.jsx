import React, { useContext } from 'react';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const img_hosting_token = import.meta.env.VITE_IMAGE_TOKEN;

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;


    const {register, handleSubmit, formState:{errors}} = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url,{
            method: 'POST',
            body: formData
        })
        .then( res => res.json())
        .then(imgRes => {
            if(imgRes.success){
                const imgURL = imgRes.data.display_url;
                const {name, instructorName , instructorEmail, availableSeats, price} = data;
                const classItem = {name, instructorName , instructorEmail, availableSeats: parseFloat(availableSeats) , price: parseFloat(price), image:imgURL, student: 0, status:'pending'}
                axiosSecure.post('/classes', classItem)
                .then(data => {
                    if(data.data.insertedId){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your Class Added!',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                })
            }
        })
    }
    return (
        <div className='w-full'>
            <SectionTitle heading={"Add An Class"}></SectionTitle>
            <div className='w-[992px] h-[500px] bg-[#F3F3F3] mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)} className=' w-full p-10'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Class Name</span>
                        </label>
                        <input {...register('name', { required: true })} type="text" placeholder="Enter your Class Name" className="input input-bordered w-full " />
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
                            <input {...register('availableSeats', { required: true })} type="text" placeholder='Enter Available Seats' className="input input-bordered w-full " />
                            {errors.availableSeats && <span className="text-red-600">Class Available Seats is required</span>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Price</span>
                            </label>
                            <input {...register('price', { required: true })} type="text" placeholder='Enter Price' className="input input-bordered w-full " />
                            {errors.price && <span className="text-red-600">Class Price is required</span>}
                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Class Image</span>
                        </label>
                        <input {...register('image', { required: true })} type="file" className="file-input file-input-bordered file-input-info w-full " />
                        {errors.image && <span className="text-red-600">Class Image is required</span>}
                    </div>
                    <div className='flex justify-center mt-4'>
                        <input className="btn btn-info " type="submit" value="Submit" />
                    </div>
                </form>

            </div>

        </div>
    );
};

export default AddClass;