import React from "react";
import { useNavigate } from "react-router-dom";
import "./otherpagecard2.css";
import { Bucket_URL } from "../../services/APIUtils";

const OtherPageCard2 = ({ image, link }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Check if it's an internal or external link
    if (link.startsWith('https://engineerhub.in')) {
      // For internal links, use navigate
      const path = link.replace('https://engineerhub.in', '');
      navigate(path);
    } else {
      // For external links, use window.open
      window.open(link, "_blank");
    }
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
        Get Referred in top MNC's
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
