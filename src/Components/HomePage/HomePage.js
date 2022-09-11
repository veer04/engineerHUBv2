import React from "react";
import Swiper from "react-slider-swiper";
import ReactPlayer from "react-player";

import "../HomePage/HomePage.css";
import "../Aboutus/Aboutus";
import Aboutus from "../Aboutus/Aboutus";
import "../Whatwedo/Whatwedo";
import Whatwedo from "../Whatwedo/Whatwedo";
import "../Magzine/Magzine";
import Magzine from "../Magzine/Magzine";
import "../Events/Events";
import Events from "../Events/Events";
import "../HomeCourses/Courses";
import Courses from "../HomeCourses/Courses";
import "../Members/Members";
import Members from "../Members/Members";
import campusIcon from "./icons/campus.png";
import GradIcon from "./icons/graudate.png";
import BuildingIcon from "./icons/building.png";

import vedantu from "./svg/vedantu.svg";
import logitech from "./svg/logitech.svg";
import tcs from "./svg/tcs.svg";
import oracle from "./svg/oracle.svg";
import swiggy from "./svg/swiggy.svg";
import infosys from "./svg/infosys.svg";
import CountUp from "react-countup";
// import { Suspense } from "react";
// import { lazy } from "react";

// const About = React.lazy(()=>import('../Aboutus/Aboutus'));
// const About = lazy(() => import('../Aboutus/Aboutus'));




export default function NavBar() {
  const params = {
    pagination: ".swiper-pagination",
    paginationClickable: true,
    slidesPerView: 4,
    runCallbacksOnInit: true,
    onInit: (swiper) => {
      this.swiper = swiper;
    },
  };
  return (
    <>
      <div className="row headearpart">
        <div className="col-lg-7 ">
          <div className="tagContainer">
            <h1 className="headerbrandname">engineerHUB</h1>
            <h5 className="headerbelow">Students . Campus . Industries</h5>
          </div>
          <div className="row headerContainer">
            <div className="col-4 headercard">
              <img src={campusIcon} alt="Campus" />
              {/* <h1 className="headercardtext">750+</h1> */}
              <h1 className="headercardtext"><CountUp start={500} end={750} className="headercardtext" duration={0.7} afterEffects={true} smooth={true} smartEasingAmount={true} delay={0}></CountUp>+</h1> 
              
              <h6 className="innerfont">campus</h6>
            </div>
            <div className="col-4 headercard">
              <img src={GradIcon} alt="Graduate" />
              {/* <h1 className="headercardtext">50K+</h1> */}
              <h1 className="headercardtext"><CountUp start={0} end={50} className="headercardtext" duration={0.9} smooth={true} smartEasingAmount={true} delay={0}></CountUp>K+</h1>

              <h6 className="innerfont">Students</h6>
            </div>
            <div className="col-4 headercard">
              <img src={BuildingIcon} alt="Building" />
              {/* <h1 className="headercardtext">18+</h1> */}
              <h1 className="headercardtext"><CountUp start={0} end={18} className="headercardtext" duration={1} smooth={true} smartEasingAmount={true} delay={0}></CountUp>+</h1>

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
      </div>

      <div className="row Studentsfrom">
        <div className="studenttxt">Our students comes from</div>

        <Swiper className="row cllgCarol">
          <div className="col-lg-2 studentfrom">IIT Kanpur</div>
          <div className="col-lg-2 studentfrom">IIT Roorkee</div>
          <div className="col-lg-2 studentfrom">NIT Delhi</div>
          <div className="col-lg-2 studentfrom">IIIT Vadodra</div>
          <div className="col-lg-2 studentfrom">IIT Bombay</div>
        </Swiper>
      </div>

      <div className="row Studentsfrom2">
        <div className="studenttxt">Companies we Collaborate</div>

        <div className="row">
          <Swiper {...params}>
            <div className="comp studentfrom2">
              <img src={tcs} alt="tcs" className="tcsimage" />
            </div>
            <div className="comp studentfrom2">
              <img src={swiggy} alt="swiggy" className="tcsimage" />
            </div>
            <div className="comp studentfrom2">
              <img src={oracle} alt="oracle" className="tcsimage" />
            </div>
            <div className="comp studentfrom2">
              <img src={logitech} alt="logitech" className="tcsimage" />
            </div>
            <div className="comp studentfrom2">
              <img src={infosys} alt="infosys" className="tcsimage" />
            </div>
            <div className="comp studentfrom2">
              <img src={vedantu} alt="vedantu" className="tcsimage" />
            </div>
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
      <div className="Members" style={{ padding: "0px 0px 4% 0px" }}>
        <Members />
      </div>
    </>
  );
}
