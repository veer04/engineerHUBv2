import React from "react";
import "./FormInput.css";

export default function FormIndicator({
  className,
  currentPage,
  totalPages,
  ...rest
}) {
  return (
    <div className={`form-indicator ${className ? className : ""}`} {...rest}>
      {[...Array(totalPages)].map((_, index) => (
        <div
          key={index}
          className={`indicator ${index < currentPage ? "--is-active" : ""}`}
        />
      ))}
    </div>
  );
}
