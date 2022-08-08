import React from "react";
import "../magzineandHandbook/magzineandhandbook.css";
import MagzineAndHandbookcard from "./magzinehandbookcaed";
export default function MagzineAndHandbook() {
  return (
    <>
      <div className="container-fluid">
        <div className="magzine-container">
          <div className="magzine-header">
            <h2>Magzines &amp; HandBook</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="magzine-card-container">
            <MagzineAndHandbookcard />
            <MagzineAndHandbookcard />
            <MagzineAndHandbookcard />
          </div>
        </div>
      </div>
    </>
  );
}
