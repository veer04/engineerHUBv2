import React from "react";
import { IoMdClose } from "react-icons/io";
import "./deletemodalok.css";
import { FaRegTrashCan } from "react-icons/fa6";

const DeleteModalOK = ({ isOpenDeleted, onClose }) => {
  if (!isOpenDeleted) return null;
  return (
    <>
      <div className="delete-modal-ok-overlay">
        <div className="delete-modal">
          <div className="modal-header"></div>

          <div className="modal-content">
            <div className="main-success-div">
              <div
                style={{
                  background: "#ffeeee",
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <FaRegTrashCan size={22} color="red" />
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
                  Item Deleted
                </h3>

                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: "20px",
                    color: "#002B36",
                  }}
                >
                  The details has been deleted.
                </h4>
              </div>
            </div>

            <div className="btn-div-ok">
              {/* <button className="yes-btn-style" onClick={onClose}>
                Yes
              </button> */}
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

export default DeleteModalOK;
