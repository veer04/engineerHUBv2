import React from "react";
import "./ButtonRounded.css";

export default function ButtonRounded({ children, className }) {
  return <button className={`rounded-button ${className}`}>{children}</button>;
}
