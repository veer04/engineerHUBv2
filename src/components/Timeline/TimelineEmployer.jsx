import React from "react";
import "./TimelineEmployer.css";

export default function TimelineEmployer({
  step,
  numberOfCheckpoints,
  width,
}) {
  let renderedLines = [];
  let renderedCheckpoints = [];

  for (let i = 1; i < numberOfCheckpoints; i++) {
    renderedLines.push(
      <div
        key={i}
        style={{
          borderColor: step >= i + 1 ? "var(--primary-color-dark-green)" : "",
          width: `${100 / (numberOfCheckpoints - 1)}%`,
          left: `${((i - 1) / (numberOfCheckpoints - 1)) * 100}%`,
        }}
        className="line"
      ></div>
    );
  }

  for (let i = 0; i < numberOfCheckpoints; i++) {
    renderedCheckpoints.push(
      <div
        key={i}
        style={{
          backgroundColor:
            step === i + 1
              ? "var(--primary-color-dark-green)"
              : step > i + 1
              ? "#15CF74"
              : "",
          color: step === i + 1 ? "white" : step > i + 1 ? "white" : "",
          borderColor:
            step === i + 1
              ? "var(--primary-color-dark-green)"
              : step > i + 1
              ? "#15CF74"
              : "",
        }}
        className="form-button"
      >
        {i + 1}
      </div>
    );
  }

  return (
    <div className="timeline__container">
      <div
        style={{
          width: width,
        }}
        className="timeline-buttons"
      >
        {renderedLines}
        {renderedCheckpoints}
      </div>
    </div>
  );
}
