import { useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import "./FormInput.css";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormInputFileUpload({
  id,
  name,
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
  caption,
  ...rest
}) {
  const ref = useRef(null);
  const allowedTypes = fileType
    ? fileType.split(",").map((type) => type.trim())
    : ["image/jpeg", "image/png"];

  {
    /*  const allowedTypes = ["image/jpeg", "image/png","application/pdf"];*/
  }
  {
    /* const allowedTypes = fileType
  ? fileType.split(",").map((type) => type.trim())
  : ["application/pdf"];
*/
  }

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
    const file = e.target.files[0];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`❌ Only ${allowedTypes.join(", ")} formats are allowed.`, {
          position: "top-right",
          autoClose: 4000,
          theme: "dark",
        });

        {
          /*        toast.error(
          "❌ Only JPEG,PNG & Pdf formats are allowed A/c to Input File.",
          {
            position: "top-right",
            autoClose: 4000,
            theme: "dark",
          }
            */
        }

        return;
      }
      setValue(file);
    }

    // if (e.target.files[0]) {
    //   setValue(e.target.files[0]);
    // }
  }

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
      <input
        ref={ref}
        type="file"
        name={name}
        id={id}
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
