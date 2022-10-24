import { TypeAnimation } from 'react-type-animation';
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
import InfiniteSlider2 from "../shared/InfiniteSlider2";
import InfiniteSlider3 from "../shared/InfiniteSlider3";
import Industries from "./gif/Industries.gif";

import ehub from "./gif/industry.gif"
// import Zomato from "./Zomato.png";
import IITK from "./svg/IITK.png";
// import AnimationScreen from "./svg/Animation.gif";
// import tcs from "./svg/tcs.svg";
// import oracle from "./svg/oracle.svg";
// import logitech from "./svg/logitech.svg";
// import vedantu from "./svg/vedantu.svg";

// import infosys from "./svg/infosys.svg";
import CountUp from "react-countup";
import Ehubgif2 from "../HomePage/gif/student.gif";
import Ehubgif from "../HomePage/gif/campus.gif";
// import Byjus from "./Byjus.png";
import "swiper/css";
import AnimationScreen from "./svg/Animation.gif";
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
        <div className="col-lg-7 partone ">
          <div className="tagContainer desk-tab--view">
            <h1 className="headerbrandname">engineerHUB</h1>
   <TypeAnimation
      sequence={[
        'Students',
        1000, 
        'Campus',
        2000, 
        'Industries', 
       2000,
        () => {
        
        }
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '1.4em' }}
      className="Animated_textUP"
      
    />
         </div>
          <div className="row headerContainer">
          
            <div className="col-4 headercard">
              <img
                className="c-img"
                src={Ehubgif2}
                alt="Graduate"
                style={{ width: "120px" }}
              />
             
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
                src={Ehubgif}
                alt="Campus"
                style={{ width: "120px" }}
              />
              
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
                src={ehub}
                alt="Building"
                style={{ width: "120px" }}
              />
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
          
          {/* <div className="row">
            <div className="col-4"></div>
       
            
          </div> */}
        </div>
        
        <div className="player-wrapper col-lg-5 videocard parttwo">
        <img src={AnimationScreen} alt=""className='animationcard' />
        </div>
      </div>

<div className="row">
<div className="header headz">
            <div className="studenttxt">Our students comes from</div>
          </div>
  <div className="col-5" >
  <div className="desk-tab--view" style={{ paddingBottom: "0px" }}>
 
         
     
        </div>
  </div>
 
  <div className="col-5"  data-aos="fade-left"
   data-aos-delay="300"
   data-aos-offset="300"  >
  <div className="desk-tab--view" style={{ paddingBottom: "0px" }}>
  
        </div>
  </div>
 
  <div className="row">
    <div className="col-4"></div>
  <div className="col-5" data-aos="fade-right"
   
   data-aos-delay="300"
   data-aos-offset="300"  >
  <div className="desk-tab--view" style={{ paddingBottom: "0px" }}>
 
  </div>
      </div>
       <InfiniteSlider2 className="infislider"></InfiniteSlider2>
       
      {/* <InfiniteSlider3 className="infislider2"></InfiniteSlider3> */}
      <div data-aos="fade-up">
      <div className="header ">
        <div className="studenttxt">Companies we Collaborate</div>
      </div>
      <InfiniteSlider data-aos="fade-up"/>
      </div>
      <div className="about" >
        <Aboutus data-aos="fade-right"
   
     data-aos-delay="300"
     data-aos-offset="0" />

      </div>
      <div className="WhatWeDo" data-aos="fade-left"
     data-aos-anchor-placement="top-bottom"
     data-aos-offset="300">
        <Whatwedo />
      </div>

      <div className="magzine"data-aos="fade-up"
      data-aos-offset="300"
     data-aos-anchor-placement="center-bottom">
        <Magzine />
      </div>
      <div className="Events" data-aos="fade-up"
      data-aos-offset="300"
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
      </div>
      </div>
</>
);
}