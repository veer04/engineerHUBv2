import React from "react";
import "./FormInput.css";

export default function FormInput({
  label,
  required,
  constraint,
  placeholder,
  value,
  setValue,
  helperText,
  className,
}) {
  return (
    <div className={`custom-form-input ${!!className ? className : ""}`}>
      <div className="form-input-container">
        <label htmlFor="" className="form-input-label">
          {label}{" "}
          {label && required && <span className="required-mark">*</span>}
        </label>
        {constraint && <span className="constraint">({constraint})</span>}
      </div>
      <input
        type="text"
        name=""
        id=""
        required={required}
        className={`custom-input ${helperText ? "custom-input-error" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
