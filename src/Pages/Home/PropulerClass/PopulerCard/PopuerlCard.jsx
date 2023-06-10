import React from 'react';

const PopuerlCard = ({ classData }) => {
    const { name , instructorName, availableSeats, price, image} = classData;
  return (
      <div className="card w-[350px] lg:w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt={name} />
        </figure>
        <div className="card-body">
        <h2 className="card-title font-extrabold text-3xl uppercase text-blue-400 justify-center">{name}</h2>
                    <p className='text-lg'> Instructor: {instructorName}</p>
                    <h3 className='font-semibold'>Available seats: {availableSeats}</h3>
                    <h3 className='font-semibold'>Price: ${price}</h3>
                    <div className="card-actions justify-end">
                        <button className="btn btn-outline btn-info">Enroll</button>
                    </div>
        </div>
      </div>
  );
};

export default PopuerlCard;
