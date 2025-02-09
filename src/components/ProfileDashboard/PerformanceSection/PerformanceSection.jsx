import React, { useEffect, useState } from "react";
import "./performancesection.css";
import { VscGraph } from "react-icons/vsc";
import { API_URL } from "../../../services/APIUtils";
import { getAccessToken } from "../../../features/getCookieValues";
import PaginationCompNewSaif from "../PaginationNewCompSaif/PaginationCompNewSaif";

const PerformanceSection = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [blurEnabled, setBlurEnabled] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(6);
  const [loading, setLoading] = useState(false);

  const [performaceData, setPerformanceData] = useState([]);

  console.log(totalPages, "totalpages");
  console.log(currentPage, "currentPage");

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
      setTotalPages(data.data.totalPage);
      setCurrentPage(data.data.currentPage);
      setLoading(false);
      console.log(data.data, "performaceData");
    } catch (error) {
      console.error("Error getting the data");
    }
  };

  useEffect(() => {
    fetchRecommendationData();
  }, [currentPage]);

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

        {performaceData?.counts?.length > 0 && (
          <div>
            {showHeader && (
              <button
                onClick={() => {
                  setShowHeader(false);
                  setBlurEnabled(true);
                  setShowButton(true);
                }}
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
                {showHeader && "Close Analytics"}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="analytics-boxes-div">
        <div
          className="analytics-box-1"
          style={{
            backgroundColor:
              performaceData?.performance === "Poor" ? "#ffe5e5" : "#f3f9f9",
          }}
        >
          <h3
            style={{
              fontSize: 20,
              fontWeight: 700,
              lineHeight: "24px",
              color:
                performaceData?.performance === "Poor" ? "#FF0000" : "#2CC546",

              marginBottom: 0,
            }}
          >
            {performaceData?.performance || "Poor"}
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

        <div className="analytics-box-2">
          {performaceData &&
          performaceData.counts &&
          performaceData.counts.length > 0 ? (
            <div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: "24px",
                  color: "#002B36",
                  marginBottom: 0,
                }}
              >
                {performaceData.counts.reduce(
                  (acc, count) => acc + (count.total || 0),
                  0
                )}
              </h3>
            </div>
          ) : (
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                lineHeight: "24px",
                color: "#002B36",
                marginBottom: 0,
              }}
            >
              0
            </h3>
          )}

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
              {performaceData?.counts?.find(
                (item) => item._id === "Shortlisted"
              )?.total || 0}
            </h3>
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
              {performaceData?.counts?.find((item) => item._id === "Rejected")
                ?.total || 0}
            </h3>
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
          {performaceData?.counts?.length > 0 && !loading && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, 10%)",
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
          )}
        </div>
      )}
      <div>
        <PaginationCompNewSaif
          pages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PerformanceSection;
