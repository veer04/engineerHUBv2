import React, { useEffect, useState } from "react";
import "./jobcardforcompany.css";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserId, isUserLoggedIn } from "../../../features/User/UserDetails";

const JobCardForCompany = ({ data, adminView }) => {
  const [viewVisibility, setViewVisibility] = useState({});

  console.log(data, "data");

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
    // console.log(userId)
    // console.log(idparams.userId)
    // console.log(isUserLoggedIn() && userId === idparams?.userId, "hgf");  // here useParams returns an object with key as userId that is why need to describe it out.
    return isUserLoggedIn() && userId === idparams?.userId;
  }
  console.log(isJobCreator());

  useEffect(() => {
    isJobCreator();
  }, []);

  const handleNavigateJobBoard = (id) => {
    console.log("click");
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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

                {
                  <button
                    className="btn-h4-main"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigateJobBoard(job._id);
                    }}
                  >
                    <h4 className="h4-view-candidates">View Candidates</h4>
                  </button>
                }
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
                background: "#B0B0B0",
                alignSelf: "stretch",
                marginTop: 10,
              }}
            ></div>

            {/* //border end */}

            {/* //button div */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <button
                style={{
                  background: "#eaf7e2",
                  border: "1px solid #69d578",
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "16px",
                  padding: "4px 4px",
                  borderRadius: 5,
                }}
              >
                New Opening
              </button>

              {/* //eye div saif */}
              <div style={{ display: "flex", gap: 3 }}>
                <FaRegEye style={{ cursor: "pointer" }} />

                <h3
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: "16px",
                    color: "#002B36",
                    marginBottom: 0,
                  }}
                >
                  {job.views}
                </h3>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default JobCardForCompany;
