import React, { useContext } from 'react';
import { AuthContext } from '../../../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PopuerlCard = ({ classData }) => {
  const { _id, instructorEmail,  name, instructorName, availableSeats, price, image, student } = classData;

  const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleEnroll = () => {
      console.log('Enrollment clicked for', classData);
      if (user && user.email) {
        const enrollItem = {enrollClassID: _id, name, instructorName,
          availableSeats,
          student,
           instructorEmail, price, image, email: user.email, paymentStatus: 'pending'
        };
        fetch('http://localhost:5000/enrolls', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(enrollItem)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.insertedId) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Class Add to Cart!',
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
      } else {
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
        });
      }
    };


  return (
    <div className="card w-[350px] h-[450px] lg:w-96 bg-base-100 shadow-xl">
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
          <button onClick={ handleEnroll} className="btn btn-outline btn-info">Enroll</button>
        </div>
      </div>
    </div>
  );
};

export default PopuerlCard;
