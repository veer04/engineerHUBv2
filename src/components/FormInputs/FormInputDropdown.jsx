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

  useEffect(() => {
    if (isOpen) {
      const selectedOption = document.querySelector(".option.selected");
      selectedOption?.scrollIntoView({ behavior: "instant", block: "nearest" });
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
              options[i].scrollIntoView({
                behavior: "instant",
                block: "nearest",
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
      <div id={id} className="custom-dropdown-container">
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
