import React from "react";
import "../magzineandHandbook/magzineandhandbook.css";
import MagzineAndHandbookcard from "./MCard";
import MCard from "./MCard";
export default function MagzineAndHandbook() {
  return (
    <>
      {/* <div className="container-fluid imp"> */}
        <div className="container-hiring">
          <div className="heading">
            Magzines &amp; HandBook 
            </div>
            <p className="texthire">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        

          <div className="d-flex row justify-content-center " style={{marginTop:"0px" , gap: "40px", paddingBottom:"80px"}}>
            <MCard/>
            <MCard/>
            <MCard/>
            <MCard/>
            <MCard/>
            <MCard/>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}
