import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Bucket_URL } from "../../../services/APIUtils";

const TechnicalEventComp = () => {
  return (
    <>
      <Link to={"/host/technical-event"}>
        <div
          style={{
            width: "224px",
            padding: "12px",
            borderRadius: "8px",
            background: "#f3f9f9",
          }}
        >
          <div
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
              style={{ borderRadius: 5 }}
              src={`${Bucket_URL}frontend/hosting/technical-event-poster-small.png`}
              alt=""
              width={"200px"}
              height={"100px"}
            />
          </div>

          <div style={{ marginTop: 8 }}>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              Technical Event
            </h3>

            <div
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <h3
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "16px",
                  color: "#33555E",
                  marginBottom: 0,
                }}
              >
                Create Technical Event
              </h3>
              <FaArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TechnicalEventComp;
