import React from "react";
import "./Referrals.css";
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
import { Bucket_URL } from "../../../services/APIUtils";
import { useLocation } from "react-router-dom";
import OurMentors from "./OurMentors/OurMentors";
import { SEO } from "../../../components/SEO/SEO.jsx";
import CareerSupportIntroSection from "./CareerSupportIntroSection";
import AdsenseComp from "../../../components/AdsenseComp/AdsenseComp";
const bucket = `${Bucket_URL}ui/videos/`;

const Referrals = () => {
  const location = useLocation();
  const metaTitle =
    "Referrals, Career Mentorship & Interview Resources | engineerHUB";
  const metaDescription =
    "Discover referrals, mentorship programs, job & internship strategies, and interview resources trusted by 600+ partner companies.";
  const metaKeywords = [
    "job referrals",
    "career mentorship",
    "interview preparation",
    "internship strategy",
    "engineerhub digital products",
  ];
  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}${window.location.search}`
      : "";

  return (
    <SEO
      title={metaTitle}
      description={metaDescription}
      keywords={metaKeywords}
      canonical={
        currentUrl || "https://www.engineerhub.in/referrals"
      }
      openGraph={{
        type: "website",
        site_name: "engineerHUB",
        url: currentUrl || "https://www.engineerhub.in/referrals",
        title: metaTitle,
        description: metaDescription,
      }}
      twitter={{
        card: "summary_large_image",
        url: currentUrl || "https://www.engineerhub.in/referrals",
        title: metaTitle,
        description: metaDescription,
      }}
    >
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
           Career Mentorship, Job Referrals &amp; Interview Resources 
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
            <HashLink
              to={`/referrals#referral-section${
                location.search.includes("ref")
                  ? `?ref=${location?.search?.split("ref=")[1]?.split("&")[0]}`
                  : ``
              }`}
            >
              {/* disable this link */}
              <button className="btn-l">Referrals</button>
            </HashLink>
            <HashLink
              to={`/referrals#digital-product${
                location.search.includes("ref")
                  ? `?ref=${location?.search?.split("ref=")[1]?.split("&")[0]}`
                  : ``
              }`}
            >
              <button className="btn-r">Digital Products</button>
            </HashLink>
          </div>
        </div>

        {/* //right side div saif */}
        <div className="b-right-side">
          {/* <img
            style={{ zIndex: "2" }}
            src={"/r-img.png"}
            alt="right-side-img"
          /> */}

          <video
            className="video"
            src={`${bucket}referral_page_video.mp4`}
            autoPlay
            loop
            muted
            playsInline
          ></video>

{/*}
          <SessionBox
            className="first"
            name={"Rohit Das"}
            content={
              "Thanks for helping in understanding resume to attract recruiters."
            }
            // profile={"dd/mm/yy"}
          />
          <SessionBox
            className="second"
            name={"Vandana Balasubramanian"}
            content={
              "Resourceful List! I've applied to some open positions among these."
            }
            // profile={"BVDU Student"}
          />
          */}
        </div>
      </div>
{/*
      <div className="banner-cards">
        <div className="banner-card">
          <BannerCards
            title={"500+"}
            img={vectorComp1}
            text={"Engineers bought our created resources"}
          />
          <BannerCards
            title={"1738+"}
            img={vectorComp1}
            text={"Engineers have consulted us for their career"}
          />

          <BannerCards
            title={"5/5"}
            img={vectorComp3}
            text={"89 out of 95 have rated us 5/5 for our solutions"}
          />
        </div>
      </div>
*/}
      {/* //carousal */}
{/*
      <div
        id="carouselExampleControls"
        className="carousel slide d-block d-sm-none"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <BannerCards
              title={"500+"}
              img={vectorComp1}
              text={"Engineers bought our created resources"}
            />
          </div>
          <div className="carousel-item">
            <BannerCards
              title={"1738+"}
              img={vectorComp1}
              text={"Engineers have consulted us fro their career"}
            />
          </div>
          <div className="carousel-item">
            <BannerCards
              title={"5/5"}
              img={vectorComp3}
              text={"89 out of 95 have rated us 5/5 for our solutions"}
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
*/}
      {/* Career Support Intro Section */}
      <CareerSupportIntroSection />
      {/* ad below career support intro section*/}
      <AdsenseComp adSlot="8908232121" />

      {/* //connect With Us Section */}
      <ConnectWithUs compName={"Connect With Us"} />
      <DigitalProducts compName={"Digital Products"} />
      {/*
      <OurMentors />
      */}
      {/* ad below referral ratings*/}
      <AdsenseComp adSlot="5168117459" />
      <ReferralRatings />
      </>
    </SEO>
  );
};

export default Referrals;
