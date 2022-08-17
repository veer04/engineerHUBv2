import React from "react";
import "../Magzine/Magzine.css";
import ShareIcon from "@mui/icons-material/Share";
import backImage from "../Magzine/backimg.png";
import Full from "../freecourses-pages/Full";
function Magzine() {
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

          <div className="row containmentz justify-content-between" style={{ marginLeft: "36px"}}>
        
       
            <Full/>
            <Full/>
            <Full/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Magzine;
