import "./FormInput.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function FormInputToggle({
  label,
  value,
  setValue,
  checkedLabel,
  uncheckedLabel,
  required,
  helperText,
  className,
  disabled,
  ...rest
}) {
  const handleChange = (event) => {
    setValue(event.target.checked);
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      checked={value}
      onChange={handleChange}
      {...props}
    />
  ))(({ theme }) => ({
    width: 46.25,
    height: 24,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(20px)",
        color: "#002B36",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#8a9d8e" : "#8a9d8e",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#fff",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        cursor: "not-allowed",
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 20,
      height: 20,
    },
    "& .MuiSwitch-track": {
      borderRadius: 24 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <div
      {...rest}
      className={`custom-form-input ${!!className ? className : ""}`}
    >
      <div className="custom-toggle-container">
        <div
          className={`custom-input custom-toggle ${
            helperText ? "custom-input-error" : ""
          } ${!!disabled ? "disabled" : ""}`}
        >
          <div className="toggle-label">
            {label}{" "}
            {label && required && (
              <span disabled={disabled} className="required-mark">
                *
              </span>
            )}
          </div>
          <FormGroup>
            <FormControlLabel
              control={<IOSSwitch />}
              label={`${
                value
                  ? checkedLabel
                    ? checkedLabel
                    : ""
                  : uncheckedLabel
                  ? uncheckedLabel
                  : ""
              }`}
              disabled={disabled}
            />
          </FormGroup>
        </div>
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
