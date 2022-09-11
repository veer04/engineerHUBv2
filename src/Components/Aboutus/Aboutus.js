import React from "react";
import "../Aboutus/Aboutus.css";
import ImageGroup from "../Aboutus/Group.svg";
function Aboutus() {
  return (
    <>
      <div className=" container mw-100  allcontent">
        <div className="row">
          <div className="col-lg-3 aboutus">
            <h1 className="aboutus">About Us</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 aboutustxt">
            engineerHUB (formerly engineerSUMMIT) is INDIA's leading community
            of engineers where students or alumni from IITs, NITs, IIITs and
            state colleges unite together to develop and nurture the skills of
            students all over India.
            <br />
            Our goal is to counsel beginners in the field by providing them with
            basic guidelines about how and where to start their learning.
          </div>
        </div>

        <div className="row aboutContainer">
          <div className="col-lg-4 group">
            <img src={ImageGroup} alt="" className="Groupimg" />
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-5">
            <div className="row aboutusbullets1">
              <div className="tips">
                <ul>
                  <li>
                    {" "}
                    Providing students valuable content and personal assistance.
                  </li>
                </ul>
              </div>
            </div>
            <div className="row aboutusbullets2">
              <div className="tips">
                <ul>
                  {" "}
                  <li>
                    {" "}
                    Conducting regular webinars by our leading industriallists &
                    mentors who map out the basic blueprint expanding from their
                    learning to placement experience.
                  </li>{" "}
                </ul>{" "}
              </div>
            </div>
            <div className="row aboutusbullets3">
              <div className="tips">
                <ul>
                  {" "}
                  <li>
                    {" "}
                    Special attention is given to the students that help them
                    enhance their programming skills, manage projects and
                    provide them with internship opportunities.
                  </li>{" "}
                </ul>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutus;
