import React from "react";
import "./ProjectWindow.css";
import { RxCross1 } from "react-icons/rx";

export default function ProjectWindow({ setIsProjectOpen }) {
  return (
    <div className="project__window">
      <div className="project__window__title">
        <div className="detail">
          <div
            className="logo"
            style={{
              // backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "lightblue",
            }}
          ></div>
          <div className="title">Weather App Project</div>
        </div>
        <div onClick={() => setIsProjectOpen(false)} className="link">
          <RxCross1 />
        </div>
      </div>
      <div
        style={{
          //   backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "15rem",
          backgroundColor: "var(--main-background-color)",
          border: "1px solid lightgrey",
          borderRadius: ".5rem",
        }}
        className="project_window__poster"
      ></div>
      <div className="project__window__description">
        <div className="heading">Description</div>
        <div className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sit
          molestiae ullam adipisci esse exercitationem est unde inventore
          molestias vitae. Nisi nulla error quibusdam laboriosam.
        </div>
      </div>
      <div className="project__window__tags">
        <div className="heading">Project Tags</div>
        <div className="tags">
          <div className="tag">HTML</div>
          <div className="tag">CSS</div>
          <div className="tag">JavaScript</div>
        </div>
      </div>
      <div className="project__window__prerequisites">
        <div className="prerequisites">
          <div className="heading">Prerequisites</div>
          <div className="prerequisite">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L5.375 10L1 5.90909"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>Lorem ipsum dolor sit amet.</div>
          </div>
          <div className="prerequisite">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L5.375 10L1 5.90909"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>Lorem ipsum dolor sit amet.</div>
          </div>
          <div className="prerequisite">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L5.375 10L1 5.90909"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>Lorem ipsum dolor sit amet.</div>
          </div>
        </div>
      </div>
      <div className="project__window__software">
        <div className="softwares">
          <div className="heading">Software Used</div>
          <div className="software">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L5.375 10L1 5.90909"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>Software Name</div>
          </div>
          <div className="software">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L5.375 10L1 5.90909"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>Software Name</div>
          </div>
        </div>
      </div>
      <div className="project__window__info">
        <div className="heading">Additional Information</div>
        <div className="info">
          <div className="info__item">
            <div className="label">Salary/Stipend</div>
            <div className="value">5000/-</div>
          </div>
          <div className="info__item">
            <div className="label">Work Availability</div>
            <div className="value">2hr/day</div>
          </div>
        </div>
      </div>
      <div className="project__window__apply">
        <div className="apply">Apply Now</div>
      </div>
    </div>
  );
}
