import React, { useEffect, useState } from "react";
import "./FilterContainer.css";
import FilterButton from "./FilterButton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ClickAwayListener } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";

export default function ExperienceFilter() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const [experience, setExperience] = useState([
    {
      title: "Fresher",
      value: [0, 0],
      checked: false,
    },
    {
      title: "1-2 years",
      value: [1, 2],
      checked: false,
    },
    {
      title: "3-4 years",
      value: [3, 4],
      checked: false,
    },
    {
      title: "5-6 years",
      value: [5, 6],
      checked: false,
    },
    {
      title: "7-8 years",
      value: [7, 8],
      checked: false,
    },
    {
      title: "9-10 years",
      value: [9, 10],
      checked: false,
    },
    {
      title: "10+ years",
      value: [10, 99],
      checked: false,
    },
  ]);

  const [searchParams, setSearchParams] = useSearchParams({
    exp: "",
  });
  const q = searchParams.get("exp");

  useEffect(() => {
    if (q) {
      const selectedExperience = q.split(",").map((item) => parseInt(item));

      setExperience((prev) => {
        return prev.map((item) => {
          if (
            selectedExperience.includes(item.value[0]) &&
            selectedExperience.includes(item.value[1])
          ) {
            return { ...item, checked: true };
          }
          return item;
        });
      });
    }
  }, [q]);

  const handleClearFilters = () => {
    if (experience.every((item) => item.checked === false)) return;
    setExperience((prev) => {
      return prev.map((item) => {
        return { ...item, checked: false };
      });
    });
    setSearchParams(
      (prev) => {
        prev.set("exp", "");
        prev.set("pageNo", 1);
        return prev;
      },
      { replace: true }
    );
  };

  const handleApplyFilters = () => {
    const selectedExperience = experience
      .filter((item) => item.checked)
      .map((item) => item.value)
      .flat();
    setSearchParams(
      (prev) => {
        prev.set("exp", selectedExperience);
        prev.set("pageNo", 1);
        return prev;
      },
      { replace: true }
    );

    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <FilterButton
          title="Experience"
          iconOpened={<IoIosArrowUp />}
          iconClosed={<IoIosArrowDown />}
          counter={experience.filter((item) => item.checked === true).length}
          onClick={handleClick}
          isOpen={open}
        />
        {open ? (
          <div className="filter-box">
            <div className="top-container">
              <h3 className="body-md-semibold">Experience</h3>
              <button
                onClick={() => setOpen(false)}
                className="close-btn heading-sm"
              >
                <RxCross2 />
              </button>
            </div>

            <ul>
              {experience.map((item, index) => {
                return (
                  <li key={index}>
                    <label
                      htmlFor={item.title}
                      className="label-sm filter-opt-label"
                    >
                      {item.title}
                      <input
                        type="checkbox"
                        name={item.title}
                        id={item.title}
                        className="filter-opt-input"
                        checked={item.checked}
                        onChange={(e) => {
                          setExperience((prev) => {
                            const newArr = [...prev];
                            newArr[index].checked = e.target.checked;
                            return newArr;
                          });
                        }}
                      />
                    </label>
                  </li>
                );
              })}
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
