import React, { useEffect, useState } from "react";

const ActivityCardSmallBox = ({ color }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: isMobile ? "11px" : "12.79px",
        height: isMobile ? "11px" : "12.79px",
        background: color,
        borderRadius: "3.2px",
        flexShrink: 0,
      }}
    ></div>
  );
};

export default ActivityCardSmallBox;
