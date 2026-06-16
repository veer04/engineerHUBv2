import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { PiGraduationCapBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import "./hostcard.css";

const CreateInternshipCard = () => {
  return (
    <Link to={"/host/internship"} className="host-card host-card--internship" style={{ textDecoration: "none" }}>
      <div className="host-card__icon-wrap">
        <PiGraduationCapBold size={20} />
      </div>
      <div className="host-card__body">
        <h3 className="host-card__title">Internships</h3>
        <p className="host-card__link">
          Create Internships <FaArrowRight size={11} />
        </p>
        <p className="host-card__desc">
          Engage with aspiring talent. Showcase internship opportunities on our platform.
        </p>
      </div>
    </Link>
  );
};

export default CreateInternshipCard;
