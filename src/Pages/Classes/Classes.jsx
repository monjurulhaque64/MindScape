import React, { useState } from 'react';
import SectionTitle from '../Compo/SectionTitle/SctionTitle';
import ClassesCard from './ClassesCard';
import useClasses from '../Hooks/useClasses';

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [classes] = useClasses();
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 20; 

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const filteredClasses = classes.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) && classItem.status === 'approve'
  );

  const pageCount = Math.ceil(filteredClasses.length / classesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentPageClasses = filteredClasses.slice(
    indexOfFirstClass,
    indexOfLastClass
  );

  return (
    <div className='pt-20'>
      <SectionTitle
        heading={'Our all Classes'}
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
        {currentPageClasses.map((classItem) => {
          const isEnrollDisabled = classItem.availableSeats === 0;
          return (
            <ClassesCard
              key={classItem._id}
              classItem={classItem}
              isEnrollDisabled={isEnrollDisabled}
            />
          );
        })}
      </div>
      <div className='pagination-container mx-auto flex justify-end mb-4'>
        <div className="join">
          <button
            className={`join-item btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            «
          </button>
          <button className="join-item btn">{`Page ${currentPage}`}</button>
          <button
            className={`join-item btn ${currentPage === pageCount ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classes;
