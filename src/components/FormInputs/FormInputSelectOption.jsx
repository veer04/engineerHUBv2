import React from "react";
import "./FormInput.css";

export default function FormInputSelectOption({
  id,
  name,
  icon,
  label,
  multiple,
  value,
  setValue,
  result,
  helperText,
  className,
  disabled,
  ...rest
}) {
  function handleClick() {
    if (!multiple) {
      if (value === result) {
        setValue("");
      } else {
        setValue(result);
      }
    } else {
      if (value.includes(result)) {
        setValue(value.filter((val) => val !== result));
      } else {
        setValue([...value, result]);
      }
    }
  }
  return (
    <button
      id={id}
      disabled={disabled}
      onClick={handleClick}
      className={`custom-input custom-select-option ${
        helperText ? "custom-input-error" : ""
      } ${!!className ? className : ""} ${
        !multiple
          ? value === result
            ? "selected"
            : ""
          : value.includes(result)
          ? "selected"
          : ""
      } `}
      {...rest}
    >
      {icon}
      {label}
    </button>
  );
}
