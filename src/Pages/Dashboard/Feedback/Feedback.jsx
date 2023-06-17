import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const Feedback = () => {
    const classData = useLoaderData();
    const {_id} = classData;
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const { feedback } = data;
        const newData = { feedback };
        const id = _id;
      
        axiosSecure.patch(`/classes/feedback/${id}`, newData)
          .then((response) => {
            if (response.data) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Class Feedback has been updated!',
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
        <div>
            <div className='w-full'>
                <SectionTitle heading={"Give A Feedback"}></SectionTitle>
                <div className='w-[992px] h-[350px] bg-[#F3F3F3] mx-auto'>
                    <form onSubmit={handleSubmit(onSubmit)} className=' w-full p-10'>
                    <div className='flex gap-4'>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-lg font-semibold">Instructor Name</span>
                                </label>
                                <input  type="text" defaultValue={classData.name} readOnly className="input input-bordered w-full " />
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-lg font-semibold">Instructor Email</span>
                                </label>
                                <input type="text" defaultValue={classData.instructorEmail} readOnly className="input input-bordered w-full " />
                            </div>
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Class Name</span>
                            </label>
                            <input {...register('feedback', { required: true })} type="text" placeholder='Enter a feedback'  className="input input-bordered w-full h-[70px]" />
                            {errors.name && <span className="text-red-600">Class Name is required</span>}
                        </div>
                        <div className='flex justify-center mt-4'>
                            <input className="btn btn-info " type="submit" value="Submit" />
                        </div>
                    </form>

                </div>

            </div>

        </div>
    );
};

export default Feedback;