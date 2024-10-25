import React from "react";
import "./personalinformationmodal.css";
import FormInput from "../../../FormInputs/FormInput";

const PersonalInformationModal = () => {
  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="personalInformationModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            {/* <h4
              className="modal-title heading-sm"
              id="personalInformationModal"
            >
              Personal Information
            </h4> */}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-main-cont">
            <div>
              <h3 style={{ fontSize: 24, lineHeight: "28px", fontWeight: 600 }}>
                Personal Information
              </h3>
              <h4
                style={{
                  fontSize: 16,
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#547178",
                }}
              >
                Add a summary of your resume to introduce yourself to recruiters
              </h4>
            </div>

            <div className="form-div-modal">
              <div className="modal-div-innner">
                <FormInput
                  label={"Name"}
                  id={"name"}
                  required
                  placeholder={"Enter Your Name"}
                  className="mb-4 "
                />

                <FormInput
                  label={"Name"}
                  id={"name"}
                  required
                  placeholder={"Enter Your Name"}
                  className="mb-4 "
                />
              </div>

              <div className="modal-div-innner">
                <FormInput
                  label={"Name"}
                  id={"name"}
                  required
                  placeholder={"Enter Your Name"}
                />

                <FormInput
                  label={"Name"}
                  id={"name"}
                  required
                  placeholder={"Enter Your Name"}
                  className=""
                />
              </div>
            </div>

            <div className="modal-button-div">
              <button className="cancel-modal-btn">Cancel</button>
              <button className="save-modal-btn">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationModal;
