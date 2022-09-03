import React,{useState,useEffect} from "react";
import axios from "axios";
import backImage from "../Magzine/backimg.png";
import EventCard from "./EventCard";
function Events() {

  const [eventData,setEventData] = useState([]);
  useEffect(() => {
    const getEventDetails = async () => {
      const response = await axios.get( `https://ehubbackend.herokuapp.com/api/v1/event`)

      setEventData(response.data);
    }
    getEventDetails();
  }, [])
  
  return (
    <>
      <div className="content">
        <div className="container">
          <h1 className="text1">Events</h1>
          <h5 className="text2 text111 event-box ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos,
            natus. Nihil molestias culpa quibusdam quaerat ea neque velit fugit
            officia amet eligendi! Quis quos animi officia explicabo accusamus
            obcaecati totam.
          </h5>
          <div className="d-flex justify-content-around flex-wrap" style={{ padding: " 4% 0" }}>
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
