import React from "react";
import "./assessmentcard.css";
const AssessmentCard = ({ data }) => {
  console.log(data, "assessdata");
  const { id, title, description, createdAt } = data;
  return (
    <div className="main-assessment-card-div">
      <div className="main-assessment-div-1">
        <div className="main-assessment-left">
          <h3 className="h3-assess">Backend Assessment Test V5</h3>
          <h4 className="h4-assess">Test Title</h4>
        </div>
        <div className="main-assessment-right">
          <h3 className="h3-assess">Medium</h3>
          <h4 className="h4-assess">Difficulty </h4>
        </div>
      </div>

      <div className="main-assessment-div-2">
        <div className="main-assessment-left">
          <h3 className="h3-assess">4</h3>
          <h4 className="h4-assess">Number of questions </h4>
        </div>
        <div className="main-assessment-right">
          <h3 className="h3-assess">1 minutes</h3>
          <h4 className="h4-assess">Time Needed </h4>
        </div>
      </div>

      <div className="main-assessment-div-3-btn-div">
        <button className="view-btn">View Questions</button>
        <button className="share-with-candi">Share with candidates</button>
      </div>
    </div>
  );
};

export default AssessmentCard;
