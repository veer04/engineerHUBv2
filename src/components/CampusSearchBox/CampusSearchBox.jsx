import React from "react";
import "./CampusSearchBox.css";
import { useEffect, useState, useRef, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";

export default function CampusSearchBox({
  data,
  searchParams,
  placeholder,
  listLength,
  setOutput,
}) {
  const [searchParams2, setSearchParams2] = useSearchParams({ q: "" });
  const q = searchParams2.get("q");
  const [query, setQuery] = useState("");
  const [isClickedOutside, setIsClickedOutside] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const comboBoxRef = useRef(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim().length === 0)
      setSearchParams2(
        (prev) => {
          prev.set("q", "");
          return prev;
        },
        { replace: true }
      );

    setSearchParams2(
      (prev) => {
        prev.set("q", inputValue);
        return prev;
      },
      { replace: true }
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOutput(() => {
      // return data.filter((item) => item.collegeName === e.target.textContent)[0]
      //   ._id;
      return e.target.textContent;
    });
    setSearchParams2(
      (prev) => {
        prev.set("q", e.target.textContent);
        return prev;
      },
      { replace: true }
    );
    setResults([]);
  };

  const runFilterSearch = (objArr, paramsArr, queryStr) => {
    const filtered = filterString(objArr, paramsArr, queryStr);
    setResults(filtered);
  };

  const debouncedResults = useMemo(() => debounce(runFilterSearch, 1000), []);

  // const debouncedResults = debounce(runFilterSearch, 1000);

  useEffect(() => setResults([]), [q]);

  useEffect(() => {
    if (data) debouncedResults(data, searchParams, q);
  }, [data, q]);

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
            value={q}
            placeholder={placeholder}
            onChange={handleChange}
            className="rounded-md combo__input"
            ref={inputRef}
            // when searched it should show the results
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchParams2(
                  (prev) => {
                    prev.set("q", e.target.value);
                    return prev;
                  },
                  { replace: true }
                );
                setResults([]);
                setOutput(() => {
                  // return data.filter(
                  //   (item) => item.collegeName === e.target.value
                  // )[0]._id;
                  return e.target.value;
                });
              }
            }}
          />
          {q &&
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
                            {showSubstring(result.collegeName, q)}
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
          // .toString()
          // .toLowerCase()
          // .trim()
          // .indexOf(queryStr?.toLowerCase()) > -1
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
