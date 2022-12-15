import React, { useState, useEffect } from "react";
import "./Hiring.css";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import CardH from "../Hiring/CardH";

export default function Hiring() {
  const [carData, setCard] = useState([]);
  useEffect(() => {
    let subscribed = true;
    const getHiringDetails = async () => {
      const response = await axios.get(`${API_URL}api/v1/hiring`);
      console.log(response.data);
      setCard(response.data);
    };
    if (subscribed) {
      getHiringDetails();
    }

    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <>
      <div className="container-hiring">
        <div className="heading">We are Hiring !!</div>

        <div className="texthire">
          engineerhub is hiring students to encourage their efforts & help them
          excel in the following domains.
        </div>

        <div
          className="d-flex row justify-content-center "
          style={{ marginTop: "0px", gap: "40px", paddingBottom: "80px" }}
        >
          {carData.map((hcd) => {
            return (
              <CardH
                card_head={`Hiring for ${hcd.position}`}
                cDate={hcd.date}
                desc={hcd.description}
                loc={hcd.location}
                tech={hcd.techStack}
                exp={hcd.experience}
                elg={hcd.eligibility}
                lastDate={hcd.lastDate}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
