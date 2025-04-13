import React from "react";
import "./bannerspacecomp.css";
import { useLocation } from "react-router-dom";

const BannerSpaceComp = ({ image }) => {
  const pathname = useLocation().pathname;
  console.log(pathname, "pathname");
  return (
    <div
      className="banner-space-container"
      style={{
        marginBottom: pathname === "/career/jobs/" ? "20px" : "40px",
      }}
    >
      <img src={image} alt="" />
    </div>
  );
};

export default BannerSpaceComp;
