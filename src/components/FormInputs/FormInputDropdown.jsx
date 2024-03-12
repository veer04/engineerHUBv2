import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import "./FormInput.css";

export default function FormInputDropdown({
  id,
  name,
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
  caption,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef(null);

  useEffect(() => {
    const dropdownHandler = (event) => {
      if (!divEl?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", dropdownHandler, true);

    return () => {
      document.removeEventListener("click", dropdownHandler);
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
        className={`option ${value?.value === option.value ? "selected" : ""}`}
        onClick={() => {
          if (!option.disabled) handleOptionClick(option);
        }}
        key={option.value}
        disabled={option.disabled}
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
        <label htmlFor={name} className="form-input-label">
          {label}{" "}
          {label && required && <span className="required-mark">*</span>}
        </label>
        {constraint && <span className="constraint">({constraint})</span>}
      </div>
      {caption && <p className="caption">{caption}</p>}
      <div className="custom-dropdown-container">
        {value?.label ? (
          <div
            id={id}
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
        {isOpen && (
          <div ref={divEl} className="options">
            {renderedOptions}
          </div>
        )}
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
