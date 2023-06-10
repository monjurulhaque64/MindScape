import React, { useEffect, useState } from 'react';
import SectionTitle from '../Compo/SectionTitle/SctionTitle';
import ClassesCard from './ClassesCard';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('Class.json')
            .then((res) => res.json())
            .then((data) => {
                setClasses(data);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredClasses = classes.filter((classItem) =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='pt-20'>
            <SectionTitle
                heading={"Our all Classes"}
                subHeading={"Let the melodies guide you as you embark on a musical journey, playing instruments and discovering your voice"}
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
                {filteredClasses.map((classItem) => {
                    const isEnrollDisabled = classItem.availableSeats === 0;
                    return <ClassesCard key={classItem._id} classItem={classItem} isEnrollDisabled={isEnrollDisabled} />;
                })}
            </div>
        </div>
    );
};

export default Classes;
