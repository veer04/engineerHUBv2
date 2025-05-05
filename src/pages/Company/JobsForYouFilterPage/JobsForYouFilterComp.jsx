import React from "react";
import "./jobsforyoufiltercomp.css";
import JobFilterCardSaif from "./JobFilterCardSaif";
import JobFilterCardSaif2 from "./JobFilterCardSaif2";
import JobFilterCardSaif3 from "./JobFilterCardSaif3";
import JobFilterCardSaif4 from "./JobFilterCardSaif4";
const JobsForYouFilterComp = () => {
  return (
    <div className="main-jobs-for-you-filter">
      <div>
        <h4 className="h4-jobs-for-u">Jobs for you</h4>
      </div>

      <div className="second-grid-div-jobs-for-you-filter">
        <JobFilterCardSaif />
        <JobFilterCardSaif2 />
        <JobFilterCardSaif3 />
        <JobFilterCardSaif4 />
      </div>
    </div>
  );
};

export default JobsForYouFilterComp;
