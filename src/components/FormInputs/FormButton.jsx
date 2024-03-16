import React from "react";
import "./FormInput.css";
import Loading from "../Loader/Loading";

export default function FormButton({
  isLoading,
  className,
  children,
  ...rest
}) {
  return (
    <button
      disabled={isLoading}
      className={`form-button ${className}`}
      {...rest}
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
}
