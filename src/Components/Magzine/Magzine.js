import React from "react";

import "../Magzine/Magzine.css";
import { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import Full from "../Courses/Full";
function Magzine() {
  return (
    <>
      <div className="content">
        <div className="container">
          <h1 className="text1">Magazines & Hand-Book</h1>
          <h5 className="text2 text111 magazine-box ">
            Engineerhub issues various magazines & handbooks regularly that
            contribute to expanding knowledge for the benefit of students.
          </h5>

          <Swiper
            modules={[Autoplay]}
            loop={true}
            spaceBetween={26}
            breakpoints={{
              320: {
                width: 311,
                slidesPerView: 1,
              },
              768: {
                width: 700,
                slidesPerView: 2,
              },
              1024: {
                width: 900,
                slidesPerView: 3,
              },
              1440: {
                width: 1274,
                slidesPerView: 4,
              },
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <Full />
            </SwiperSlide>
            <SwiperSlide>
              <Full />
            </SwiperSlide>
            <SwiperSlide>
              <Full />
            </SwiperSlide>
            <SwiperSlide>
              <Full />
            </SwiperSlide>
            <SwiperSlide>
              <Full />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Magzine;
