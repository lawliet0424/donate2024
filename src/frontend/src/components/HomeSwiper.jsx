import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperSlide1 from "../assets/SwiperSlide1.png";
import SwiperSlide2 from "../assets/SwiperSlide2.png";
import SwiperSlide3 from "../assets/SwiperSlide3.png";



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HomeSwiper.css';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const HomeSwiper = () => {
  return (
    <div className="HomeSwiper">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide><img src={SwiperSlide1} /></SwiperSlide>
        <SwiperSlide><img src={SwiperSlide2} /></SwiperSlide>
        <SwiperSlide><img src={SwiperSlide3} /></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSwiper;