import React from "react";
import "./FormInput.css";

export default function FormInput({
  id,
  name,
  label,
  required,
  constraint,
  placeholder,
  value,
  setValue,
  helperText,
  className,
  disabled,
  caption,
  ...rest
}) {
  return (
    <div
      {...rest}
      className={`custom-form-input ${!!className ? className : ""}`}
    >
      <div className="form-input-container">
        <label htmlFor={name} className="form-input-label">
          {label}{" "}
          {label && required && <span className="required-mark">*</span>}
        </label>
        {constraint && <span className="constraint">({constraint})</span>}
      </div>
      {caption && <p className="caption">{caption}</p>}
      <input
        type="text"
        name={name}
        id={id}
        required={required}
        disabled={disabled}
        className={`custom-input ${helperText ? "custom-input-error" : ""} ${
          !!disabled ? "disabled" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
