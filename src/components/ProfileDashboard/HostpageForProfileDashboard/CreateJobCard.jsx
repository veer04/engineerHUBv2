import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateJobCard = () => {
  const hostCardStyle = {
    width: "224px",
    height: "auto",
    padding: "14px",
    borderRadius: "10px",
    background: "#f7fbfb",
    border: "1px solid #d7e7e7",
    boxShadow: "0 4px 14px rgba(16, 50, 58, 0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  return (
    <>
      <Link to={"/host/jobs"} style={{ textDecoration: "none" }}>
        <div
          style={hostCardStyle}
        >
          {/* HOST CARD IMAGE TEMPORARILY DISABLED (can be re-enabled later) */}
          {/* <div
            style={{
              width: "200px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <img
              src={`${Bucket_URL}frontend/hosting/job-poster-small.png`}
              alt="hello"
              width={"200px"}
              height={"100px"}
            />
          </div> */}

          <div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Jobs
            </h3>

            <div
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <h3
                style={{
                  fontSize: 13,

                  fontWeight: 400,
                  lineHeight: "16px",
                  color: "#33555E",
                  marginBottom: 0,
                }}
              >
                Create Jobs
              </h3>
              <FaArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CreateJobCard;
