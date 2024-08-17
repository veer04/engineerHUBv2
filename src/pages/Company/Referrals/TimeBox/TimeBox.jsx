import React from "react";

const TimeBox = ({ time, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px",
        border: "1px solid #EBEBEB",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100px",
        height: "51px",
        borderRadius: "10px",
        backgroundColor: isSelected ? "#138382" : "#faffff",
        color: isSelected ? "#ffffff" : "#002B36",
        cursor: "pointer",
        transition: "background-color 0.3s ease, color 0.3s ease",
        boxShadow: " rgba(0, 0, 0, 0.08) 0px 2px 4px",
      }}
    >
      <h2
        style={{
          color: isSelected ? "white" : "#002B36",
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "500",
          lineHeight: "19px",
          wordWrap: "break-word",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        {time}
      </h2>
    </div>
  );
};

export default TimeBox;
