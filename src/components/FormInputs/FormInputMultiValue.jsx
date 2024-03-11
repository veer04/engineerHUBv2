import React, { useEffect, useRef, useState } from "react";
import "./FormInput.css";
import { RxCross1, RxCross2 } from "react-icons/rx";

export default function FormInputMultiValue({
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
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const multiValueHandler = (event) => {
      if (!divEl?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", multiValueHandler, true);

    return () => {
      document.removeEventListener("click", multiValueHandler);
    };
  }, []);

  useEffect(() => {
    if (input.length) {
      const filtered = options.filter((option) => {
        return option.toLowerCase().includes(input.toLowerCase());
      });
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [input, options]);

  const handleOption = (option) => {
    setValue((prev) => {
      if (prev.includes(option)) {
        return prev.filter((v) => v !== option);
      } else {
        return [...prev, option];
      }
    });
    setInput("");
  };

  const renderedOptions = filteredOptions.map((option) => {
    return (
      <div
        className={`option ${value.includes(option) ? "selected" : ""}`}
        onClick={() => handleOption(option)}
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
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (input.length) {
                handleOption(input);
              }
            }
            if (e.key === "Escape") {
              e.preventDefault();
              setIsOpen(false);
            }
            if (e.key === "Tab") {
              if (filteredOptions.length) {
                if (input === filteredOptions[0]) {
                  return;
                }
                e.preventDefault();
                setInput(filteredOptions[0]);
              }
            }
          }}
        />
        {isOpen && !!filteredOptions.length && (
          <div className="options">{renderedOptions}</div>
        )}
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
      <div className="multi-value">
        {value.map((val, index) => (
          <div key={index} className="multi-value-item">
            <span
              className="cancel-btn"
              onClick={() => {
                setValue(value.filter((v) => v !== val));
              }}
            >
              <RxCross1 />
            </span>
            {val}
          </div>
        ))}
      </div>
    </div>
  );
}
