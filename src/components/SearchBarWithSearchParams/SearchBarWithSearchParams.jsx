import React, { useState } from "react";
import "./SearchBarWithSearchParams.css";
import { useSearchParams } from "react-router-dom";

export default function SearchBarWithSearchParams({
  id = "search-box-ehub",
  type = "text",
  param,
  placeholder = "Search",
  ariaLabel = "Search Term",
  ariaDescribedby = "basic-addon2",
  className = "",
  ...rest
}) {
  const [value, setValue] = useState("");
  const [_, setSearchParams] = useSearchParams({ param: "" });

  return (
    <input
      type={type}
      id={id}
      className={`body-sm-regular ${className}`}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setSearchParams(
            (prev) => {
              prev.set(param, value);
              return prev;
            },
            { replace: true }
          );
        }
      }}
      {...rest}
    />
  );
}

SearchBarWithSearchParams.propTypes = {
  checkTypeValue: ({ param }) => {
    if (!param) {
      console.log(param);
      return new Error("SearchBarWithSearchParams requires a param parameter.");
    }
  },
};
