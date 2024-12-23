import React from "react";
import "./nodatacompbysaif.css";
import { Bucket_URL } from "../../../../services/APIUtils";

const NoDataCompBySaif = ({ titleName }) => {
  return (
    <div className="main-no-data-div">
      <div className="main-no-div-sub-div">
        <div className="no-data-img-div">
          <img
            className="no-data-img"
            src={`${Bucket_URL}UserViewDashboard/cancel.png`}
            alt="nodataimg"
          />
        </div>

        <p>{`No ${titleName} data is available!`}</p>
      </div>
    </div>
  );
};

export default NoDataCompBySaif;
