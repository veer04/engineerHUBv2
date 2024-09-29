import React, { useState } from "react";
import "./youractivitysection.css";
import { GoStopwatch } from "react-icons/go";
import ActivityCardsSaif from "./ActivityCardsSaif";

const YourActivitySection = () => {
  const [actionButton, setActionButton] = useState("Streak");

  const handleButtonClick = (buttonName) => {
    setActionButton(actionButton === buttonName ? null : buttonName);
  };

  return (
    <div className="your-activity-section-main">
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <GoStopwatch size={18} />
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "24px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Your Activity
        </h3>
      </div>

      <div style={{ marginTop: 10 }}>
        {["Streak", "Posts", "Jobs", "Events"].map((buttonName, index) => (
          <button
            key={buttonName}
            onClick={() => handleButtonClick(buttonName)}
            style={{
              padding: "4px 16px",
              borderRadius: "10px",
              background: actionButton === buttonName ? "#138382" : "#f2f4f5",
              fontSize: 14,
              fontWeight: 400,
              lineHeight: "20px",
              color: actionButton === buttonName ? "white" : "black",
              border: "none",
              marginLeft: index === 0 ? 0 : 10,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            {buttonName}
          </button>
        ))}
      </div>

      <div className="grid-activity-section">
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
        <ActivityCardsSaif />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: "#002B36",
            marginBottom: 0,
          }}
        >
          Latest Streak : 5 days
        </h3>

        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "16px",
              color: "#002B36",
            }}
          >
            Less
          </span>
          <div
            style={{
              width: "12.79px",
              height: "12.79px",
              background: "#39D3531A",
              borderRadius: "3.2px",
              flexShrink: 0,
            }}
          ></div>
          <div
            style={{
              width: "12.79px",
              height: "12.79px",
              background: "#39D35380",
              borderRadius: "3.2px",
              flexShrink: 0,
            }}
          ></div>
          <div
            style={{
              width: "12.79px",
              height: "12.79px",
              background: "#39D353",
              borderRadius: "3.2px",
              flexShrink: 0,
            }}
          ></div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "16px",
              color: "#002B36",
            }}
          >
            More
          </span>
        </div>
      </div>
    </div>
  );
};

export default YourActivitySection;
