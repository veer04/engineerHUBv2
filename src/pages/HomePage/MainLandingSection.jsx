import React from "react";
import "./MainLandingSection.css";
import { Bucket_URL } from "../../services/APIUtils";

export default function MainLandingSection() {
  const bucket = `${Bucket_URL}frontend/homepage/mainlandingsection/`;

  return (
    <div className="homepage-landing-container">
      <div className="homepage-landing-content">
        <p className="text-green subheading-2">connecting...</p>
        <h1 className="landing-title text-dark-green heading-3">
          engineers, campus & industries
        </h1>
        <p className="landing-description text-green subheading-2">
          engineerHUB is INDIA's leading community of engineers where students
          or alumni from IITs, NITs, IIITs and state colleges unite together to
          develop and nurture the skills of students all over India.
        </p>
        <div className="homepage-numbers-container">
          <div className="number-container">
            <img
              className="number-image w-100 d-flex justify-content-center"
              src={`${bucket}students-number.svg`}
              alt="Students number"
            />
            <span className="number-counter w-100 d-flex justify-content-center text-dark-green heading-3">
              60,000+
            </span>
            <span className="number-title w-100 d-flex justify-content-center text-dark-green subheading-1">
              Students
            </span>
          </div>
          <div className="number-container">
            <img
              className="number-image w-100"
              src={`${bucket}campus-number.svg`}
              alt="Students number"
            />
            <span className="number-counter w-100 d-flex justify-content-center text-dark-green heading-3">
              850+
            </span>
            <span className="number-title w-100 d-flex justify-content-center text-dark-green subheading-1">
              Campus
            </span>
          </div>
          <div className="number-container">
            <img
              className="number-image w-100 d-flex justify-content-center"
              src={`${bucket}companies-number.svg`}
              alt="Students number"
            />
            <span className="number-counter w-100 d-flex justify-content-center text-dark-green heading-3">
              50+
            </span>
            <span className="number-title w-100 d-flex justify-content-center text-dark-green subheading-1">
              Companies
            </span>
          </div>
        </div>
      </div>
      <div className="homepage-landing-image-container">
        <img
          className="homepage-landing-image"
          src={`${bucket}main-vector.svg`}
          alt="Main Vector"
        />
      </div>
    </div>
  );
}
