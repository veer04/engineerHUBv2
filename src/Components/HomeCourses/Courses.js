import React from "react";
import { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles

import "swiper/css/pagination";

import "swiper/css";
import "../Events/Events.css";
import "./Courses.css";

import CoursesCard from "./CoursesCard";

function Events() {
  return (
    <>
      <div className="content contentEvent ">
        <div className="container">
          <h1 className="text1">Free Courses</h1>
          <h5 className="text2 text111 courses-box">
            Engineerhub aims to provide several free courses to students to
            provide necessary material with utmost ease.
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
              <CoursesCard />
            </SwiperSlide>
            <SwiperSlide>
              <CoursesCard />
            </SwiperSlide>
            <SwiperSlide>
              <CoursesCard />
            </SwiperSlide>
            <SwiperSlide>
              <CoursesCard />
            </SwiperSlide>
            <SwiperSlide>
              <CoursesCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Events;
