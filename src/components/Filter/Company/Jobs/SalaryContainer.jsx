import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";

export default function SalaryContainer({
  correspondingModal,
  isOpen,
  setIsOpen,
}) {
  const [experience, setExperience] = useState([
    {
      title: "Below > 5,00,000 lakhs",
      value: [0, 500000],
      checked: false,
    },
    {
      title: "5,00,000 - 10,00,000 lakhs",
      value: [500000, 1000000],
      checked: false,
    },
    {
      title: "10,00,000 - 15,00,000 lakhs",
      value: [1000000, 1500000],
      checked: false,
    },
    {
      title: "15,00,000 - 25,00,000 lakhs",
      value: [1500000, 2500000],
      checked: false,
    },
    {
      title: "25,00,000 lakhs < above",
      value: [2500000, 999999999],
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

    setIsOpen((prev) => {
      return { ...prev, [correspondingModal]: !prev[correspondingModal] };
    });
  };

  return (
    <>
      {isOpen && (
        <div className="filter-box salary-container">
          <div className="top-container">
            <h3 className="body-md-semibold">Salary</h3>
            <button
              onClick={() =>
                setIsOpen((prev) => {
                  return {
                    ...prev,
                    [correspondingModal]: !prev[correspondingModal],
                  };
                })
              }
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
      )}
    </>
  );
}
