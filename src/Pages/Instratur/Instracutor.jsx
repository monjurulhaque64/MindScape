import React, { useEffect, useState } from 'react';
import SectionTitle from '../Compo/SectionTitle/SctionTitle';
import InstructorCard from './InstructorCard';

const Instracutor = () => {
  const [instructor, setInstructor] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => {
        setInstructor(data.filter(user => user.userRole === 'instructor'));
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredInstructor = instructor.filter((instructorUser) =>
    instructorUser?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='pt-20'>
      <SectionTitle
        heading={'Our all Instructor'}
        subHeading={
          'Let the melodies guide you as you embark on a musical journey, playing instruments and discovering your voice'
        }
      ></SectionTitle>
      <div className='flex justify-center mb-4'>
        <input
          type='text'
          placeholder='Search class...'
          value={searchTerm}
          onChange={handleSearch}
          className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 my-10 mx-auto'>
        {filteredInstructor.map((instructorUser) => (
          <InstructorCard
          key={instructorUser._id}
          instructor={instructorUser}
          ></InstructorCard>
        ))}
      </div>
    </div>
  );
};

export default Instracutor;
