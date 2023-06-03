import React from "react";
import "./SimpleInputField.css";

export default function SimpleInputField({
  type = "text",
  placeholder = "",
  value,
  setValue,
  name,
  disabled = false,
  onClick,
  className,
}) {
  return (
    <input
      onClick={onClick}
      className={`simple-input-field ${className}`}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
    />
  );
}
