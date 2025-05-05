import React from "react";
import "./jobfiltercardsaif4.css";
import { Bucket_URL } from "../../../services/APIUtils";

const JobFilterCardSaif4 = () => {
  return (
    <div className="main-div-card-job-4">
      <div className="heading-job-filter-card">
        <h4 className="filter-cardheading-h4">MAANG </h4>
      </div>

      <div className="main-4th-img">
        <img src={`${Bucket_URL}last_image.png`} alt="" />
      </div>
    </div>
  );
};

export default JobFilterCardSaif4;
