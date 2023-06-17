import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const ClassesCard = ({ classItem, isEnrollDisabled }) => {
    const { name, instructorEmail, instructorName, availableSeats, price, image, _id, student } = classItem;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleEnroll = (classItem) => {
        console.log('Enrollment clicked for', classItem);
        if (user && user.email) {
            const enrollItem = {enrollClassID: _id, name, instructorName,
                availableSeats,
                student,
                 instructorEmail, price, image, email: user.email, paymentStatus: 'pending' }
            fetch('https://mindscape-server.vercel.app/enrolls', {
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(enrollItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your  Class Add to Cart!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please Login to Enroll this Class!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            })
        }
    };

    return (
        <div>
            {isEnrollDisabled ? (
                <div className=''>
                    <div className="card card-compact h-[450px] w-[350px] lg:w-96  bg-red-400 shadow-xl">
                        <figure>
                            <img src={image} alt={name} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-extrabold text-3xl uppercase text-blue-400 justify-center">{name}</h2>
                            <p className='text-lg '> Instructor: {instructorName}</p>
                            <h3 className='font-semibold'>Available seats: {availableSeats}</h3>
                            <h3 className='font-semibold'>Price: ${price}</h3>
                            <div className="card-actions justify-end">
                                <button disabled={isEnrollDisabled} className="btn btn-primary">Unavailable</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card card-compact h-[450px] w-[350px] lg:w-96 bg-base-100 shadow-xl">
                    <figure>
                        <img src={image} alt={name} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title font-extrabold text-3xl uppercase text-blue-400 justify-center">{name}</h2>
                        <p className='text-lg'> Instructor: {instructorName}</p>
                        <h3 className='font-semibold'>Available seats: {availableSeats}</h3>
                        <h3 className='font-semibold'>Students: {student}</h3>
                        <h3 className='font-semibold'>Price: ${price}</h3>
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-info" onClick={() => handleEnroll(classItem)}>Enroll</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassesCard;
