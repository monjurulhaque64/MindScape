import React from 'react';
import Banner from '../Banner/Banner';
import PropulerClass from '../PropulerClass/PropulerClass';
import Review from '../Rivews/Review';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PropulerClass></PropulerClass>
            <Review></Review>
        </div>
    );
};

export default Home;