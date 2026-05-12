import React from "react";
import FilteredJobsSegment from "./FilteredJobsSegment";

const SEGMENTS = [
  { title: "Remote Jobs", filterKey: "isRemote", tintIndex: 2 },
  { title: "Fresher's Jobs", filterKey: "isForFreshers", tintIndex: 1 },
  { title: "Easy Apply", filterKey: "isEasyApply", tintIndex: 3 },
  { title: "MAANG", filterKey: "isMaang", tintIndex: 4 },
];

/**
 * Four stacked segments (JobsSegment layout), each with 3 real jobs for that filter.
 * Order: Remote first, then Fresher's, Easy Apply, MAANG.
 */
const JobsForYouFilterSegments = () => {
  return (
    <>
      {SEGMENTS.map(({ title, filterKey, tintIndex }) => (
        <FilteredJobsSegment
          key={filterKey}
          title={title}
          filterKey={filterKey}
          tintIndex={tintIndex}
        />
      ))}
    </>
  );
};

export default JobsForYouFilterSegments;
