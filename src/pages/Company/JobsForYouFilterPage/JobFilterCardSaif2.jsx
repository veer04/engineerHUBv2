import React from "react";
import "./jobfiltercardsaif2.css";
import {
  EllipseBlue,
  FresherCompSvg,
  FresherJobParentSVG,
  RemoteJobsSvg,
} from "../../../components/SvgsIconsComps/SvgsComps";

const JobFilterCardSaif2 = () => {
  return (
    <div className="main-div-card-job-2">
      <div className="heading-job-filter-card">
        <h4 className="filter-cardheading-h4">Remote Jobs </h4>
      </div>

      <div className="parent-svg">
        <EllipseBlue />
      </div>
      <div className="child-svg">
        <RemoteJobsSvg />
      </div>
    </div>
  );
};

export default JobFilterCardSaif2;
