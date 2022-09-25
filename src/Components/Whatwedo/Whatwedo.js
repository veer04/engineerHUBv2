import React from "react";
import "../Whatwedo/Whatwedo.css";
import Carousel from "react-bootstrap/Carousel";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Phoneimg from "../Whatwedo/Phoneimg.svg";
function Whatwedo() {
  return (
    <>
      <div className="content">
        <div className="container textcontainer mw-100 ">
          <div className="textcontent">
            <h1 className="textwhat">What We Do ?</h1>
          </div>

          <div className="carouselcomp">
            <Carousel>
              <Carousel.Item>
                <div className="firstcarousel">
                  <div className="row">
                    <div className="col-lg-8 carousel-content">
                      <h1 className="text1 textfor">Campus Connectivity</h1>

                      <h5 className="col-lg-8 text2 textt">
                        At engineeHUB , we connect all the IITs, NITs & State
                        Colleges to facilitate students with a competitive
                        environment to allow them productive discussions about
                        their respective fields of knowledge.
                      </h5>
                    </div>
                    <div className="col-lg-3 phone-image">
                      <img src={Phoneimg} alt="" />
                    </div>
                  </div>
                </div>
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="firstcarousel">
                  <div className="row">
                    <div className="col-lg-8 carousel-content">
                      <h1 className="text1 textfor">
                        Free Mentorship by IITians & NITians
                      </h1>

                      <h5 className="col-lg-8 text2 textt">
                        Mentors excel in counselling beginners in their
                        respective fields of interest by providing them with
                        basic guidelines to help them enhance their skills &
                        expand their knowledge about the placement criteria.
                      </h5>
                    </div>
                    <div className="col-lg-3 phone-image">
                      <img src={Phoneimg} alt="" />
                    </div>
                  </div>
                </div>

                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="firstcarousel">
                  <div className="row">
                    <div className="col-lg-8 carousel-content">
                      <h1 className="text1 textfor">
                        Internship & Job Updates
                      </h1>

                      <h5 className="col-lg-8 text2 textt">
                        We regularly notify students about appropriate
                        internships & job updates based on their keen interests
                        which helps them sort their priorities, manage time &
                        get updates from verified resources.
                      </h5>
                    </div>
                    <div className="col-lg-3 phone-image">
                      <img src={Phoneimg} alt="" />
                    </div>
                  </div>
                </div>

                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="firstcarousel">
                  <div className="row">
                    <div className="col-lg-8 carousel-content">
                      <h1 className="text1 textfor">Live Courses</h1>

                      <h5 className="col-lg-8 text2 textt">
                        We provide live sessions of various courses of major
                        importance in the field of engineering. In addition to
                        doubt clearing facilities with our mentors, students can
                        avail themselves lifetime access to these sessions to
                        help them in future.
                      </h5>
                    </div>
                    <div className="col-lg-3 phone-image">
                      <img src={Phoneimg} alt="" />
                    </div>
                  </div>
                </div>

                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="firstcarousel">
                  <div className="row">
                    <div className="col-lg-8 carousel-content">
                      <h1 className="text1 textfor">Magzines & Handbooks</h1>

                      <h5 className="col-lg-8 text2 textt">
                        We issue various magazines & handbooks regularly that
                        contribute to expanding students' knowledge & learning.
                        These magazines & handbooks are provided by trustworthy
                        resources for the benefit of students.
                      </h5>
                    </div>
                    <div className="col-lg-3 phone-image">
                      <img src={Phoneimg} alt="" />
                    </div>
                  </div>
                </div>

                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="contactButtons d-flex flex-column" >
            <div className="align-self-center comuni">
            Join our Community & let’s grow together...
            </div>
            <div className="d-flex justify-content-evenly flex">
            <button className="Whatsapp">
              <WhatsAppIcon
                sx={{
                  fontSize: { sm: 22, md: 32, lg: 33, xl: 33 },
                }}
              />{" "}
              Join Whatsapp
            </button>
            <button className="Discord">
              <SportsEsportsIcon
                sx={{
                  fontSize: { sm: 22, md: 32, lg: 33, xl: 33 },
                }}
              />{" "}
              Join Discord
            </button>
            <button className="Telegram">
              <TelegramIcon
                sx={{
                  fontSize: { sm: 22, md: 32, lg: 33, xl: 33 },
                }}
              />
              Join Telegram
            </button>
            <button className="Linkedin">
              <LinkedInIcon
                sx={{
                  fontSize: { sm: 22, md: 32, lg: 33, xl: 33 },
                }}
              />
              Join Linkedin
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Whatwedo;
