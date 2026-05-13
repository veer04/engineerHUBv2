import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { JobAThonDesktopView } from "./JobAThonDesktopView";
const Enterprise = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#book-slot-section") {
      const t = window.setTimeout(() => {
        document
          .getElementById("book-slot-section")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [location.pathname, location.hash]);

  return (
    <div>
      
          <JobAThonDesktopView />
          {/*
  // Rendering Component1
  <Component1 />

  // Wrapper div with class "CenterEnterprise" containing the EnterpriseCampus component
  <div className="CenterEnterprise">
    <EnterpriseCampus />
  </div>

  // Wrapper div with class "centerEnterprise" containing the Frame component
  <div className="centerEnterprise">
    <Frame />
  </div>

  // Wrapper div with class "CenterEnterprise" containing Component3
  <div className="CenterEnterprise">
    <Component3 />
  </div>
*/}
    </div>
    
 
  );
};

export default Enterprise;
