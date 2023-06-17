import React, { useEffect, useState } from 'react';
import InstructorCard from '../../Instratur/InstructorCard';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';

const PropulerInstrutor = () => {
    const [instructor, setInstructor] = useState([]);
    useEffect(() => {
        fetch('https://mindscape-server.vercel.app/users')
            .then((res) => res.json())
            .then((data) => {
                setInstructor(data.filter(user => user.userRole === 'instructor').slice(0, 6));
            });
    }, []);

    return (
        <div>
            <SectionTitle heading="Popular Instructor" subHeading="Believe in yourself and your abilities, and you're already halfway towards achieving your goals." />
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 my-10  mx-auto'>
                {instructor.map((instructorUser) => (
                    <InstructorCard
                        key={instructorUser._id}
                        instructor={instructorUser}
                    ></InstructorCard>
                ))}
            </div>
        </div>
    );
};

export default PropulerInstrutor;