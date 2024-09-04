import React from "react";
import "./stepindicator.css";

const StepIndicator = ({ currentStep }) => {
  return (
    <div className={`step-indicator completed-${currentStep}`}>
      <div className={`step ${currentStep >= 1 ? "completed" : ""}`}>
        <div className="step-icon">{currentStep >= 1 ? "✓" : ""}</div>
        <div className="step-label">Select Slot</div>
      </div>
      <div className={`step ${currentStep >= 2 ? "completed" : ""}`}>
        <div className="step-icon">{currentStep >= 2 ? "✓" : ""}</div>
        <div className="step-label">Payment</div>
      </div>
      <div className={`step ${currentStep >= 3 ? "completed" : ""}`}>
        <div className="step-icon">{currentStep >= 3 ? "✓" : ""}</div>
        <div className="step-label">Confirmation</div>
      </div>
    </div>
  );
};

export default StepIndicator;
