import React from "react";
import "./Session.css";
import g from "../../../../public/g.png";

const SessionBox = ({ className, name, profile, content }) => {
  return (
    <div className={`session-cont ${className}`}>
      <h2 style={{ fontSize: "13px", color: "black" }}>{content}</h2>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{ borderRadius: "50%" }}
          src={`https://ui-avatars.com/api/?background=0A5C36&color=fff&name=${encodeURIComponent(
            name
          )}`}
          alt=""
          width={30}
          height={30}
        />
        <div style={{ marginLeft: "5px" }}>
          <h2
            style={{
              fontSize: "12.43px",
              lineHeight: "21px",
              marginTop: "4px",
              fontWeight: "600",
            }}
          >
            {name}
          </h2>
          <h2
            style={{
              fontSize: "12.43px",
              marginTop: "-8px",
              fontWeight: "400",
            }}
          >
            {profile}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SessionBox;
