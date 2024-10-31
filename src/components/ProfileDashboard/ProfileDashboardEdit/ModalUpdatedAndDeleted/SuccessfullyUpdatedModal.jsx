import React from "react";
import { IoMdClose } from "react-icons/io";
import "./successfullyupdatedmodal.css";
import { IoMdCheckmark } from "react-icons/io";

const SuccessfullyUpdatedModal = ({ isOpenSuccess, onClose }) => {
  if (!isOpenSuccess) return null;
  return (
    <>
      <div className="success-modal-overlay">
        <div className="success-modal">
          <div className="modal-header"></div>

          <div className="modal-content">
            <div className="main-success-div">
              <div
                style={{
                  background: "#bce1f5",
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <IoMdCheckmark size={22} color="#2CC546" />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: "24px",
                    marginBottom: 0,
                  }}
                >
                  Successfully Updated
                </h3>

                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "#002B36",
                  }}
                >
                  The details has been updated.
                </h4>
              </div>
            </div>

            <div className="btn-div-ok">
              <button className="ok-btn-style" onClick={onClose}>
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessfullyUpdatedModal;
