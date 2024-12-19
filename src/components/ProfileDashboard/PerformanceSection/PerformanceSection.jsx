import React, { useEffect, useState } from "react";
import "./performancesection.css";
import { VscGraph } from "react-icons/vsc";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/getCookieValues";

const PerformanceSection = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [blurEnabled, setBlurEnabled] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);

  const [performaceData, setPerformanceData] = useState([]);

  const fetchRecommendationData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}api/v1/userDashboard/applicationResult?page=${currentPage}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            accesstoken: getAccessToken(),
          },
        }
      );

      const data = await response.json();
      setPerformanceData(data.data);
      setLoading(false);
      console.log(data.data, "performaceData");
    } catch (error) {
      console.error("Error getting the data");
    }
  };

  useEffect(() => {
    fetchRecommendationData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleViewTable = () => {
    console.log("click");
    setShowHeader(true);
    setBlurEnabled(false);
    setShowButton(false);
  };
  return (
    <div className="performance-section-main-div">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <VscGraph size={18} />
          <h3
            style={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "24px",
              color: "#002B36",
              marginBottom: 0,
            }}
          >
            Your Performance
          </h3>
        </div>

        <div>
          <button
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "16px",
              color: "white",
              padding: "4px 8px",
              borderRadius: 5,
              background: "#547178",
              border: 0,
              cursor: "pointer",
            }}
          >
            {showHeader ? "Close Analytics" : "View Analytics"}
          </button>
        </div>
      </div>

      <div className="analytics-boxes-div">
        <div className="analytics-box-1">
          <h3
            style={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: "24px",
              color: "#FF0000",
              marginBottom: 0,
            }}
          >
            {performaceData.performace || "Good"}
          </h3>

          <h3
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "16px",
              color: "#002B36",
              marginBottom: 0,
            }}
          >
            Your job profile score
          </h3>
        </div>

        {performaceData?.counts?.map((count, index) => (
          <div className="analytics-box-2">
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                lineHeight: "24px",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              {count.total}
            </h3>

            <h3
              style={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: "16px",
                color: "#486D76",
                marginBottom: 0,
              }}
            >
              Opportunity Applied
            </h3>
          </div>
        ))}

        {performaceData &&
          performaceData?.counts?.map((c, index) => {
            const { _id, total } = c;
            return (
              <>
                <div key={index} className="analytics-box-3">
                  <div style={{ display: "flex", gap: 4 }}>
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: "24px",
                        color: "#002B36",
                        marginBottom: 0,
                      }}
                    >
                      {total}
                    </h3>

                    <div
                      style={{
                        background: "#f4eded",
                        borderRadius: "50%",
                        width: 22,
                        height: 22,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={"./arrow-green.svg"}
                        alt=""
                        width={"16px"}
                        height={"16px"}
                      />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      lineHeight: "16px",
                      color: "#486D76",
                      marginBottom: 0,
                    }}
                  >
                    Shortlisted
                  </h3>
                </div>
              </>
            );
          })}

        <div className="analytics-box-3">
          <div style={{ display: "flex", gap: 4 }}>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                lineHeight: "24px",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              8
            </h3>

            <div
              style={{
                background: "#f4eded",
                borderRadius: "50%",
                width: 22,
                height: 22,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={"./arrow-up.svg"}
                alt=""
                width={"16px"}
                height={"16px"}
              />
            </div>
          </div>

          <h3
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "16px",
              color: "#486D76",
              marginBottom: 0,
            }}
          >
            Rejected
          </h3>
        </div>
      </div>

      {/* //table div */}

      {!isMobile && (
        <div style={{ marginTop: 15, paddingBottom: 20, position: "relative" }}>
          <table
            cellPadding="10"
            cellSpacing="0"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            {showHeader && (
              <thead style={{ background: "#d0e6e6" }}>
                <tr
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "#1D2433",
                  }}
                >
                  <th>Sr.No</th>
                  <th style={{ width: "140px" }}>Company Name</th>
                  <th>Job Title</th>
                  <th>Status</th>
                  <th style={{ width: "210px" }}>Shortlisted/Rejected</th>
                </tr>
              </thead>
            )}

            {loading ? (
              <div className="loader-new-saif">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <tbody>
                {performaceData &&
                  performaceData?.applications?.map((app, index) => {
                    const { hiringId, status, createdAt, _id } = app;
                    const { organisationName, opportunityName } = hiringId;

                    return (
                      <tr
                        key={app._id}
                        style={{
                          position: "relative",
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: "16px",
                          color: "#1D2433",
                          borderBottom: "1px solid #e8e8e8",
                          overflow: "hidden",
                        }}
                      >
                        {/* Gradient Layer */}
                        {blurEnabled && (
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background:
                                "linear-gradient(180deg, rgba(61, 61, 61, 0.6), rgba(255, 255, 255, 0.6))",
                              mixBlendMode: "screen",
                              pointerEvents: "none",
                              zIndex: 0,
                            }}
                          ></div>
                        )}

                        {/* Table Data */}
                        <td>{index + 1}</td>
                        <td>{organisationName}</td>
                        <td>{opportunityName}</td>
                        <td style={{ width: "180px" }}>{`Applied On ${new Date(
                          createdAt
                        ).toLocaleDateString()}`}</td>
                        <td
                          style={{
                            textAlign: "center",
                            background:
                              status === "Shortlisted"
                                ? "#ebfbee"
                                : status === "Uncategorized"
                                ? "#f4eded"
                                : "#ffe5e5",
                            color:
                              status === "Shortlisted"
                                ? "#6cc985"
                                : status === "Uncategorized"
                                ? "#FF0000"
                                : "#FF0000",
                            width: "210px",
                            zIndex: 1,
                          }}
                        >
                          {status}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </table>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 20%)",
            }}
          >
            {showButton && (
              <button
                onClick={handleViewTable}
                style={{
                  borderRadius: 10,
                  background: "#138382",
                  padding: "6px 16px",
                  border: 0,
                  color: "white",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                View Analysis
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceSection;
