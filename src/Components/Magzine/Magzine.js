import React from "react";
// import { useState, useEffect } from "react";
import "../Magzine/Magzine.css";
// 
import Full from "../Courses/Full";
function Magzine() {
  // const [dis,setDis] = useState(window.innerWidth);
  // const getWindowDimensions = () => {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height
  //   };
  // }
  // const useWindowDimentions = () => {
  //   const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  //   useEffect(() => {
  //     function handleResize() {
  //       setWindowDimensions(getWindowDimensions());
  //       setDis(getWindowDimensions().width);
  //       console.log(dis);
  //     }
  
  //     window.addEventListener('resize', handleResize);
  //     return () => window.removeEventListener('resize', handleResize);
  //   }, []);
  
  //   return windowDimensions;
  // }
 
  // useState(() => {
  //   useWindowDimentions();
  // },[])

  return (
    <>
      <div className="content">
        <div className="container">
          <h1 className="text1">Magazines & Hand-Book</h1>
          <h5 className="text2 text111 magazine-box ">
          Engineerhub issues various magazines & handbooks 
          regularly that contribute to expanding knowledge for the benefit of students.

          </h5>

          <div className="d-flex justify-content-around flex-wrap" style={{ padding: " 4% 0" }}>
            <Full />
            <Full />
            <Full />
            <Full />
          </div>
        </div>
      </div>
    </>
  );
}

export default Magzine;
