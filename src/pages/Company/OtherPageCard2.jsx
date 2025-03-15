import React from "react";
import "./otherpagecard2.css";
import { Bucket_URL } from "../../services/APIUtils";

const OtherPageCard2 = ({ image, link }) => {
  const handleClick = () => {
    window.open(link, "_blank");
  };
  return (
    <div className="main-other-page-comp-div-2" onClick={handleClick}>
      {/* <img src={image} alt="" className="image-div" /> */}
      <h3
        style={{
          fontSize: 14.2,
          fontWeight: 600,
          letterSpacing: -0.4,
          fontFamily: "Inter",
          color: "#f2f2f2",
          textAlign: "center",
          marginBottom: 35,
        }}
      >
        Get Referred in top MNC’s
      </h3>

      <div className="grid-div">
        <div className="grid-div-sub">
          <img
            src={`${Bucket_URL}Mentors/otherpages/mic.png`}
            alt=""
            width={"100%"}
            height={"100%"}
            className="img-icons-css"
          />
        </div>

        <div className="grid-div-sub">
          <img
            src={`${Bucket_URL}Mentors/otherpages/pay.png`}
            alt=""
            width={"100%"}
            height={"100%"}
            className="img-icons-css"
          />
        </div>

        <div className="grid-div-sub">
          <img
            src={`${Bucket_URL}Mentors/otherpages/star.png`}
            alt=""
            width={"100%"}
            height={"100%"}
            className="img-icons-css"
          />
        </div>

        <div className="grid-div-sub">
          <img
            src={`${Bucket_URL}Mentors/otherpages/amazon.png`}
            alt=""
            width={"100%"}
            height={"100%"}
            className="img-icons-css"
          />
        </div>

        <div className="grid-div-sub">
          <img
            src={`${Bucket_URL}Mentors/otherpages/accenture.png`}
            alt=""
            width={"100%"}
            height={"100%"}
            className="img-icons-css"
          />
        </div>

        <div className="grid-div-sub">
          <img
            src={`${Bucket_URL}Mentors/otherpages/starlink.png`}
            alt=""
            width={"100%"}
            height={"100%"}
            className="img-icons-css"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherPageCard2;
