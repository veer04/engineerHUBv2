import React from "react";
import "./ButtonRounded.css";

export default function ButtonRounded({ children, className, onClick }) {
  return (
    <button onClick={onClick} className={`rounded-button ${className}`}>
      {children}
    </button>
  );
}
