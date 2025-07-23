import React, { useState } from "react";
import "./youractivitysection.css";
import { GoStopwatch } from "react-icons/go";
import ActivityCardsSaif from "./ActivityCardsSaif";
import PostCardActivity from "./PostCardActivity/PostCardActivity";
import RecommendationCard2Activity from "../RecommendedSection/RecommendationCard2Activity";

const YourActivitySection = ({
  streakData,
  jobData,
  internshipData,
  postData,
}) => {
  const [actionButton, setActionButton] = useState("Posts");
  const [jobPage, setJobPage] = useState(1);
  const [internshipPage, setInternshipPage] = useState(1);
  const [postPage, setPostPage] = useState(1);

  const itemsPerPage = 4;
  const maxItems = 100;

  const limitedPostData = postData?.slice(0, maxItems) || [];

  const paginatedPosts = limitedPostData.slice(
    (postPage - 1) * itemsPerPage,
    postPage * itemsPerPage
  );

  const handleButtonClick = (buttonName) => {
    setActionButton(buttonName);
    if (buttonName === "Jobs") setJobPage(1);
    if (buttonName === "Internships") setInternshipPage(1);
  };

  console.log(postData, "postdata");

  // Limit job & internship data to 100 items
  const limitedJobData = jobData?.slice(0, maxItems) || [];
  const limitedInternshipData = internshipData?.slice(0, maxItems) || [];

  // Get paginated data for jobs & internships
  const paginatedJobs = limitedJobData.slice(
    (jobPage - 1) * itemsPerPage,
    jobPage * itemsPerPage
  );

  const paginatedInternships = limitedInternshipData.slice(
    (internshipPage - 1) * itemsPerPage,
    internshipPage * itemsPerPage
  );

  return (
    <div className="your-activity-section-main">
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <GoStopwatch size={18} />
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#002B36" }}>
          Activities
        </h3>
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
        {["Jobs", "Internships"].map((buttonName) => (
          <button
            key={buttonName}
            onClick={() => handleButtonClick(buttonName)}
            style={{
              padding: "4px 16px",
              borderRadius: "10px",
              background: actionButton === buttonName ? "#138382" : "#f2f4f5",
              fontSize: 14,
              color: actionButton === buttonName ? "white" : "black",
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
            }}
          >
            {buttonName}
          </button>
        ))}
      </div>

      {actionButton === "Posts" && (
        <>
          {paginatedPosts?.length > 0 ? (
            <>
              <div className="grid-post-card-activity">
                <PostCardActivity data={paginatedPosts} />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={() => setPostPage((prev) => Math.max(prev - 1, 1))}
                  disabled={postPage === 1}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: postPage === 1 ? "#f2f4f5" : "#138382",
                    color: postPage === 1 ? "#888" : "white",
                    border: "none",
                    cursor: postPage === 1 ? "default" : "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    setPostPage((prev) =>
                      prev * itemsPerPage < limitedPostData.length
                        ? prev + 1
                        : prev
                    )
                  }
                  disabled={postPage * itemsPerPage >= limitedPostData.length}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background:
                      postPage * itemsPerPage >= limitedPostData.length
                        ? "#f2f4f5"
                        : "#138382",
                    color:
                      postPage * itemsPerPage >= limitedPostData.length
                        ? "#888"
                        : "white",
                    border: "none",
                    cursor:
                      postPage * itemsPerPage >= limitedPostData.length
                        ? "default"
                        : "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70px",
                // border: "1px solid black",
              }}
            >
              <p style={{ marginBottom: 0 }}>No Posts Added!</p>
            </div>
          )}
        </>
      )}

      {actionButton === "Jobs" && (
        <>
          {paginatedJobs.length > 0 ? (
            <>
              <div className="grid-job-card-activity">
                <RecommendationCard2Activity data={paginatedJobs} />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={() => setJobPage((prev) => Math.max(prev - 1, 1))}
                  disabled={jobPage === 1}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: jobPage === 1 ? "#f2f4f5" : "#138382",
                    color: jobPage === 1 ? "#888" : "white",
                    border: "none",
                    cursor: jobPage === 1 ? "default" : "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    setJobPage((prev) =>
                      prev * itemsPerPage < limitedJobData.length
                        ? prev + 1
                        : prev
                    )
                  }
                  disabled={jobPage * itemsPerPage >= limitedJobData.length}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background:
                      jobPage * itemsPerPage >= limitedJobData.length
                        ? "#f2f4f5"
                        : "#138382",
                    color:
                      jobPage * itemsPerPage >= limitedJobData.length
                        ? "#888"
                        : "white",
                    border: "none",
                    cursor:
                      jobPage * itemsPerPage >= limitedJobData.length
                        ? "default"
                        : "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70px",
              }}
            >
              <p style={{ marginBottom: 0 }}>No Jobs Hosted!</p>
            </div>
          )}
        </>
      )}

      {actionButton === "Internships" && (
        <>
          {paginatedInternships.length > 0 ? (
            <>
              <div className="grid-job-card-activity">
                <RecommendationCard2Activity data={paginatedInternships} />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={() =>
                    setInternshipPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={internshipPage === 1}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background: internshipPage === 1 ? "#f2f4f5" : "#138382",
                    color: internshipPage === 1 ? "#888" : "white",
                    border: "none",
                    cursor: internshipPage === 1 ? "default" : "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    setInternshipPage((prev) =>
                      prev * itemsPerPage < limitedInternshipData.length
                        ? prev + 1
                        : prev
                    )
                  }
                  disabled={
                    internshipPage * itemsPerPage >=
                    limitedInternshipData.length
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background:
                      internshipPage * itemsPerPage >=
                      limitedInternshipData.length
                        ? "#f2f4f5"
                        : "#138382",
                    color:
                      internshipPage * itemsPerPage >=
                      limitedInternshipData.length
                        ? "#888"
                        : "white",
                    border: "none",
                    cursor:
                      internshipPage * itemsPerPage >=
                      limitedInternshipData.length
                        ? "default"
                        : "pointer",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
                  }}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70px",
              }}
            >
              <p style={{ marginBottom: 0 }}>No Internships Hosted!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default YourActivitySection;
