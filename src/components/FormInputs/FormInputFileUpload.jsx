import { useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import "./FormInput.css";

export default function FormInputFileUpload({
  label,
  required,
  constraint,
  placeholder,
  fileType,
  value,
  setValue,
  helperText,
  className,
  disabled,
  ...rest
}) {
  console.log(value);
  const ref = useRef(null);
  const formattedSize = (size) => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    while (size > 1024) {
      size = size / 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  function handleChange(e) {
    if (e.target.files[0]) {
      setValue(e.target.files[0]);
    }
  }

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
      <input
        ref={ref}
        type="file"
        name={label}
        id={label}
        required={required}
        accept={fileType}
        disabled={disabled}
        className="custom-input-file-input"
        placeholder={placeholder}
        onChange={(e) => {
          handleChange(e);
          e.target.value = null;
        }}
      />
      <div
        onClick={() => {
          if (!disabled && !value) ref.current.click();
        }}
      >
        {value?.name ? (
          <div
            className={`custom-input custom-upload ${
              helperText ? "custom-input-error" : ""
            } ${!!disabled ? "disabled" : ""}
            ${value?.name ? "custom-upload-active" : ""}
            `}
          >
            <span
              style={{ width: "calc(100% - 120px - 1rem)" }}
              className="text-crop-1 overflow-hidden"
            >
              {value?.name}
            </span>
            <div className="d-flex align-items-center gap-2">
              <span style={{ color: "gray" }}>
                {formattedSize(value?.size)}
              </span>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setValue(null);
                }}
                className="p-1 file-cancel"
              >
                <RxCross1 />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`custom-input custom-upload custom-upload-placeholder ${
              helperText ? "custom-input-error" : ""
            } ${!!disabled ? "disabled" : ""}`}
          >
            {placeholder}
            <button disabled={disabled} className="browse-btn">
              Browse
            </button>
          </div>
        )}
      </div>
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
