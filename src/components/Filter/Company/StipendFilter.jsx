import React, { useEffect, useState } from "react";
import "./FilterContainer.css";
import FilterButton from "./FilterButton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ClickAwayListener } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";

export default function StipendFilter() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const [experience, setExperience] = useState([
    {
      title: "Below > 10k",
      value: [100, 9999],
      checked: false,
    },
    {
      title: "10k - 20k",
      value: [10000, 20000],
      checked: false,
    },
    {
      title: "20k - 40k",
      value: [20000, 40000],
      checked: false,
    },
    {
      title: "40k above",
      value: [40001, 999999999],
      checked: false,
    },
  ]);

  const [searchParams, setSearchParams] = useSearchParams({
    salary: "",
  });
  const q = searchParams.get("salary");

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
        prev.set("salary", "");
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
        prev.set("salary", selectedExperience);
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
          title="Stipend"
          iconOpened={<IoIosArrowUp />}
          iconClosed={<IoIosArrowDown />}
          counter={experience.filter((item) => item.checked === true).length}
          onClick={handleClick}
          isOpen={open}
        />
        {open ? (
          <div className="filter-box">
            <div className="top-container">
              <h3 className="body-md-semibold">Stipend</h3>
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
