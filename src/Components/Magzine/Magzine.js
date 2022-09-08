import React from "react";
import { useState, useEffect } from "react";
import "../Magzine/Magzine.css";
import ShareIcon from "@mui/icons-material/Share";
import backImage from "../Magzine/backimg.png";
import Full from "../freecourses-pages/Full";
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos,
            natus. Nihil molestias culpa quibusdam quaerat ea neque velit fugit
            officia amet eligendi! Quis quos animi officia explicabo accusamus
            obcaecati totam.
          </h5>

          <div className="d-flex justify-content-around flex-wrap" style={{ padding: " 4% 0" }}>
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
