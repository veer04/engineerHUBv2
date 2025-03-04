import React from "react";
import "./belowhostcomponent.css";
import { ResumeWritingIcon } from "../../SvgsIconsComps/SvgsComps";
import { useNavigate } from "react-router-dom";

const BelowHostComponent = ({
  icon,
  btnText,
  btnLink,
  tagBgColor,
  tagText,
  borderColor,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(btnLink);
  };
  return (
    <div className="below-host-main-div">
      <div className="below-host-left-main-div">
        <button
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          className="item"
          onClick={() => handleClick()}
        >
          <div className="icon">{icon}</div>
          <div className="label">{btnText}</div>
        </button>
      </div>

      <div className="below-host-right-main-div">
        <button
          style={{ background: tagBgColor, border: `1px solid ${borderColor}` }}
        >
          {tagText}
        </button>
      </div>
    </div>
  );
};

export default BelowHostComponent;
