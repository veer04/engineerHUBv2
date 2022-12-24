import React, { useState, useEffect } from "react";
import "./Hiring.css";

import CardH from "../Hiring/CardH";
import { cancelToken, getHiring } from "../../services/APIConfig";

export default function Hiring() {
  const [hiringData, setHiringData] = useState([]);
  useEffect(() => {
    getHiring(setHiringData);

    return () => {
      cancelToken.cancel();
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
          {hiringData.map((hcd) => {
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
