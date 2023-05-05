import React, { useEffect, useMemo, useState } from "react";
import "./SearchBar.css";
import { BiFilter } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";

export default function SearchBar({
  data,
  className,
  hasFiltration,
  placeholder,
  type,
  result,
}) {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    // return data.filter((value) => {
    //   return value.projectName.toLowerCase().includes(query.toLowerCase());
    // });
  }, [data, query]);

  useEffect(() => {
    result(filteredData);
  }, [filteredData]);

  // function to filter the data according to the input
  const handleFilter = (e) => {
    const searchWord = e.target.value.toLowerCase();
    const newFilter = data.filter((value) => {
      return value.projectName.toLowerCase().includes(searchWord);
    });
    result(searchWord.length === 0 ? data : newFilter);
  };

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
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          // handleFilter(e);
        }}
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
