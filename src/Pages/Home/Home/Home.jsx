import React from 'react';
import Banner from '../Banner/Banner';
import PropulerClass from '../PropulerClass/PropulerClass';
import Review from '../Rivews/Review';
import SuccessStudent from '../SuccessStudent/SuccessStudent';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PropulerClass></PropulerClass>
            <SuccessStudent></SuccessStudent>
            <Review></Review>
        </div>
    );
};

export default Home;