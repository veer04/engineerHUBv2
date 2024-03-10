import React from "react";
import "./FormInput.css";

export default function FormInputSelect({
  label,
  required,
  constraint,
  helperText,
  className,
  children,
  caption,
  ...rest
}) {
  return (
    <div
      {...rest}
      className={`custom-form-input ${!!className ? className : ""}`}
    >
      <div className="form-input-container">
        <label htmlFor={label} className="form-input-label">
          {label}{" "}
          {label && required && <span className="required-mark">*</span>}
        </label>
        {constraint && <span className="constraint">({constraint})</span>}
      </div>
      {caption && <p className="caption">{caption}</p>}
      {children}
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
