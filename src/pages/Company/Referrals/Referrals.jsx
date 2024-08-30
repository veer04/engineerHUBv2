import React from "react";
import "./Referrals.css";
import img from "../../../../public/r-img.png";
import SessionBox from "./SessionBox";
import BannerCards from "./BannerCards";
import vectorComp1 from "../../../../public/Vector.svg";
import vectorComp2 from "../../../../public/Vector2.svg";
import vectorComp3 from "../../../../public/Vector3.svg";
import ConnectWithUs from "./ConnectWithUs";
import DigitalProducts from "./DigitalProducts/DigitalProducts";
import ReferralRatings from "./ReferralRatings/ReferralRatings";
import ReferralPageBanner from "./ReferralPageBanner.png";
import { HashLink } from "react-router-hash-link";

const Referrals = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${ReferralPageBanner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="referral-main-container"
      >
        <div className="b-left-side">
          <h3 style={{ color: "white", fontSize: 18, fontWeight: 400 }}>
            Referrals, Digital Products &amp; Mentorship
          </h3>
          <h2 className="ref-txt">Unlock Opportunities</h2>
          <h5
            style={{ marginTop: 16, color: "#d5d5d5" }}
            className="ref-sm-txt"
          >
            Partnering with 600+ companies, we specialize in guiding 0-2 year
            experience candidates through the hiring process, tailored to
            industry preferences.
          </h5>
          <div className="referral-btn">
            <HashLink to="/referrals#referral-section">
              <button className="btn-l">Referrals</button>
            </HashLink>
            <HashLink to="/referrals#digital-product">
              <button className="btn-r">Digital Products</button>
            </HashLink>
          </div>
        </div>

        {/* //right side div saif */}
        <div className="b-right-side">
          <img style={{ zIndex: "2" }} src={img} alt="right-side-img" />

          <SessionBox
            className="first"
            name={"Rohit Das"}
            profile={"dd/mm/yy"}
          />
          <SessionBox
            className="second"
            name={"Girish Shedge"}
            profile={"BVDU Student"}
          />
        </div>
      </div>

      <div className="banner-cards">
        <div className="banner-card">
          <BannerCards
            title={"500+"}
            img={vectorComp1}
            text={"Digital Sold or engineers bought our created resources"}
          />
          <BannerCards
            title={"1738+"}
            img={vectorComp1}
            text={"engineers have consulted us fro their career"}
          />

          <BannerCards
            title={"5/5"}
            img={vectorComp3}
            text={
              "89 out of 95 have rated us 5/5 for our solutions and some floating testimonials"
            }
          />
        </div>
      </div>

      {/* //carousal */}

      <div
        id="carouselExampleControls"
        className="carousel slide d-block d-sm-none"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <BannerCards
              title={"500+"}
              img={vectorComp1}
              text={"Digital Sold or engineers bought our created resources"}
            />
          </div>
          <div className="carousel-item">
            <BannerCards
              title={"1738+"}
              img={vectorComp1}
              text={"engineers have consulted us fro their career"}
            />
          </div>
          <div className="carousel-item">
            <BannerCards
              title={"5/5"}
              img={vectorComp3}
              text={
                "89 out of 95 have rated us 5/5 for our solutions and some floating testimonials"
              }
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* //connect With Us Section */}

      <ConnectWithUs compName={"Connect With Us"} />
      <DigitalProducts compName={"Digital Products"} />
      <ReferralRatings />
    </>
  );
};

export default Referrals;
