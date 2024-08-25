import "./TimeBox.css";

const TimeBox = ({ time, isSelected, onClick, isDisabled }) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      style={{
        backgroundColor: !isDisabled
          ? isSelected
            ? "#138382"
            : "#faffff"
          : "##f1f3f5",
        color: !isDisabled ? (isSelected ? "#ffffff" : "#002B36") : "white",
      }}
      className="referral-time-box"
    >
      <h2
        style={{
          color: !isDisabled
            ? isSelected
              ? "white"
              : "#002B36"
            : "light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3))",
          fontSize: "14px",
          fontFamily: "Inter",
          fontWeight: "500",
          lineHeight: "19px",
          wordWrap: "break-word",
          marginTop: "10px",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
      >
        {time}
      </h2>
    </button>
  );
};

export default TimeBox;
