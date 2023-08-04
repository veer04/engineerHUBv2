import React, { useEffect, useState } from "react";
import "./Hackathons.css";
import HackathonCard from "./HackathonCards";
import { controller, getHiringData } from "../../../../services/APIConfig";
const Hackathons = () => {
  const [event, setEvent] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getHiringData(setEvent);
    return () => {
      controller.abort();
    };
  }, [window.location.pathname]);

  return (
    <div className="Hackathons">
      <div className="hackathonTiles">
        {event
          ?.filter((res) => res.opportunityType === "Event")
          .map((item, index) => {
            return <HackathonCard {...item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Hackathons;
