import React from "react";
import "./easywaytohire.css";
import EasyWayCard from "./EasyWayCard";

export const EasyStepsCardData = [
  {
    key: 1,
    title: "Do-it-yourself hiring",
    desc: `Zero cost. Basic tools.\nInstant access to job seekers.`,
    bgColor: "#ffe37152",
    btnText: "Host Now",
    btnUrl: "/host/job",
    isFree: true,
  },
  {
    key: 2,
    title: "Use our sourcing Expert",
    desc: `Our experts match you with fits.\nPay per role or ~ 3% on success.`,
    bgColor: "#d7f9db",
    btnText: "Connect Now",
    btnUrl: "",
    isFree: false,
  },
  {
    key: 3,
    title: "Let us hire for you",
    desc: `From start to hire, we manage it all.\nStarts at ~5% of CTC.`,
    bgColor: "#fddede",
    btnText: "Connect Now",
    btnUrl: "",
    isFree: false,
  },
];

const EasyWayToHire = () => {
  return (
    <>
      <div className="main-easy-way-to-hire-div">
        <div className="h3-3easy-hire-div">
          <h3 className="h3-3easy-hire"> 
            3 easy ways to{" "}
            <span style={{ backgroundColor: "#fdf751" }}> Hire</span> through
            engineerHUB{" "}
          </h3>
        </div>

        <div className="arrow-easy">
          <div className="vertical-line" />
          <div className="horizontal-line" />
          <div className="branch-left" />
          <div className="branch-right" />
        </div>
        <div className="main-grid-comp">
          {EasyStepsCardData.map((data, index) => (
            <div className="main-grid-card">
              <EasyWayCard data={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EasyWayToHire;
