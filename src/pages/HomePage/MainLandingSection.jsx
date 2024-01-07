import React from "react";
import "./MainLandingSection.css";
import { Bucket_URL } from "../../services/APIUtils";
import CountUp from "react-countup";

export default function MainLandingSection() {
  const bucket = `${Bucket_URL}frontend/homepage/mainlandingsection/`;

  return (
    <div className="homepage-landing-container">
      <div className="homepage-landing-content">
        <p className="text-green subheading-2">connecting...</p>
        <h1 className="landing-title text-dark-green heading-3">
          community, campus & company
        </h1>
        <p className="landing-description text-green subheading-2">
          We are India's fastest-growing community of engineers aiming to
          connect campuses in a network to learn, develop and build careers
          together.
        </p>
        <div className="homepage-numbers-container">
          <div className="number-container">
            <img
              className="number-image w-100 d-flex justify-content-center"
              src={`${bucket}students-number.png`}
              alt="Students number"
            />
            <span className="number-counter w-100 d-flex justify-content-center text-dark-green heading-3">
              <CountUp
                start={0}
                end={75000}
                duration={1.9}
                smooth={true}
                smartEasingAmount={true}
                delay={0}
              ></CountUp>
              +
            </span>
            <span className="number-title w-100 d-flex justify-content-center text-dark-green subheading-1">
              Students
            </span>
          </div>
          <div className="number-container">
            <img
              className="number-image w-100"
              src={`${bucket}campus-number.png`}
              alt="Students number"
            />
            <span className="number-counter w-100 d-flex justify-content-center text-dark-green heading-3">
              <CountUp
                start={0}
                end={1100}
                duration={2}
                smooth={true}
                smartEasingAmount={true}
                delay={0}
              ></CountUp>
              +
            </span>
            <span className="number-title w-100 d-flex justify-content-center text-dark-green subheading-1">
              Campus
            </span>
          </div>
          <div className="number-container">
            <img
              className="number-image w-100 d-flex justify-content-center"
              src={`${bucket}companies-number.png`}
              alt="Students number"
            />
            <span className="number-counter w-100 d-flex justify-content-center text-dark-green heading-3">
              <CountUp
                start={0}
                end={125}
                duration={2.5}
                smooth={true}
                smartEasingAmount={true}
                delay={0}
              ></CountUp>
              +
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
