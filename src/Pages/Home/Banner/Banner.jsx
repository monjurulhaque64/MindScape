import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../../assets/banner/banner1.jpg';
import banner2 from '../../../assets/banner/banner2.jpg';
import banner3 from '../../../assets/banner/banner3.jpg';
import './Banner.css';

const Banner = () => {
  return (
    <Carousel>
      <div className="banner-slide">
        <img src={banner1} className="banner-image" alt="Banner 1" />
        <div className="banner-content">
          <h2>Slide 1 Title</h2>
          <p>Slide 1 description goes here.</p>
          <button className="banner-button">Button 1</button>
        </div>
      </div>
      <div className="banner-slide">
        <img src={banner2} className="banner-image" alt="Banner 2" />
        <div className="banner-content">
          <h2>Slide 2 Title</h2>
          <p>Slide 2 description goes here.</p>
          <button className="banner-button">Button 2</button>
        </div>
      </div>
      <div className="banner-slide">
        <img src={banner3} className="banner-image" alt="Banner 3" />
        <div className="banner-content">
          <h2>Slide 3 Title</h2>
          <p>Slide 3 description goes here.</p>
          <button className="banner-button">Button 3</button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
