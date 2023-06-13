import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import PopuerlCard from './PopulerCard/PopuerlCard';

const PopularClass = () => {
    const [popularClasses, setPopularClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then((res) => res.json())
            .then((data) => {
                setPopularClasses(data);
            });
    }, []);
    const popular = popularClasses
        .sort((a, b) => b.availableSeats - a.availableSeats)
        .slice(0, 6);


    console.log(popular)

    return (
        <div className='mx-auto'>
            <SectionTitle heading="Popular Classes" subHeading="Believe you can and you're halfway there." />
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 my-10  mx-auto'>
                {popular.map((classItem) => (
          <PopuerlCard key={classItem.id} classData={classItem} />
        ))}
            </div>
        </div>
    );
};

export default PopularClass;
