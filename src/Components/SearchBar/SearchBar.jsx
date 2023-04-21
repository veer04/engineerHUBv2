import React, { useState } from "react";
import "./SearchBar.css";
import { BiFilter } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";

export default function SearchBar({
  className,
  hasFiltration,
  placeholder,
  type,
}) {
  const [value, setValue] = useState("");

  return (
    <div className={`search-bar ${className ? className : ""}`}>
      {hasFiltration && (
        <div className="filter__container">
          <div>
            <BiFilter />
          </div>
        </div>
      )}
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="input"
        style={{
          borderLeft: !hasFiltration
            ? "1px solid rgb(33, 139, 137, 0.61)"
            : "none",
          borderRadius: !hasFiltration ? ".5rem 0 0 .5rem" : "0px",
          paddingLeft: !hasFiltration ? "1rem" : "0px",
        }}
      />
      <div className="search-icon__container">
        <div>
          <HiOutlineSearch />
        </div>
      </div>
    </div>
  );
}
