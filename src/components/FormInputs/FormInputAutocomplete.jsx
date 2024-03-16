import { useEffect, useRef, useState } from "react";
import "./FormInput.css";

export default function FormInputAutocomplete({
  id,
  name,
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
  const divEl = useRef(null);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const AutocompleteHandler = (event) => {
      if (!divEl?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", AutocompleteHandler, true);

    return () => {
      document.removeEventListener("click", AutocompleteHandler);
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
    setIsOpen(false);
    setValue(option);
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
        <label htmlFor={name} className="form-input-label">
          {label}{" "}
          {label && required && <span className="required-mark">*</span>}
        </label>
        {constraint && <span className="constraint">({constraint})</span>}
      </div>
      {caption && <p className="caption">{caption}</p>}
      <div className="custom-dropdown-container">
        <input
          type="text"
          name={name}
          id={id}
          required={required}
          disabled={disabled}
          className={`custom-input custom-text ${helperText ? "custom-input-error" : ""} ${
            !!disabled ? "disabled" : ""
          }`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setIsOpen(true);
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
          <div ref={divEl} className="options">
            {renderedOptions}
          </div>
        )}
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
