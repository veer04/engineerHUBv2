import React from "react";
import "./bannerspacecomp.css";
import { useLocation, useNavigate } from "react-router-dom";

const BannerSpaceComp = ({ image, urlLink }) => {
  const pathname = useLocation().pathname;
  console.log(pathname, "pathname");

  const handleRedirect = () => {
    window.open(`https://collegele.com/application`, "_blank");
  };
  return (
    <div
      onClick={handleRedirect}
      className="banner-space-container"
      style={{
        marginBottom: pathname === "/career/jobs/" ? "20px" : "40px",
      }}
    >
      <img src={image} alt="" className="image-banner" />
    </div>
  );
};

export default BannerSpaceComp;
