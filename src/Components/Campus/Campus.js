import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

import "./Campus.css";

const Campus = () => {
  const [campusData, setCampusData] = useState([]);

  useEffect(() => {
    const getCampusDetails = async () => {
      const response = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/campus`
      );

      setCampusData(response.data);
      console.log(response);
    };
    console.log(campusData);
    getCampusDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="containerc">
      <div className="heading">Campus Activities</div>

      <div className="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non gravida sit
        nunc duis dui, dui hendrerit suscipit.
      </div>

      <div
        className="d-flex row justify-content-center "
        style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
      >
        <Card cName={"card custom-card campus-card-cllg"} />
        <Card cName={"card custom-card campus-card-cllg"} />
        <Card cName={"card custom-card campus-card-cllg"} />
        <Card cName={"card custom-card campus-card-cllg"} />
        <Card cName={"card custom-card campus-card-cllg"} />
        <Card cName={"card custom-card campus-card-cllg"} />
      </div>
    </div>
  );
};

export default Campus;
