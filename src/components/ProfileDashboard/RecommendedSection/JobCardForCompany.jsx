import React, { useEffect, useState } from "react";
import "./jobcardforcompany.css";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserId, isUserLoggedIn } from "../../../features/User/UserDetails";

const JobCardForCompany = ({ data, adminView }) => {
  const [viewVisibility, setViewVisibility] = useState({});

  const toggleAmountShow = (id) => {
    setViewVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const { search } = useLocation();
  const navigate = useNavigate();
  const userId = getUserId();
  const idparams = useParams();

  const JobRedirect = (id) => {
    navigate(`/career/jobs/${id}${!!search ? search : ""}`);
  };

  function isJobCreator() {
    return isUserLoggedIn() && userId === idparams?.userId;
  }

  useEffect(() => {
    isJobCreator();
  }, []);

  const handleNavigateJobBoard = (id) => {
    navigate(`/career/jobs/board/${id}${!!search ? search : ""}`, {
      replace: true,
    });
  };

  return (
    <>
      {data &&
        data.length > 0 &&
        data?.map((job, index) => (
          <div
            onClick={() => JobRedirect(job._id)}
            className="recommendation-card1-main"
            key={job._id}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h4
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: "16px",
                    color: "#002B36",
                    marginBottom: 0,
                  }}
                >
                  {job.organisationName}
                </h4>

                <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <FaRegEye style={{ cursor: "pointer", color: "#7a8f94" }} />
                  <h3
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      lineHeight: "16px",
                      color: "#7a8f94",
                      marginBottom: 0,
                    }}
                  >
                    {job.views}
                  </h3>
                </div>
              </div>

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: "24px",
                  color: "#002B36",
                  marginBottom: 0,
                }}
              >
                {job.opportunityName}
              </h3>
            </div>
            {/* //recommendation profile data */}
            <div
              style={{ marginTop: 5 }}
              className="icon-section-recommended-1"
            >
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <div>
                  <img src="./location3.svg" alt="" />
                </div>

                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "#002B36",
                    marginBottom: 0,
                    marginTop: 3,
                  }}
                >
                  {job.city} ({job.opportunityLocation})
                </h3>
              </div>

              <div></div>
            </div>
            <div
              style={{ marginTop: 3 }}
              className="icon-section-recommended-1"
            >
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <div>
                  <img src="./salary.svg" alt="" />
                </div>

                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "#002B36",
                    marginBottom: 0,
                    marginTop: 3,
                  }}
                >
                  {job.showSalary
                    ? job.salaryDisclosure
                    : "Salary Not Disclosed"}
                </h3>
              </div>

              <div></div>
            </div>
            <div
              style={{ marginTop: 3 }}
              className="icon-section-recommended-1"
            >
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <div>
                  <img src="./experience.svg" alt="" />
                </div>

                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "#002B36",
                    marginBottom: 0,
                    marginTop: 3,
                  }}
                >
                  {job.isForFreshers
                    ? "Fresher"
                    : `${job.minExperience}-${job.maxExperience} Years` ||
                      `1-2 Years`}
                </h3>
              </div>

              <div className="absolute-position-amazon">
                <img
                  style={{ borderRadius: "50%" }}
                  src={job.organisationLogo}
                  width={48}
                  height={48}
                  alt=""
                />
              </div>
            </div>

            {/* //recommendation profile data end */}

            <div
              style={{
                height: 1,
                background: "#E0E0E0",
                alignSelf: "stretch",
                marginTop: "auto",
                marginBottom: 10,
              }}
            ></div>

            {/* //button div */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {adminView ? (
                !job.applyLink ? (
                  <button
                    className="btn-h4-main btn-view-candidates"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigateJobBoard(job._id);
                    }}
                  >
                    <h4 className="h4-view-candidates">View Candidates</h4>
                  </button>
                ) : (
                  <button
                    className="btn-h4-main btn-external-apply"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    title="No response here as application is redirecting on another platform"
                  >
                    <h4 className="h4-view-candidates">Redirected </h4>
                  </button>
                )
              ) : <div />}

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#138382"
                }}
              >
                {!job.applyLink ? `${job.totalAppliedUsers || 0} Applications` : `${job.clicks || 0} Clicks`}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default JobCardForCompany;
