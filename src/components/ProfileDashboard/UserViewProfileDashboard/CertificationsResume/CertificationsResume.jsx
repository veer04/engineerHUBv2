import React from "react";
import "./certificationsresume.css";
import { Link } from "react-router-dom";

const CertificationsResume = ({ DashboardAdminData }) => {
  const hasCertificates =
    DashboardAdminData &&
    DashboardAdminData.licenceDetails &&
    DashboardAdminData.licenceDetails.length > 0;
  return (
    <div className="certifications-resume-main-div">
      <h3
        style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "24px",
          color: "#002B36",
          marginBottom: 0,
        }}
      >
        Certifications
      </h3>

      {!hasCertificates ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            margin: 0,
          }}
        >
          <p style={{ margin: 0 }}>No Certifications Added.</p>
        </div>
      ) : (
        <>
          {DashboardAdminData &&
            DashboardAdminData.licenceDetails.map((certi, index) => (
              <>
                <div style={{ marginTop: 10 }} key={certi._id || index}>
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      lineHeight: "24px",
                      color: "#002B36",
                      marginBottom: 0,
                    }}
                  >
                    {certi.certificationName}
                  </h4>

                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "20px",
                      color: "#547178",
                      marginBottom: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {certi.certificationName || "IxDF"}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      marginTop: 3,
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#002B36",
                        marginBottom: 0,
                      }}
                    >
                      {new Date(certi.issuedDate).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h4>
                    <div
                      style={{
                        width: "1.4px",
                        height: "16px",
                        background: "#547178",
                      }}
                    ></div>
                    <Link
                      to={certi.certificateUrl || ""}
                      target="_blank"
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#2100EC",
                        marginBottom: 0,
                      }}
                    >
                      Link to certificate
                    </Link>
                  </div>
                </div>

                {index !== DashboardAdminData.licenceDetails.length - 1 && (
                  <div
                    style={{
                      height: "2px",
                      background: "#D1D1D1",
                      borderRadius: "26px",
                      margin: "12px 0px",
                      alignSelf: "stretch",
                    }}
                  ></div>
                )}
              </>
            ))}
        </>
      )}
    </div>
  );
};

export default CertificationsResume;
