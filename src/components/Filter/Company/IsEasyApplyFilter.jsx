import React, { useEffect, useState } from "react";
import "./FilterContainer.css";
import FilterButton from "./FilterButton";
import { useSearchParams } from "react-router-dom";

export default function IsEasyApplyFilter() {
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
//demo commit 
  useEffect(() => {
    const isEasyApplyParam = searchParams.get("isEasyApply");
    setIsChecked(isEasyApplyParam === "1");
  }, [searchParams]);

  const handleToggle = () => {
    setSearchParams((prev) => {
      if (isChecked) {
        prev.delete("isEasyApply");
      } else {
        prev.set("isEasyApply", "1");
      }
      prev.set("pageNo", 1);
      return prev;
    }, { replace: true });

    setIsChecked((prev) => !prev);
  };

  return (
    <div className="filter-item">
      <FilterButton
        title="Easy Apply"
        counter={isChecked ? 1 : 0}
        onClick={handleToggle}
        isSelected={isChecked}
      />
    </div>
  );
}
