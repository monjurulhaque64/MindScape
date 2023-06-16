import React from 'react';

const InstructorCard = ({instructor}) => {
    const {name,userPhoto, email } = instructor;
    return (
        <div>
            <div className="card w-[350px] h-[450px] lg:w-96 bg-base-100 shadow-xl">
                <figure><img className='w-full h-60' src={userPhoto} alt="" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {name}
                    </h2>
                    <p>{email}</p>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;