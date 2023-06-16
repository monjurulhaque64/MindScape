import React from 'react';
import Banner from '../Banner/Banner';
import PropulerClass from '../PropulerClass/PropulerClass';
import Review from '../Rivews/Review';
import SuccessStudent from '../SuccessStudent/SuccessStudent';
import PropulerInstrutor from '../PropulerInstructor/PropulerInstrutor';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PropulerClass></PropulerClass>
            <PropulerInstrutor></PropulerInstrutor>
            <SuccessStudent></SuccessStudent>
            <Review></Review>
        </div>
    );
};

export default Home;