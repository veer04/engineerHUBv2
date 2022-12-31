import { TypeAnimation } from "react-type-animation";
import "../HomePage/HomePage.css";
import "../Aboutus/Aboutus";
import Aboutus from "../Aboutus/Aboutus";
import "../Whatwedo/Whatwedo";
import Whatwedo from "../Whatwedo/Whatwedo";
import "../Members/Members";
import Members from "../Members/Members";
import "../Magzine/Magzine";
import Magazine from "../Magzine/Magzine";
import "../Events/Events";
import Events from "../Events/Events";
import "../HomeCourses/Courses";
import Courses from "../HomeCourses/Courses";
import "../Members/Members";
import InfiniteSlider from "../shared/InfiniteSlider";
import InfiniteSlider2 from "../shared/InfiniteSlider2";
import CountUp from "react-countup";
import "swiper/css";
import "swiper/css/autoplay";
import BottomDivider from "../shared/BottomDivider/BottomDivider";
// import Bucket_URL from "../../services/APIUtils";
import AOS from "aos";
import "aos/dist/aos.css";
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
                "Students",
                1000,
                "Campus",
                2000,
                "Industries",
                2000,
                () => {},
              ]}
              wrapper="div"
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: "1.4em" }}
              className="Animated_textUP"
            />
          </div>
          <div className="row headerContainer">
            <div className="col-4 headercard">
              <img
                className="c-img"
                src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/gif/student.gif"
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
                src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/gif/campus.gif"
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

              <h6 className="innerfont">Campus</h6>
            </div>
            <div className="col-4 headercard">
              <img
                className="c-img"
                src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/gif/industry.gif"
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
          <img src="https://ehubtestbucket.s3.ap-south-1.amazonaws.com/Animation/Animation.gif" alt="" className="animationcard" />
        </div>
      </div>

      <div className="row uppersectionRow">
        <div className="header headz">
          <div className="studenttxt">Our students comes from</div>
        </div>
        <div className="col-5">
          <div
            className="desk-tab--view"
            style={{ paddingBottom: "0px" }}
          ></div>
        </div>

        <div
          className="col-5"
          data-aos="fade-left"
          data-aos-delay="300"
          data-aos-offset="300"
        >
          <div
            className="desk-tab--view"
            style={{ paddingBottom: "0px" }}
          ></div>
        </div>

        <div className="row">
          <div className="col-4"></div>
          <div
            className="col-5"
            data-aos="fade-right"
            data-aos-delay="300"
            data-aos-offset="300"
          >
            <div
              className="desk-tab--view"
              style={{ paddingBottom: "0px" }}
            ></div>
          </div>
        </div>
        <InfiniteSlider2 className="infislider"></InfiniteSlider2>

        {/* <InfiniteSlider3 className="infislider2"></InfiniteSlider3> */}
        <div data-aos="fade-up">
          <div className="header ">
            <div className="studenttxt">Companies we Collaborate</div>
          </div>
          <InfiniteSlider data-aos="fade-up" />
        </div>
        <div className="about">
          <Aboutus
            data-aos="fade-right"
            data-aos-delay="300"
            data-aos-offset="0"
          />
        </div>

        <div
          className="WhatWeDo"
          data-aos="fade-left"
          data-aos-anchor-placement="top-bottom"
          data-aos-offset="300"
        >
          <Whatwedo />
        </div>

        <div className="magzine">
          <Magazine />
        </div>
        <div className="Events">
          <Events />
        </div>
        <div className="Courses">
          <Courses />
        </div>

        <BottomDivider />

        <div
          className="Members"
          style={{ padding: "0px 0px 4% 0px" }}
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          <Members />
        </div>
      </div>
    </>
  );
}
