import React from "react";
import "./CampusSearchBox.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";

export default function CampusSearchBox({
  data,
  searchParams,
  placeholder,
  listLength,
  setOutput,
}) {
  const [query, setQuery] = useState("");
  const [isClickedOutside, setIsClickedOutside] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const comboBoxRef = useRef(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim().length === 0) setQuery("");
    setQuery(inputValue);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOutput(() => {
      return data.filter((item) => item.collegeName === e.target.textContent)[0]
        ._id;
    });
    setQuery(e.target.textContent);
    setResults([]);
  };

  const runFilterSearch = (objArr, paramsArr, queryStr) => {
    const filtered = filterString(objArr, paramsArr, queryStr);
    setResults(filtered);
  };

  const debouncedResults = useMemo(() => debounce(runFilterSearch, 1000), []);

  // const debouncedResults = debounce(runFilterSearch, 1000);

  useEffect(() => setResults([]), [query]);

  useEffect(() => {
    if (data) debouncedResults(data, searchParams, query);
  }, [data, query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (comboBoxRef.current && !comboBoxRef.current.contains(e.target))
        setIsClickedOutside(true);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isClickedOutside) setIsClickedOutside(false);
  }, [isClickedOutside]);

  return (
    <>
      <div className="stack-sm">
        <div className="combo__box stack-sm" ref={comboBoxRef}>
          <input
            type="text"
            value={query}
            placeholder={placeholder}
            onChange={handleChange}
            className="rounded-md combo__input"
            ref={inputRef}
          />
          {query &&
            results.length > 0 &&
            document.activeElement === inputRef.current &&
            !isClickedOutside && (
              <div className="combo__results rounded-md">
                <ul className="stack-sm">
                  {results
                    ? results.slice(0, listLength).map((result) => (
                        <li key={result.collegeName}>
                          <button
                            type="button"
                            className="result-item rounded-sm"
                            onClick={handleClick}
                          >
                            {showSubstring(result.collegeName, query)}
                          </button>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            )}
        </div>
      </div>
    </>
  );
}

const filterString = (objArray, searchParamsArr, queryStr) => {
  return objArray.filter((item) =>
    searchParamsArr.some(
      (param) =>
        item[param]
          .toString()
          .toLowerCase()
          .trim()
          .indexOf(queryStr.toLowerCase()) > -1
    )
  );
};

const showSubstring = (str, substr) => {
  if (typeof str !== "string" && typeof substr !== "string") {
    return null;
  }
  let strLen = str.length;
  let substrLen = substr.length;
  let substrIndex = str.toLowerCase().indexOf(substr.toLowerCase().trim());

  if (substrIndex === 0) {
    return (
      <>
        <strong>{str.substring(0, substrLen)}</strong>
        {str.substring(substrLen)}
      </>
    );
  }
  if (substrIndex === strLen - substrLen) {
    return (
      <>
        {str.substring(0, substrIndex)}
        <strong>{str.substring(substrIndex, substrIndex + substrLen)}</strong>
      </>
    );
  }
  if (substrIndex !== -1) {
    return (
      <>
        {str.substring(0, substrIndex)}
        <strong>{str.substring(substrIndex, substrIndex + substrLen)}</strong>
        {str.substring(substrIndex + substrLen)}
      </>
    );
  }

  return str;
};

function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    const context = this;
    if (timerId) clearTimeout(timerId);
    // timerId = setTimeout(() => {
    fn.apply(context, args);
    // }, delay);
  };
}
