import React from "react";
import "./activitycardssaif.css";
import ActivityCardSmallBox from "./activitycardSmallBox";

const ActivityCardsSaif = () => {
  const smallBoxesArray = Array.from({ length: 31 }, (_, index) => index + 1);

  const colorObject = [
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D353",
    "#39D353",
    "#39D3531A",
    "#39D3531A",
    "#39D35380",
    "#39D35380",
    "#39D35380",
    "#39D3531A",
    "#39D3531A",
    "#39D353",
    "#39D353",
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D3531A",
    "#39D353",
    "#39D353",
    "#39D3531A",
    "#39D353",
    "#39D3531A",
    "#39D3531A",
  ];

  return (
    <div className="main-activity-saif-section">
      <h3
        style={{
          textAlign: "center",
          fontSize: 12,
          fontWeight: 400,
          lineHeight: "16px",
          color: "#002B36",
        }}
      >
        Month, YYYY
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
          alignItems: "center",
          alignSelf: "center",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        {smallBoxesArray.map((box, index) => (
          <ActivityCardSmallBox
            key={box}
            color={colorObject[index % colorObject.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityCardsSaif;
