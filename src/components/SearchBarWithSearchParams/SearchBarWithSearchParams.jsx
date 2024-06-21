import React, { useEffect, useState } from "react";
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
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setValue(searchParams.get(param) || "");
  }, []);

  return (
    <input
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      name={param}
      tabIndex="0"
      type="text"
      spellCheck="false"
      role="combobox"
      aria-haspopup="false"
      aria-autocomplete="list"
      dir="ltr"
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
