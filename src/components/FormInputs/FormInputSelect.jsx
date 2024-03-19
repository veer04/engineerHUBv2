import React from "react";
import "./FormInput.css";

export default function FormInputSelect({
  id,
  name,
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
      <div id={id} className="form-input-container">
        <label htmlFor={name} className="form-input-label">
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
