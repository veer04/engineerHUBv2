import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import "./FormInput.css";

export default function FormInputDropdown({
  options,
  value,
  onChange,
  label,
  required,
  constraint,
  placeholder,
  setValue,
  helperText,
  className,
  disabled,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    setValue(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="option"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
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
      <div ref={divEl} className="custom-dropdown-container">
        {value?.label ? (
          <div
            className={`custom-input custom-dropdown ${
              helperText ? "custom-input-error" : ""
            } ${!!disabled ? "disabled" : ""}`}
            onClick={() => {
              if (!disabled) handleClick();
            }}
          >
            {value?.label}
            <GoChevronDown className="text-lg" />
          </div>
        ) : (
          <div
            className={`custom-input custom-dropdown custom-dropdown-placeholder ${
              helperText ? "custom-input-error" : ""
            } ${!!disabled ? "disabled" : ""}`}
            onClick={() => {
              if (!disabled) handleClick();
            }}
          >
            {placeholder}
            <GoChevronDown className="text-lg" />
          </div>
        )}
        {isOpen && <div className="options">{renderedOptions}</div>}
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
