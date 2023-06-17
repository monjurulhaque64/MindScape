import React from 'react';
import './natFounde.css'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='container mx-auto'>
            <div className="not-found">
                <div className="not-found-content">
                    <h1>404</h1>
                    <p>Oops! Page not found.</p>
                    <Link to="/" className="home-btn">
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;