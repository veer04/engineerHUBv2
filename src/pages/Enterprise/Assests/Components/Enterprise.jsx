import React, { useState, useEffect } from "react";
import { Component1 } from "./Component1";
import { Component3 } from "./Component3/Component3";
import { EnterpriseCampus } from "./Component3/EnterpriseCampus";
import { Frame } from "./Component3/Frame";
import { JobAThonMobile } from "./MobileView/EnterpriseMobileView";
import {JobAThonDesktopView} from "./JobAThonDesktopView";
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
        <JobAThonDesktopView/>
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

          
        </>
      )}
    </div>
  );
};

export default Enterprise;
