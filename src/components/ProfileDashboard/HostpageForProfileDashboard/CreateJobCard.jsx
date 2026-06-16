import React from "react";
import { FaArrowRight, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./hostcard.css";

const CreateJobCard = () => {
  return (
    <Link to={"/host/job"} className="host-card host-card--jobs" style={{ textDecoration: "none" }}>
      <div className="host-card__icon-wrap">
        <FaBriefcase size={20} />
      </div>
      <div className="host-card__body">
        <h3 className="host-card__title">Jobs</h3>
        <p className="host-card__link">
          Create Jobs <FaArrowRight size={11} />
        </p>
        <p className="host-card__desc">
          Unlock career opportunities! Connect young talent with exciting professionals.
        </p>
      </div>
    </Link>
  );
};

export default CreateJobCard;
