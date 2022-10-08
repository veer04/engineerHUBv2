import "../Members/Members.scss";
import { Autoplay, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import Img4 from "../shared/ProfilePic/pic2.png";
import Img3 from "../shared/ProfilePic/pic3.png";
import Img2 from "../shared/ProfilePic/pic4.jpg";
import Img1 from "../shared/ProfilePic/pic5.png";

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
              <img className="card-img-top" src={Img2} alt="" />
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
              <img className="card-img-top" src={Img3} alt="" />
              <div className="card-body">
                <h5>
                  Ronne Galle <br />
                  <span> Project Manager </span>
                </h5>
                <p className="card-text">
                  “ Nam libero tempore, cum soluta nobis est eligendi optio
                  cumque nihil impedit quo minus id quod maxime placeat ”{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <div>
            <div className="card text-center">
              <img className="card-img-top" src={Img4} alt="" />
              <div className="card-body">
                <h5>
                  Ronne Galle <br />
                  <span> Project Manager </span>
                </h5>
                <p className="card-text">
                  “ Nam libero tempore, cum soluta nobis est eligendi optio
                  cumque nihil impedit quo minus id quod maxime placeat ”{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <div>
            <div className="card text-center">
              <img className="card-img-top" src={Img1} alt="" />
              <div className="card-body">
                <h5>
                  Ronne Galle <br />
                  <span> Project Manager </span>
                </h5>
                <p className="card-text">
                  “ Nam libero tempore, cum soluta nobis est eligendi optio
                  cumque nihil impedit quo minus id quod maxime placeat ”{" "}
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
