import React from "react";
import "./newprofileconnectcard.css";
import {
  ArrowSvgCompright,
  Card1ImageSvgProfileSidebar,
} from "../../SvgsIconsComps/SvgsComps";
import { useNavigate } from "react-router-dom";

const NewProfileConnectCard = ({ image, bgColor, title, btnName, btnLink }) => {
  const navigate = useNavigate();

  const handleSendToThatPage = () => {
    window.open(btnLink, "_blank");
  };
  return (
    <div
      data-bs-dismiss="offcanvas"
      aria-label="Close"
      className="main-connect-card-div"
      style={{ background: bgColor }}
    >
      <div className="main-connect-sub-div">
        <div className="left-div-card">
          <h4 className="connect-h4">{title}</h4>

          <div className="connect-button-div">
            <button onClick={() => handleSendToThatPage()}>
              {btnName}
              <ArrowSvgCompright />
            </button>
          </div>
        </div>

        <div className="right-div-card">{image}</div>
      </div>
    </div>
  );
};

export default NewProfileConnectCard;
