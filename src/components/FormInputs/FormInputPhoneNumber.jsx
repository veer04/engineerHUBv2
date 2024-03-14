import React, { useEffect, useRef, useState } from "react";
import "./FormInput.css";
import { GoChevronDown } from "react-icons/go";
import countryCodes from "../../assets/countryCodes";

export default function FormInputPhoneNumber({
  id,
  name,
  label,
  required,
  constraint,
  placeholder,
  value,
  setValue,
  countryCodeValue,
  setCountryCodeValue,
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

  useEffect(() => {
    if (isOpen) {
      const selectedOption = document.querySelector(".option.selected");
      selectedOption?.scrollIntoView({ behavior: "instant", block: "center" });
    }

    // if the dropdown is open, and if the user types a letter or a number, then that key down event will be detected by a event listener which will run a function that will focus and scroll to a option that starts with the letter or number that the user typed
    const keydownHandler = (event) => {
      if (isOpen) {
        const options = document.querySelectorAll(".option");
        const selectedOption = document.querySelector(".option.selected");
        const selectedOptionIndex = Array.from(options).indexOf(selectedOption);

        if (event.key.match(/^[a-zA-Z0-9]$/)) {
          for (let i = selectedOptionIndex + 1; i < options.length; i++) {
            if (options[i].textContent[0].toLowerCase() === event.key) {
              options[i].focus();
              // make the option scroll to the center of the dropdown
              options[i].scrollIntoView({
                behavior: "instant",
                block: "center",
              });
              break;
            }
          }
        }
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    setCountryCodeValue(option);
  };

  const renderedOptions = countryCodes.map((option) => {
    return (
      <div
        className={`option ${countryCodeValue === option ? "selected" : ""}`}
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
        <label htmlFor={name} className="form-input-label">
          {label}{" "}
          {label && required && <span className="required-mark">*</span>}
        </label>
        {constraint && <span className="constraint">({constraint})</span>}
      </div>
      {caption && <p className="caption">{caption}</p>}

      <div className="custom-phone-number-container">
        <div id={id} className="custom-dropdown-container custom-phone-number">
          {countryCodeValue ? (
            <div
              className={`custom-input custom-dropdown ${
                helperText ? "custom-input-error" : ""
              } ${!!disabled ? "disabled" : ""}`}
              onClick={() => {
                if (!disabled) handleClick();
              }}
            >
              +{countryCodeValue}
              <GoChevronDown className="text-lg ms-1" />
            </div>
          ) : (
            <div
              className={`custom-input text-crop-1 custom-dropdown custom-dropdown-placeholder ${
                helperText ? "custom-input-error" : ""
              } ${!!disabled ? "disabled" : ""}`}
              onClick={() => {
                if (!disabled) handleClick();
              }}
            >
              <span
                className="text-crop-1"
                style={{
                  width: "3.5rem",
                  overflow: "hidden",
                  wordBreak: "break-all",
                }}
                title="Select country code"
              >
                Select country code
              </span>
              <GoChevronDown className="text-lg" />
            </div>
          )}
          {isOpen && (
            <div ref={divEl} className="options">
              {renderedOptions}
            </div>
          )}
        </div>
        <input
          type="tel"
          name={name}
          required={required}
          disabled={disabled}
          className={`custom-input ${helperText ? "custom-input-error" : ""} ${
            !!disabled ? "disabled" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
