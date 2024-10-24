import React from "react";
import "./addaboutedit.css";

const AddAboutEdit = () => {
  return (
    <>
      <div className="add-about-main-div">
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
              Add About
            </h3>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "20px",
                marginBottom: 0,
                color: "#547178",
              }}
            >
              Add About
            </h4>
          </div>

          <div className="add-headline-sub-right">
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "24px",
                marginBottom: 0,
                color: "#138382",
              }}
            >
              Add
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAboutEdit;
