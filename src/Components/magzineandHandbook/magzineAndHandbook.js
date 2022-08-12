import React from "react";
import "../magzineandHandbook/magzineandhandbook.css";
import MagzineAndHandbookcard from "./magzinehandbookcaed";
import Full from "../freecourses-pages/Full";
export default function MagzineAndHandbook() {
  return (
    <>
      <div className="container-fluid imp">
        <div className="container-courses">
          <div className="heading">
            Magzines &amp; HandBook 
            </div>
            <p className="texthire">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
        

          <div className="magzine-card-container">
            {/* <MagzineAndHandbookcard />
            <MagzineAndHandbookcard />
            <MagzineAndHandbookcard /> */}
            <Full/>
          </div>
        </div>
      </div>
    </>
  );
}
