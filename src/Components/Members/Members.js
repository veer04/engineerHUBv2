import React from 'react';
import "../Members/Members.scss";
import { Autoplay, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
function Members() {
  return (
    <div className="gtco-testimonials">
      <h2 className="studenttxt">What our Members think about us</h2>

      <Swiper
        className="owl-carousel owl-carousel1 owl-theme"
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 3,
          },
        }}
        onSwiper={() => {}}
        onSlideChange={() => {}}
      >
        <SwiperSlide>
          <div>
            <div className="card text-center">
              <img className="card-img-top" src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/image/MembersPic/pic4.png" alt="" />
              <div className="card-body">
                <h5>
                  Rahul K. M <br />
                  <span> Developer </span>
                </h5>
                <p className="card-text">
                  “ The community provides updated content & authorized
                  resources to benefit students with various courses to brush up
                  their skills. ”{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="card text-center">
              <img className="card-img-top" src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/image/MembersPic/pic3.png" alt="" />
              <div className="card-body">
                <h5>
                  Swapnil <br />
                  <span> Senior Coordinator </span>
                </h5>
                <p className="card-text">
                  “ The "Weekend with Us" Program organised by the company
                  provides a framework for the students to help them prepare for
                  the placements. ”{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <div>
            <div className="card text-center">
              <img className="card-img-top" src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/image/MembersPic/img7.jpg" alt="" />
              <div className="card-body">
                <h5>
                  Aditi JS
                  <br />
                  <span> Developer </span>
                </h5>
                <p className="card-text">
                  “ engineerhub is an ideal platform to receive all the major
                  resources, courses & guidance a student demands during his
                  preparation. Its strategic framework & structure is
                  phenomenal.”{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <div>
            <div className="card text-center">
              <img className="card-img-top" src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/image/MembersPic/pic5.png" alt="" />
              <div className="card-body">
                <h5>
                  Manish KR <br />
                  <span> Developer </span>
                </h5>
                <p className="card-text">
                  “ The extreme efforts & hard work of each member of the
                  community is appreciable. They have outgrown themselves in
                  such a short period. ”{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Members;
