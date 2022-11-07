import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Cardone from "./Cardone";
import Cardtwo from "./Cardtwo";
import "./Campus.css";

const Campus = () => {
  const [campusData, setCampusData] = useState([]);

  useEffect(() => {
    let subscribed = true;
    const getCampusDetails = async () => {
      const response = await axios.get(
        `https://ehubbackend.herokuapp.com/api/v1/campus`
      );

      setCampusData(response.data);
      
    };

    console.log(campusData);
    if (subscribed) {
      getCampusDetails();
    }

    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <div className="containerc">
      <div className="heading">Campus Activities</div>

      <div className="text">
        Engineerhub offers a ton of regular updates on various colleges all over
        India & their various activities to help students learn about various
        opportunities to enhance their growth.
      </div>

      <div
        className="d-flex row justify-content-center "
        style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
      >
        <Card cName={"card custom-card campus-card-cllg"} />
        <Cardone cName={"card custom-card campus-card-cllgone"} />
        <Cardtwo cName={"card custom-card campus-card-cllgtwo"} />
        <Card cName={"card custom-card campus-card-cllg"} />
        <Cardone cName={"card custom-card campus-card-cllgone"} />
        <Cardtwo cName={"card custom-card campus-card-cllgtwo"} />
      </div>
    </div>
  );
};

export default Campus;
