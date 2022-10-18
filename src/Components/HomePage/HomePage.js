import React from "react";

import ReactPlayer from "react-player";
// import { Autoplay } from "swiper";
import { TypeAnimation } from 'react-type-animation';
// import { Swiper, SwiperSlide } from "swiper/react";
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
import InfiniteSlider from "../shared/InfiniteSlider";
import campusIcon from "./icons/campus.png";
import GradIcon from "./icons/graudate.png";
import BuildingIcon from "./icons/building.png";
// import Zomato from "./Zomato.png";
import IITK from "./svg/IITK.png";
import AnimationScreen from "./svg/Animation.gif";
// import tcs from "./svg/tcs.svg";
// import oracle from "./svg/oracle.svg";
// import logitech from "./svg/logitech.svg";
// import vedantu from "./svg/vedantu.svg";

// import infosys from "./svg/infosys.svg";
import CountUp from "react-countup";
// import Byjus from "./Byjus.png";
import "swiper/css";

import "swiper/css/autoplay";
import BottomDivider from "../shared/BottomDivider/BottomDivider";
// import { Suspense } from "react";
// import { lazy } from "react";

// const About = React.lazy(()=>import('../Aboutus/Aboutus'));
// const About = lazy(() => import('../Aboutus/Aboutus'));
import AOS from "aos";
import 'aos/dist/aos.css';
AOS.init();
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
                className="c-img"
                src={campusIcon}
                alt="Campus"
                style={{ width: "100px" }}
              />
              {/* <h1 className="headercardtext">750+</h1> */}
              <h1 className="headercardtext">
                <CountUp
                  start={500}
                  end={800}
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
                className="c-img"
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
                className="c-img"
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

{/* <img src={AnimationScreen} alt="" height={500} width={700} style={{backgroundColor:"Blue"}} /> */}


          {/* <ReactPlayer
            url="https://www.youtube.com/watch?v=uFlGx_Vcjs8"
            className="react-player"
            // playing
            width="100%"
            height="100%"
            controls={false}
          /> */}
        </div>
      </div>

<div className="row">
<div className="header">
            <div className="studenttxt">Our students comes from</div>
          </div>
          <div className="col-1"></div>
  <div className="col-5"  data-aos="fade-right"
   
   data-aos-delay="300"
   data-aos-offset="300"   >
  <div className="desk-tab--view" style={{ paddingBottom: "0px" }}>
         <div className="animatedtxt">
  <TypeAnimation
      sequence={[
        'IITK', // Types 'One'
        2500, // Waits 1s
        'IITB', // Deletes 'One' and types 'Two'
        2500, // Waits 2s
        'IITR', 
        2500,
        () => {
        
        }
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2.4em' }}
      className="Animated_text"
    />
    </div>
         
          <div className="row1-container">
            <div className="box box-down cyan">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                NIT <br />
                PATNA
              </h2> */}
            </div>

            <div className="box red">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                IIT <br />
                KANPUR
              </h2> */}
            </div>

            <div className="box box-down blue">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                NIT <br />
                ALLAHABAD
              </h2> */}
            </div>
          </div>
          <div className="row2-container">
            <div className="box orange">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                NIT <br />
                KURUKSHETRA
              </h2> */}
            </div>
          </div>
        </div>
  </div>
  {/* <div className="col-2"></div> */}
  <div className="col-5"  data-aos="fade-left"
   data-aos-delay="300"
   data-aos-offset="300"  >
  <div className="desk-tab--view" style={{ paddingBottom: "0px" }}>
         <div className="animatedtxt">
  <TypeAnimation
      sequence={[
        'NITK', // Types 'One'
        2500, // Waits 1s
        'NITB', // Deletes 'One' and types 'Two'
        2500, // Waits 2s
        'NITR', 
        2500,
        () => {
        
        }
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2.4em' }}
      className="Animated_text"
    />
</div>
          <div className="row1-container">
            <div className="box box-down cyan">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                NIT <br />
                PATNA
              </h2> */}
            </div>

            <div className="box red">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                IIT <br />
                KANPUR
              </h2> */}
            </div>

            <div className="box box-down blue">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                NIT <br />
                ALLAHABAD
              </h2> */}
            </div>
          </div>
          <div className="row2-container">
            <div className="box orange">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                NIT <br />
                KURUKSHETRA
              </h2> */}
            </div>
          </div>
        </div>
  </div>
  <div className="col-1"></div>
  <div className="row">
    <div className="col-4"></div>
  <div className="col-5" data-aos="fade-right"
   
   data-aos-delay="300"
   data-aos-offset="300"  >
  <div className="desk-tab--view" style={{ paddingBottom: "0px" }}>
         <div className="animatedtxt">
  <TypeAnimation
      sequence={[
        'AKTU', // Types 'One'
        2500, // Waits 1s
        'AKGEC', // Deletes 'One' and types 'Two'
        2500, // Waits 2s
        'MIT', 
        2500,
        () => {
        
        }
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '2.4em' }}
      className="Animated_text"
    />
    </div>
          <div className="row1-container">
            <div className="box box-down cyan">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                NIT <br />
                PATNA
              </h2> */}
            </div>

            <div className="box red">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                IIT <br />
                KANPUR
              </h2> */}
            </div>

            <div className="box box-down blue">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                NIT <br />
                ALLAHABAD
              </h2> */}
            </div>
          </div>
          <div className="row2-container">
            <div className="box orange">
              <div className="comp studentfrom2">
                <img src={IITK} alt="swiggy" className="tcsimage imgpos" />
              </div>
              {/* <h2 className="clgname">
                NIT <br />
                KURUKSHETRA
              </h2> */}
            </div>
          </div>
        </div>
  </div>
</div>
<div className="col-3"></div>
</div>



      <div data-aos="fade-up">
      <div className="header ">
        <div className="studenttxt">Companies we Collaborate</div>
      </div>
      <InfiniteSlider />
      </div>
      <div className="about" >
        <Aboutus data-aos="fade-right"
   
     data-aos-delay="300"
     data-aos-offset="300" />
        {/* <React.Suspense fallback={<>...</>}>
        <About />
        </React.Suspense> */}
      </div>
      <div className="WhatWeDo" data-aos="fade-left"
     data-aos-anchor-placement="top-bottom"
     data-aos-offset="600">
        <Whatwedo />
      </div>

      <div className="magzine"data-aos="fade-up"
      data-aos-offset="600"
     data-aos-anchor-placement="center-bottom">
        <Magzine />
      </div>
      <div className="Events" data-aos="fade-up"
      data-aos-offset="600"
     data-aos-anchor-placement="top-center">
        <Events />
      </div>
      <div className="Courses"  data-aos="fade-up"
     data-aos-anchor-placement="center-center">
        <Courses />
      </div>

      <BottomDivider  data-aos="fade-left"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"/>

      <div className="Members" style={{ padding: "0px 0px 4% 0px" }}
      data-aos="fade-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine">
        <Members />
      </div>
    </>
  );
}
