import React, { useEffect, useState } from "react";
import "./ProjectWindow.css";
import { RxCross1 } from "react-icons/rx";
import { getProjectById, controller } from "../../services/APIConfig";
import decryptData from "../../features/DeCrypt";
import useSidebar from "../../hooks/use-sidebar";
import { useNavigate } from "react-router-dom";
export default function ProjectWindow({ projectOpened, setIsProjectOpen }) {
  const [project, setProject] = useState({});
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();
  useEffect(() => {
    if (isCollapsed === false) setIsProjectOpen(false);
  }, [isCollapsed]);

  useEffect(() => {
    getProjectById(setProject, projectOpened);
    window.scrollTo(0, 0);

    return () => {
      controller.abort();
    };
  }, [projectOpened]);

  return (
    <div className="project__window">
      <div className="project__window__title">
        <div className="detail">
          <div
            className="logo"
            style={{
              backgroundImage: `url(${project.organizationLogo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minWidth: "50px",
              minHeight: "50px",
              width: "50px",
              height: "50px",
              aspectRatio: "1/1",
              borderRadius: "50%",
              backgroundColor: "lightblue",
            }}
          ></div>
          <div className="title">{project.projectName}</div>
        </div>
        <div onClick={() => setIsProjectOpen(false)} className="link">
          <RxCross1 />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${project.projectImage})`,
          backgroundSize: "cover",
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
        <div className="description">{project.description}</div>
      </div>
      <div className="project__window__tags">
        <div className="heading">Project Tags</div>
        <div className="tags">
          {project.techStack &&
            project.techStack?.map((tag) => (
              <div key={tag} className="tag">
                {tag}
              </div>
            ))}
        </div>
      </div>
      <div className="project__window__prerequisites">
        <div className="prerequisites">
          <div className="heading">Prerequisites</div>
          {project.prerequisites &&
            project.prerequisites?.map((prerequisite) => (
              <div key={prerequisite} className="prerequisite">
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
                <div>{prerequisite}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="project__window__software">
        <div className="softwares">
          <div className="heading">Software Used</div>
          {project.softwareUsed?.map((software) => {
            return (
              <div key={software} className="software">
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
                <div>{software}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="project__window__software">
        <div className="softwares">
          <div className="heading">Hardware Used</div>
          {project.hardwareUsed?.map((hardware) => {
            return (
              <div key={hardware} className="software">
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
                <div>{hardware}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="project__window__info">
        <div className="heading">Additional Information</div>
        <div className="info">
          <div className="info__item">
            <div className="label">Salary/Stipend</div>
            <div className="value">{project.stipend}/-</div>
          </div>
          <div className="info__item">
            <div className="label">Work Availability</div>
            <div className="value">{project.workAvailability}hr/day</div>
          </div>
        </div>
      </div>
      <div className="project__window__apply">
        <div className="apply" onClick={() => navigate("/register")}>
          Apply Now
        </div>
      </div>
    </div>
  );
}
