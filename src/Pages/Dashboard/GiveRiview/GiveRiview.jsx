import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../Provider/AuthProvider';

const GiveReview = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { rating, review } = data;

        const newData = {
            rating,
            review,
            name: user.displayName,
            email: user.email
        };

        axiosSecure.post('/review', newData)
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Review Submitted',
                    text: 'Thank you for your review!',
                });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to submit the review.',
                });
            });
    };

    return (
        <div>
            <div className='w-full'>
                <SectionTitle heading={"Give A Review"}></SectionTitle>
                <div className='w-[992px] h-[350px] bg-[#F3F3F3] mx-auto'>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full p-10'>
                        <div className='flex gap-4'>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-lg font-semibold">Name</span>
                                </label>
                                <input {...register('name', { required: true })} type="text" defaultValue={user.displayName} readOnly className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-lg font-semibold">Rating</span>
                                </label>
                                <input {...register('rating', { required: true })} type="number" min={0} max={5} className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Write Your Feelings</span>
                            </label>
                            <input {...register('review', { required: true })} type="text" placeholder='Enter a review' className="input input-bordered w-full h-[70px]" />
                            {errors.review && <span className="text-red-600">Review is required</span>}
                        </div>
                        <div className='flex justify-center mt-4'>
                            <input className="btn btn-info" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GiveReview;
