import React, { useState, useEffect } from "react";
import { Component1 } from "./Component1";
import { Component3 } from "./Component3/Component3";
import { EnterpriseCampus } from "./Component3/EnterpriseCampus";
import { Frame } from "./Component3/bookaSlot";
import { JobAThonMobile } from "./MobileView/EnterpriseMobileView";

const Enterprise = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    
    // Initial check to update state on mount
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <JobAThonMobile />
      ) : (
        <>
          <Component1 />
          <div className="CenterEnterprise">
            <EnterpriseCampus />
          </div>
          <div className="CenterEnterprise">
            <Component3 />
          </div>
        </>
      )}
    </div>
  );
};

export default Enterprise;
