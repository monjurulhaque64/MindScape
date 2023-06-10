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
      <div className="banner-slide relative">
        <img src={banner1} className="banner-image" alt="Banner 1" />
        <div className="banner-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black">
          <h2 className="text-3xl title font-bold mb-4 text-black">MindScape Summer Camp: Explore, Discover, Create!</h2>
          <p className="text-lg hidden-on-mobile mb-6">Unleash your child's creativity and curiosity at MindScape Summer Camp - where unforgettable adventures await!</p>
          <button className="btn btn-info">See All Classes</button>
        </div>
      </div>
      <div className="banner-slide relative">
        <img src={banner2} className="banner-image" alt="Banner 2" />
        <div className="banner-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h2 className="text-3xl title font-bold mb-4">Unleash Your Imagination at MindScape Summer Camp</h2>
          <p className="text-lg hidden-on-mobile mb-6">Join us for an enriching summer experience at MindScape Summer Camp - where learning and fun collide!</p>
          <button className="btn btn-info">See All Classes</button>
        </div>
      </div>
      <div className="banner-slide relative">
        <img src={banner3} className="banner-image" alt="Banner 3" />
        <div className="banner-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h2 className="text-3xl title font-bold mb-4">MindScape Summer Adventures: Ignite Your Curiosity</h2>
          <p className="text-lg hidden-on-mobile  mb-6">Discover a world of excitement and friendship at MindScape Summer Camp - the perfect summer destination!</p>
          <button className="btn btn-info">See All Classes</button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
