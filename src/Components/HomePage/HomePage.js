import React from "react";

import ReactPlayer from "react-player";
import { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "../HomePage/HomePage.css";
import "../Aboutus/Aboutus";
import Aboutus from "../Aboutus/Aboutus";
import "../Whatwedo/Whatwedo";
import Whatwedo from "../Whatwedo/Whatwedo";
import "../Members/Members";
import Members from "../Members/Members";
import "../Magzine/Magzine";
import Magzine from "../Magzine/Magzine";
import "../Events/Events";
import Events from "../Events/Events";
import "../HomeCourses/Courses";
import Courses from "../HomeCourses/Courses";
import "../Members/Members";

import campusIcon from "./icons/campus.png";
import GradIcon from "./icons/graudate.png";
import BuildingIcon from "./icons/building.png";


import IITK from "./svg/IITK.png";

import tcs from "./svg/tcs.svg";
import oracle from "./svg/oracle.svg";
import logitech from "./svg/logitech.svg";
import vedantu from "./svg/vedantu.svg";
import swiggy from "./svg/swiggy.svg";
import infosys from "./svg/infosys.svg";
import CountUp from "react-countup";

import "swiper/css";
import "swiper/css/autoplay";
// import { Suspense } from "react";
// import { lazy } from "react";

// const About = React.lazy(()=>import('../Aboutus/Aboutus'));
// const About = lazy(() => import('../Aboutus/Aboutus'));

export default function NavBar() {
  return (
    <>
      <div className="row headearpart">
        <div className="col-lg-7 ">
          <div className="tagContainer desk-tab--view">
            <h1 className="headerbrandname">engineerHUB</h1>
            <h5 className="headerbelow">Students . Campus . Industries</h5>
          </div>
          <div className="row headerContainer">
            <div className="col-4 headercard">
              <img
                classname="c-img"
                src={campusIcon}
                alt="Campus"
                style={{ width: "100px" }}
              />
              {/* <h1 className="headercardtext">750+</h1> */}
              <h1 className="headercardtext">
                <CountUp
                  start={500}
                  end={750}
                  className="headercardtext"
                  duration={1.5}
                  afterEffects={true}
                  smooth={true}
                  smartEasingAmount={true}
                  delay={0}
                ></CountUp>
                +
              </h1>

              <h6 className="innerfont">campus</h6>
            </div>
            <div className="col-4 headercard">
              <img
                classname="c-img"
                src={GradIcon}
                alt="Graduate"
                style={{ width: "90px" }}
              />
              {/* <h1 className="headercardtext">50K+</h1> */}
              <h1 className="headercardtext">
                <CountUp
                  start={0}
                  end={50}
                  className="headercardtext"
                  duration={1.9}
                  smooth={true}
                  smartEasingAmount={true}
                  delay={0}
                ></CountUp>
                K+
              </h1>

              <h6 className="innerfont">Students</h6>
            </div>
            <div className="col-4 headercard">
              <img
                classname="c-img"
                src={BuildingIcon}
                alt="Building"
                style={{ width: "90px" }}
              />
              {/* <h1 className="headercardtext">18+</h1> */}
              <h1 className="headercardtext">
                <CountUp
                  start={0}
                  end={18}
                  className="headercardtext"
                  duration={1.5}
                  smooth={true}
                  smartEasingAmount={true}
                  delay={0}
                ></CountUp>
                +
              </h1>

              <h6 className="innerfont">Industries</h6>
            </div>
          </div>
        </div>
        <div className="player-wrapper col-lg-5 videocard">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=uFlGx_Vcjs8"
            className="react-player"
            // playing
            width="100%"
            height="100%"
            controls={false}
          />
        </div>

        <div className="desk-tab--view" style={{ paddingBottom: "0px" }}>
          <div class="header">
            <div className="studenttxt">Our students comes from</div>
          </div>
          <div class="row1-container">
            <div class="box box-down cyan">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              <h2 className="clgname">
                NIT <br />
                PATNA
              </h2>
            </div>

            <div class="box red">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              <h2 className="clgname">
                IIT <br />
                KANPUR
              </h2>
            </div>

            <div class="box box-down blue">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              <h2 className="clgname">
                NIT <br />
                ALLAHABAD
              </h2>
            </div>
          </div>
          <div class="row2-container">
            <div class="box orange">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              <h2 className="clgname">
                NIT <br />
                KURUKSHETRA
              </h2>
            </div>
          </div>

          <div class="header boxheadeer">
            <div className="studenttxt">Companies we Collaborate</div>
          </div>
          <div class="row1-container">
            <div class="box box-down cyan">
              <div className="comp studentfrom2">
                <img src={tcs} alt="tcs" className="tcsimage" />
              </div>
            </div>

            <div class="box red">
              <div className="comp studentfrom2">
                <img src={infosys} alt="infosys" className="tcsimage" />
              </div>
            </div>

            <div class="box box-down blue">
              <div className="comp studentfrom2">
                <img src={swiggy} alt="swiggy" className="tcsimage" />
              </div>
            </div>
          </div>
          <div class="row2-container">
            <div class="box orange">
              <div className="comp studentfrom2">
                <img src={swiggy} alt="swiggy" className="tcsimage" />
              </div>
            </div>
          </div>
        </div>

        <div className="row Studentsfrom mobile--view">
          <div className="studenttxt">Our students comes from</div>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            // autoplay={{ delay: 4000 }}

            breakpoints={{
              425: {
                width: 350,
                slidesPerView: 1,
              },
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              {" "}
              <div className="col-lg-2 studentfrom">IIT Kanpur</div>{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="col-lg-2 studentfrom">IIT Roorkee</div>{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="col-lg-2 studentfrom">NIT Delhi</div>{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="col-lg-2 studentfrom">IIIT Vadodra</div>{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="col-lg-2 studentfrom">IIT Bombay</div>{" "}
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="about">
        <Aboutus />
        {/* <React.Suspense fallback={<>...</>}>
        <About />
        </React.Suspense> */}
      </div>
      <div className="WhatWeDo">
        <Whatwedo />
      </div>

      <div className="magzine">
        <Magzine />
      </div>
      <div className="Events">
        <Events />
      </div>
      <div className="Courses">
        <Courses />
      </div>
      <div className="row Studentsfrom2 mobile--view">
        <div className="studenttxt">Companies we Collaborate</div>

        <div className="row">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 4000 }}
            breakpoints={{}}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              {" "}
              <div className="comp studentfrom2">
                <img src={tcs} alt="tcs" className="tcsimage" />
              </div>{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="comp studentfrom2">
                <img src={swiggy} alt="swiggy" className="tcsimage" />
              </div>{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="comp studentfrom2">
                <img src={oracle} alt="oracle" className="tcsimage" />
              </div>{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="comp studentfrom2">
                <img src={logitech} alt="logitech" className="tcsimage" />
              </div>{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="comp studentfrom2">
                <img src={infosys} alt="infosys" className="tcsimage" />
              </div>{" "}
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <div className="comp studentfrom2">
                <img src={vedantu} alt="vedantu" className="tcsimage" />
              </div>{" "}
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
        
      <div className="Members" style={{ padding: "0px 0px 4% 0px" }}>
        <Members />
      </div>
    </>
  );
}
