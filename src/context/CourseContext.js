import React from 'react'
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get(`http://43.204.214.170:3000/api/v1/course`, {
        cancelToken: cancelToken.token,
      })
      .then((res) => setCourseData([...res.data]))
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });

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
