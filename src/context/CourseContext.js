import React from "react";
import { createContext, useEffect, useState } from "react";

import { cancelToken, getCourses } from "../services/APIConfig";

export const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courseData, setCourseData] = useState([]);
  
  useEffect(() => {
    getCourses(setCourseData);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <CourseContext.Provider value={{ courseData }}>
      {children}
    </CourseContext.Provider>
  );
};
