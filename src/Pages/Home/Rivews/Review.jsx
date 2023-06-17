import React, { useEffect, useState } from 'react';
import { animated as motion } from 'react-spring';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { Rating } from '@smastrom/react-rating';
import SectionTitle from '../../Compo/SectionTitle/SctionTitle';
import '@smastrom/react-rating/style.css';
import QuotationMark from '../../../assets/banner/QuotationMark.png';

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('https://mindscape-server.vercel.app/review')
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div>
      <SectionTitle heading={"Our Student's Say's"} subHeading={"Don't watch the clock; do what it does. Keep going."} />
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review, index) => (
          <SwiperSlide key={review._id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mx-24 my-16 flex flex-col items-center"
            >
              <img className="w-20 mb-4" src={QuotationMark} alt="" />
              <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
              <p className="py-8">{review.review}</p>
              <h3 className="text-2xl text-orange-400">{review.name}</h3>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
