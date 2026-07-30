import React, { useState } from "react";
import "./addaboutedit.css";
import AddEducationModal from "../AddEducationModal/AddEducationModal";

const AddAboutEdit = ({ profileData, setProfileData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const openModal = (education) => {
    setSelectedEducation({
      ...education,
      collegeName: education.collegeId?.collegeName || "",
    });
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEducation(null);
  };

  return (
    <>
      <AddEducationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={selectedEducation}
        setProfileData={setProfileData}
      />
      <div className="add-about-main-div" id="add-education">
        <div className="add-headline-sub-div">
          <div className="add-headlline-sub-left">
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                lineHeight: "24px",
                marginBottom: 0,
                color: "#002B36",
              }}
            >
              Add Education
            </h3>

            {!profileData ||
              (profileData.educationDetails &&
                profileData.educationDetails.length === 0 && (
                  <h4
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      lineHeight: "20px",
                      marginBottom: 0,
                      color: "#547178",
                    }}
                  >
                    Add Education
                  </h4>
                ))}
          </div>

          <div className="add-headline-sub-right">
            <h3
              onClick={openModal}
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                marginBottom: 0,
                color: "#138382",
                cursor: "pointer",
              }}
            >
              Add
            </h3>
          </div>
        </div>

        <div className="education-display-div">
          {profileData &&
            profileData?.educationDetails?.map((education, index) => (
              <>
                <div className="education-display-sub-div">
                  <>
                    <div
                      className="education-display-left-div"
                      key={education._id || index}
                    >
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          lineHeight: "20px",
                          color: "#002B36",
                          marginBottom: 0,
                        }}
                      >
                        {education?.collegeId?.collegeName}
                      </h3>

                      <h3
                        style={{
                          fontSize: 14,
                          fontWeight: 400,
                          lineHeight: "24px",
                          color: "#002B36",
                          marginBottom: 0,
                        }}
                      >
                        {education?.degree}
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
                            color: "#547178",
                            marginBottom: 0,
                          }}
                        >
                          {new Date(education.startYear).getFullYear()} -{" "}
                          {new Date(education.endYear).getFullYear()}
                        </h4>
                        <div
                          style={{
                            width: "1.4px",
                            height: "16px",
                            background: "#547178",
                          }}
                        ></div>
                        <h4
                          style={{
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: "20px",
                            color: "#547178",
                            marginBottom: 0,
                          }}
                        >
                          CGPA : {education.marks}
                        </h4>
                      </div>
                    </div>
                  </>
                  <div className="education-display-right-div">
                    <div
                      onClick={() => openModal(education)}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M11.4106 4.48679L12.4619 3.43547C13.0425 2.85484 13.9839 2.85484 14.5645 3.43547C15.1451 4.0161 15.1451 4.95748 14.5645 5.53811L13.5132 6.58943M11.4106 4.48679L5.23517 10.6622C4.4512 11.4462 4.05919 11.8381 3.79228 12.3158C3.52535 12.7935 3.2568 13.9214 3 15C4.07857 14.7432 5.20649 14.4746 5.68417 14.2077C6.16184 13.9408 6.55383 13.5488 7.33781 12.7648L13.5132 6.58943M11.4106 4.48679L13.5132 6.58943"
                          stroke="#547178"
                          stroke-width="1.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.25 15H12.75"
                          stroke="#547178"
                          stroke-width="1.2"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {index !== profileData.educationDetails.length - 1 && (
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
        </div>
      </div>
    </>
  );
};

export default AddAboutEdit;
