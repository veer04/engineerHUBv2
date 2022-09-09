import React,{useState,useEffect} from "react";
import axios from "axios";
// import backImage from "../Magzine/backimg.png";
import EventCard from "./EventCard";
function Events() {

  const [eventData,setEventData] = useState([]);
  useEffect(() => {
    const getEventDetails = async () => {
      const response = await axios.get( `https://ehubbackend.herokuapp.com/api/v1/event`)

      setEventData(response.data);
    }
    console.log(eventData);
    getEventDetails();
  }, [])
  
  return (
    <>
      <div className="content">
        <div className="container">
          <h1 className="text1">Events</h1>
          <h5 className="text2 text111 event-box ">
          We organize numerous events to impart knowledge to students and provide 
          them with an appropriate platform to showcase their skills.
          </h5>
          <div className="d-flex justify-content-around flex-wrap" style={{ padding: " 4% 0" }}>
            <EventCard />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
