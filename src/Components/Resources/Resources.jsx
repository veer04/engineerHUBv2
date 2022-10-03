/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ResourceApi from "./ResourceApi";

function Resource() {
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <div>
      <ResourceApi
        heading="Resources for DSA"
        text="engineerhub provides various resources on DSA to help students build up their knowledge and prepare themselves for placements. "
      />
    </div>
  );
}

export default Resource;
