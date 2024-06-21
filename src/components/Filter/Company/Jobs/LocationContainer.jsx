import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from "react-router-dom";

export default function LocationContainer({
  correspondingModal,
  isOpen,
  setIsOpen,
}) {
  const [experience, setExperience] = useState([
    {
      title: "Bangalore Urban",
      value: ["Bangalore Urban"],
      checked: false,
    },
    {
      title: "Noida",
      value: ["Noida"],
      checked: false,
    },
    {
      title: "Gurgaon",
      value: ["Gurgaon"],
      checked: false,
    },
    {
      title: "Chennai",
      value: ["Chennai"],
      checked: false,
    },
    {
      title: "Delhi",
      value: ["Delhi"],
      checked: false,
    },
    {
      title: "Mumbai",
      value: ["Mumbai"],
      checked: false,
    },
    {
      title: "Pune",
      value: ["Pune"],
      checked: false,
    },
    {
      title: "Hyderabad",
      value: ["Hyderabad"],
      checked: false,
    },
    {
      title: "Surat",
      value: ["Surat"],
      checked: false,
    },
    {
      title: "Dehradun",
      value: ["Dehradun"],
      checked: false,
    },
    {
      title: "Mysuru",
      value: ["Mysuru"],
      checked: false,
    },
    {
      title: "Kolkata",
      value: ["Kolkata"],
      checked: false,
    },
    {
      title: "South Delhi",
      value: ["South Delhi"],
      checked: false,
    },
    {
      title: "East Delhi",
      value: ["East Delhi"],
      checked: false,
    },
  ]);

  const [searchParams, setSearchParams] = useSearchParams({
    location: "",
  });
  const q = searchParams.get("location");

  useEffect(() => {
    if (q) {
      const selectedExperience = q.split(",");
      setExperience((prev) => {
        return prev.map((item) => {
          if (selectedExperience.includes(item.value[0])) {
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
        prev.set("location", "");
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
        prev.set("location", selectedExperience);
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
        <div className="filter-box location-container">
          <div className="top-container">
            <h3 className="body-md-semibold">Location</h3>
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
