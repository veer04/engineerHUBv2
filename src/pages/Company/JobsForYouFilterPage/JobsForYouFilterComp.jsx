import React from "react";
import "./jobsforyoufiltercomp.css";
import JobFilterCardSaif from "./JobFilterCardSaif";
import JobFilterCardSaif2 from "./JobFilterCardSaif2";
import JobFilterCardSaif3 from "./JobFilterCardSaif3";
import JobFilterCardSaif4 from "./JobFilterCardSaif4";

const JobsForYouFilterComp = () => {
  return (
    <div className="main-jobs-for-you-filter">
      <h4 className="segment-heading">Jobs For You</h4>

      <div className="second-grid-div-jobs-for-you-filter">
        <JobFilterCardSaif queryParam="isForFreshers" />
        <JobFilterCardSaif2 queryParam="isRemote" />
        <JobFilterCardSaif3 queryParam="isEasyApply" />
        <JobFilterCardSaif4 queryParam="isMaang" />
      </div>
    </div>
  );
};

export default JobsForYouFilterComp;
