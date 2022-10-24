import React from "react";
import { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles

import "swiper/css/pagination";

import "swiper/css";
import "swiper/css/autoplay";
import "../Events/Events.css";
import "./Courses.css";

import CoursesCard from "./CoursesCard";

export const coursesData = [
  {
    courseName: "DSA",
    courseTitle1: "DATA",
    courseTitle2: "STRUCTURES",
    courseDescription:
      "Our Educators aim at providing students with the best knowledge to help them solve and crack FAANG/MAANG by mastering data structures and algorithms",
    lastDate: "22/08/2023",
    cardImage: `.${__dirname}Images/app.jpg`,
  },
  {
    courseName: "UI/UX Development",
    courseTitle1: "UI/UX",
    courseTitle2: " design ",
    courseDescription:
      "We provide effective learning sessions from skilled mentors to help students gain relevant knowledge and effective road maps on UI/UX design.",
    lastDate: "22/11/2022",
    cardImage: `.${__dirname}Images/ui.jpg`,
  },
  {
    courseName: "Web Development",
    courseTitle1: "Web",
    courseTitle2: "Development",
    courseDescription:
      "We help students master Web development by covering advanced topics & technical strategies from mentors having great expertise. ",
    lastDate: "22/02/2023",
    cardImage: `.${__dirname}Images/web.png`,
  },
  {
    courseName: "Cyber Security",
    courseTitle1: "Cyber",
    courseTitle2: "Security",
    courseDescription:
      "We provide students with the best courses to improve their cyber security knowledge and assess the current threat landscape & how to protect against it.",
    lastDate: "21/08/2023",
    cardImage: `.${__dirname}Images/cyber.png`,
  },
];
function Events() {
  return (
    <>
      <div className="content contentEvent ">
        <div className="container">
          <h1 className="text1 txt">Free Courses</h1>
          <h5 className="text2 text111 courses-box">
            Engineerhub aims to provide several free courses to students to
            provide necessary material with utmost ease.
          </h5>

          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              768: {
                width: 700,
                slidesPerView: 2,
              },
              1024: {
                width: 940,
                slidesPerView: 3,
              },
              1440: {
                width: 1290,
                slidesPerView: 4,
              },
            }}
            onSwiper={() => {}}
            onSlideChange={() => {}}
          >
            {coursesData.map((c, i) => (
              <SwiperSlide>
                <CoursesCard
                  key={i * 20}
                  id={i * 2}
                  courseName={c.courseName}
                  state={c}
                  cardImage={c.cardImage}
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

export default Events;
