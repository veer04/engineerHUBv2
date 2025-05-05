import React from "react";
import "./jobfiltercardsaif3.css";
import { MobileEasyApplySVg } from "../../../components/SvgsIconsComps/SvgsComps";

const JobFilterCardSaif3 = () => {
  return (
    <div className="main-div-card-job-3">
      <div className="heading-job-filter-card">
        <h4 className="filter-cardheading-h4">Easy Apply </h4>
      </div>

      <div className="parent-svg">
        <div
          style={{
            width: "151px",
            height: "133px",
            flexShrink: 0,
            borderRadius: "21px",
            background: "rgba(96, 235, 40, 0.79)",
          }}
        ></div>
      </div>
      <div className="child-svg">
        <MobileEasyApplySVg />
      </div>
    </div>
  );
};

export default JobFilterCardSaif3;
