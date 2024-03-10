import React, { useEffect, useRef, useState } from "react";
import "./FormInput.css";

export default function FormInputAutocomplete({
  label,
  required,
  constraint,
  placeholder,
  value,
  setValue,
  options,
  helperText,
  className,
  disabled,
  caption,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const handler = (event) => {
      if (!divEl?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    if (value) {
      const filtered = options.filter((option) => {
        return option.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [value, options]);

  const handleOptionClick = (option) => {
    console.log(option);
    setValue(option);
    setIsOpen(false);
  };

  const renderedOptions = filteredOptions.map((option) => {
    return (
      <div
        className="option"
        onClick={() => handleOptionClick(option)}
        key={option}
      >
        {option}
      </div>
    );
  });

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
      <div ref={divEl} className="custom-dropdown-container">
        <input
          type="text"
          name={label}
          id={label}
          required={required}
          disabled={disabled}
          className={`custom-input ${helperText ? "custom-input-error" : ""} ${
            !!disabled ? "disabled" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsOpen(true);
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              setIsOpen(false);
            }
            if (e.key === "Tab") {
              if (filteredOptions.length) {
                if (value === filteredOptions[0]) {
                  return;
                }
                e.preventDefault();
                setValue(filteredOptions[0]);
              }
            }
          }}
        />
        {isOpen && !!filteredOptions.length && (
          <div className="options">{renderedOptions}</div>
        )}
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
