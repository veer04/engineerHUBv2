import React from "react";
import "./jobfiltercardsaif.css";
import {
  FresherCompSvg,
  FresherJobParentSVG,
} from "../../../components/SvgsIconsComps/SvgsComps";

const JobFilterCardSaif = ({ queryParam }) => {
  const handleClick = () => {
    window.location.href = `/career/jobs?pageNo=1&limit=24&${queryParam}=1`;
  };

  return (
    <div className="main-div-card-job" onClick={() => handleClick()}>
      <div className="heading-job-filter-card">
        <h4 className="filter-cardheading-h4">Fresher’s Jobs </h4>
      </div>

      <div className="parent-svg">
        <FresherJobParentSVG />
      </div>
      <div className="child-svg">
        <FresherCompSvg />
      </div>
    </div>
  );
};

export default JobFilterCardSaif;
