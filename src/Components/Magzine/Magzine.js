import React from "react";

import "../Magzine/Magzine.css";
import { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles

import "swiper/css/pagination";
import { coursesData } from "../HomeCourses/Courses";
import "swiper/css";
import "swiper/css/autoplay";
import Full from "../Courses/Full";
function Magzine() {
  return (
    <>
      <div className="content">
        <div className="container">
          <h1 className="text1 txt">Magazines & Hand-Book</h1>
          <h5 className="text2 text111 magazine-box ">
            Engineerhub issues various magazines & handbooks regularly that
            contribute to expanding knowledge for the benefit of students.
          </h5>

          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 2000 }}
            spaceBetween={26}
            breakpoints={{
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
            {coursesData.map((c,i) => (
              <SwiperSlide>
                <Full
                key={i*10}
                  courseTitle1={c.courseTitle1}
                  courseTitle2={c.courseTitle2}
                  courseDescription={c.courseDescription}
                  lastDate={c.lastDate}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Magzine;
