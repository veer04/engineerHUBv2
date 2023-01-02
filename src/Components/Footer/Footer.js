import React from "react";
import "../Footer/Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="foot-container">
        <div className="Footer">
          <div className="footerRow">
            <div className="f_nav">
              <h3 className="textfooter">About Us</h3>
              <p className="footertextaboutus">
                engineerHUB is INDIA's largest
                community of engineers where students(alumni) from IITs, NITs,
                IIITs and state colleges join together to develop and nurture
                students skills coming from all over India. .{" "}
              </p>
            </div>
            <div className="f_nav">
              <h3 className="textfooter">Links</h3>
              <a href="./magazine">
              <div className="row footerinnertext">
                <p>Magzines</p>
              </div>
              </a>
              <a href="./courses">
              <div className="row footerinnertext ">
                <p>Courses</p>
              </div>
              </a>
              <a href="./campus">
              <div className="row footerinnertext">
                <p>Events</p>
              </div>
              </a>
            </div>
            {/* <div className="f_nav">
              <h3 className="textfooter quickfooter">Address</h3>
              <div className="row footerinnertext">
                <p>Delhi(NCR)</p>
              </div>
            </div> */}
            <div className="f_nav">
              <h3 className="textfooter">Contact Us</h3>

              <div className="row">
                <p className="footerinnertext">myengineerhub@gmail.com</p>
              </div>
              <div className="row custom--nowrap" style={{ justifyContent: "space-around" }}>
                <div className="col-lg-2 footericon">
                  {" "}
                  <a
                    href="https://www.instagram.com/engineerhub.in/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <InstagramIcon />
                  </a>
                </div>
                <div className="col-lg-2 footericon">
                  {" "}
                  <a
                    href="https://www.linkedin.com/company/engineersummit/mycompany/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </a>{" "}
                </div>
                <div className="col-lg-2 footericon">
                  {" "}
                  <a
                    href="https://twitter.com/engineerhub_in"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <TwitterIcon />
                  </a>{" "}
                </div>
                <div className="col-lg-2 footericon">
                  {" "}
                  <a
                    href="https://discord.com/invite/ZMZAEZ5NfA"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {" "}
                    <SportsEsportsIcon />
                  </a>
                </div>
                <div className="col-lg-2 footericon">
                  {" "}
                  <a
                    href="https://t.me/engineerhub_in"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <TelegramIcon />
                  </a>
                </div>
              </div>
              <div
                className="row foot-btn"
                style={{ justifyContent: "space-around" }}
              >
                <div className="col-lg-6">
                  <Link to="/login">
                    {" "}
                    <button className="footerBB">Log In</button>
                  </Link>
                </div>
                <div className="col-lg-6">
                  <Link to="/register">
                    {" "}
                    <button className="footerBB">Register</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row copyright">
            Powered by <span>engineerHUB</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
