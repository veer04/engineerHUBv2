import React from "react";

const DateBoxes = ({ day, date, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px 0px 12px 0px",
        borderRadius: "10px",
        border: "1px solid #EBEBEB",
        backgroundColor: isSelected ? "#138382" : "#faffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100px",
        height: "70px",
        boxShadow: " rgba(0, 0, 0, 0.08) 0px 2px 4px",
        transition: "background-color 0.3s ease, color 0.3s ease",

        cursor: "pointer",
      }}
    >
      <h2
        style={{
          marginTop: "10px",
          color: isSelected ? "white" : "black",
          fontSize: "12px",
          fontFamily: "Inter",
          fontWeight: "500",
          lineHeight: "19px",
          wordWrap: "break-word",
          cursor: "pointer",
        }}
      >
        {day}
      </h2>

      <h3
        style={{
          marginTop: "-5px",
          color: isSelected ? "white" : "black",
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "600",
          lineHeight: "27px",
          wordWrap: "break-word",
          cursor: "pointer",
        }}
      >
        {date}
      </h3>
    </div>
  );
};

export default DateBoxes;
