import React from "react";
import "./Domain.css";
import Dropdown from "./Dropdown.js";

function Domain() {
  return (
    <>
      <div className="container-hiring">
        <div className="heading">Our Domains !!</div>

        <div
          className="d-flex row justify-content-center"
          style={{
            marginTop: "0px",
            gap: "9px",
            paddingBottom: "80px",
            paddingTop: "25px",
            marginRight:"0px"
          }}
        >
          <Dropdown />
        </div>
      </div>
    </>
  );
}

export default Domain;
