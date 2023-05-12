import React from "react";
import "./CampusEventTab.css";

export default function CampusEventTab({ color, title }) {
  return (
    <div style={{ backgroundColor: color }} className="campus-events-tab">
      <span>{title}</span>
    </div>
  );
}
