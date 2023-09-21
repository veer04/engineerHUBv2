import React from "react";
import "./ProjectCards.css";
import { useNavigate } from "react-router-dom";
import defaultPoster from "../../../assets/defaultPoster";
import { useEffect } from "react";
import { useState } from "react";
import ViewApplicantsModal from "../../../components/Dashboard/ViewApplicantsModal";

const ProjectCards = ({ data, className, adminView }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.getElementById(
      `company-project-card-description-${data._id}`
    ).innerHTML = data.description;
  }, [data.description]);
  return (
    <div
      className={`ProjectCard ${className}`}
      onClick={() => {
        if (adminView) return;
        navigate(`/company/projects/${data._id}`);
      }}
    >
      <div className="ProjectCardTile">
        {data.projectPoster ? (
          <div
            style={{ backgroundImage: `url(${data.projectPoster})` }}
            className="imageBanner"
            alt="Image"
          />
        ) : (
          <>
            <div
              style={{ backgroundImage: `url(${defaultPoster})` }}
              className="imageBanner"
              alt="Image"
            />
          </>
        )}
        <div className="ProjectCardContent">
          <h1 className="text-crop-2 overflow-hidden">{data.projectName}</h1>
          <p
            id={`company-project-card-description-${data._id}`}
            className="text-crop-3 overflow-hidden"
          ></p>
          <div className="tags">
            {data.techStack?.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
            {data.techStack?.length > 3 ? (
              <span className="tag">+{data.techStack?.length - 3}</span>
            ) : null}
          </div>
          <br />
          {!adminView && (
            <div className="organization">
              <div className="logo overflow-hidden">
                <img
                  src={data.organisationLogo}
                  alt="logo"
                  className="logoImg"
                />
              </div>
              <h5>{data.organisationName}</h5>
            </div>
          )}
          {adminView && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                }}
              >
                {data?.views} Views
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleModal(true);
                  // navigate(`/company/projects/${data._id}/applicants`);
                }}
                style={{
                  //should be in center
                  // position: "relative",
                  left: "50%",
                  // transform: "translateX(-50%)",
                  backgroundColor: "#014051",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                  color: "#fff",
                  fontWeight: "500",
                  fontSize: "14px",
                  cursor: "pointer",
                  outline: "none",
                  boxShadow: "0px 0px 3.5px 0px rgba(0,0,0,0.75)",
                }}
              >
                View Applicants
              </button>
            </div>
          )}
        </div>
      </div>
      {toggleModal && (
        <ViewApplicantsModal
          applicantsCount={data?.totalAppliedUsers}
          setToggleModal={setToggleModal}
        />
      )}
    </div>
  );
};

export default ProjectCards;
