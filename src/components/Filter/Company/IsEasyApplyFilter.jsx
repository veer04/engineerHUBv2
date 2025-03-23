import React, { useEffect, useState } from "react";
import "./FilterContainer.css";
import FilterButton from "./FilterButton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ClickAwayListener } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";

export default function IsEasyApplyFilter() {
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const isEasyApplyParam = searchParams.get("isEasyApply");
    setIsChecked(isEasyApplyParam === "1");
  }, [searchParams]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClearFilters = () => {
    if (!isChecked) return;
    setIsChecked(false);
    setSearchParams(
      (prev) => {
        prev.delete("isEasyApply");
        prev.set("pageNo", 1);
        return prev;
      },
      { replace: true }
    );
  };

  const handleApplyFilters = () => {
    setSearchParams(
      (prev) => {
        if (isChecked) {
          prev.set("isEasyApply", "1");
        } else {
          prev.delete("isEasyApply");
        }
        prev.set("pageNo", "1");
        return prev;
      },
      { replace: true }
    );
    setOpen(false);
    window.location.reload();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <FilterButton
          title="Easy Apply"
          iconOpened={<IoIosArrowUp />}
          iconClosed={<IoIosArrowDown />}
          counter={isChecked ? 1 : 0}
          onClick={handleClick}
          isOpen={open}
        />
        {open ? (
          <div className="filter-box">
            <div className="top-container">
              <h3 className="body-md-semibold">Easy Apply</h3>
              <button
                onClick={() => setOpen(false)}
                className="close-btn heading-sm"
              >
                <RxCross2 />
              </button>
            </div>

            <ul>
              <li>
                <label
                  htmlFor="easyApply"
                  className="label-sm filter-opt-label"
                >
                  Easy Apply Jobs
                  <input
                    type="checkbox"
                    name="easyApply"
                    id="easyApply"
                    className="filter-opt-input"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                </label>
              </li>
            </ul>
            <div className="bottom-container">
              <button
                onClick={handleClearFilters}
                className="clear-btn body-sm-semibold"
              >
                Clear
              </button>
              <button
                onClick={handleApplyFilters}
                className="apply-btn body-sm-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
