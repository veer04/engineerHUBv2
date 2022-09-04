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
                        At engineeHUB , we connect all the IITs NITs & State
                        Colleges , so that students get a competitive
                        environment , get to know about each other and can
                        discuss their things .
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
                        Provide basic guidelines & mentorship to newcomers into
                        engineering field for how and where to start their
                        learnings..
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
                        Internship & Job updates
                      </h1>

                      <h5 className="col-lg-8 text2 textt">
                        We provide internship & job updates on regular basis ,
                        so that students don't need to search here n there . .
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
                        We provide live courses on various topic, where you can
                        attend live classes , discuss your doubt with mentor and
                        get recording of the session for life time..
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
                        We publish various Magzines & Handbooks on regular basis
                        , which are suitable and beneficial for students .
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

          <div className="contactButtons d-flex justify-content-evenly flex-wrap">
            <button className="Whatsapp">
              <WhatsAppIcon style={{ fontSize: 33 }} /> Join Whatsapp
            </button>
            <button className="Discord">
              <SportsEsportsIcon style={{ fontSize: 42 }} /> Join Discord
            </button>
            <button className="Telegram">
              <TelegramIcon style={{ fontSize: 36 }} />
              Join Telegram
            </button>
            <button className="Linkedin">
              <LinkedInIcon style={{ fontSize: 43 }} />
              Join Linkedin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Whatwedo;
