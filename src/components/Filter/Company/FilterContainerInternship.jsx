import React from "react";
import "./FilterContainer.css";
import LocationFilter from "./LocationFilter";
import InternshipTypeFilter from "./InternshipTypeFilter";
import InternshipModeFilter from "./InternshipModeFilter";
import StipendFilter from "./StipendFilter";

export default function FilterContainerInternship({ className, ...rest }) {
  return (
    <aside
      className={`filter-container ${Boolean(className) ? className : ""}`}
      {...rest}
    >
      <InternshipTypeFilter />
      <InternshipModeFilter />
      <LocationFilter />
      <StipendFilter />
    </aside>
  );
}
