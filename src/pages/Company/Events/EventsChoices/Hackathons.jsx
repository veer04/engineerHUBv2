import React, { useEffect, useState } from "react";
import "./Hackathons.css";
import HackathonCard from "./HackathonCards";
import { Bucket_URL } from "../../../../services/APIUtils";
import { controller, getHiringData } from "../../../../services/APIConfig";
import colorWheel from "../../../../assets/colorWheel";
import { useParams } from "react-router-dom";
const Hackathons = () => {
  // const hiringId=useParams();
  const [event, setEvent] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getHiringData(setEvent);
    return () => {
      controller.abort();
    };
  }, [window.location.pathname]);

  useEffect(() => {
    console.log(event);
  }, [event]);

  const bucket = `${Bucket_URL}frontend/company/events/hackathon/`;

  const data = [
    {
      stars: 3,
      views: 426,
      days: 9,
    },
    {
      stars: 3,
      views: 575,
      days: 20,
    },
    {
      stars: 4,
      views: 978,
      days: 7,
    },
    {
      stars: 5,
      views: 148,
      days: 17,
    },
    {
      stars: 3,
      views: 429,
      days: 15,
    },
    {
      stars: 5,
      views: 292,
      days: 27,
    },
  ];

  return (
    <div className="Hackathons">
      <div className="hackathonTiles">
        {event
          ?.filter((res) => res.opportunityType === "Event")
          .map((item, index) => {
            return (
              <HackathonCard
                details={item}
                data={data[index % data.length]}
                color={colorWheel[index % colorWheel.length]}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Hackathons;
