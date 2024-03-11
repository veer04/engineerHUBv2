import React from "react";
import "./FormInput.css";

export default function FormButton({ className, children, ...rest }) {
  return (
    <button className={`form-button ${className}`} {...rest}>
      {children}
    </button>
  );
}
