/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import Card from "./Card";
import "./Campus.css";

const Campus = () => {
  const [campusData, setCampusData] = useState([]);

  useEffect(() => {
    let subscribed = true;
    const getCampusDetails = async () => {
      const response = await axios.get(`${API_URL}api/v1/campus`);

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

      <div className=" mainCard">
        {campusData.map((cd) => {
          return (
            <Card
              card_head={cd.eventName}
              clgphoto={cd.collegePhoto}
              desc={cd.description}
              clgname={cd.collegeName}
              evtdate={cd.eventDate}
              link={cd.websiteUrl}
              id={cd._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Campus;
