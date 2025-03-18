import React from "react";
import "./FilterContainer.css";
import ExperienceFilter from "./ExperienceFilter";
import JobTypeFilter from "./JobTypeFilter";
import JobModeFilter from "./JobModeFilter";
import LocationFilter from "./LocationFilter";
import SalaryFilter from "./SalaryFilter";
import IsEasyApplyFilter from "./IsEasyApplyFilter";

export default function FilterContainerJob({ className, ...rest }) {
  return (
    <aside
      className={`filter-container ${Boolean(className) ? className : ""}`}
      {...rest}
    >
      <ExperienceFilter/>
      <JobTypeFilter/>
      <JobModeFilter/>
      <LocationFilter/>
      <SalaryFilter/>
      <IsEasyApplyFilter/>
    </aside>
  );
}
