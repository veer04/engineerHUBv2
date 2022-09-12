import React,{useState,useEffect} from "react";
import axios from "axios";
// import backImage from "../Magzine/backimg.png";
import { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <>
      <div className="content">
        <div className="container">
          <h1 className="text1">Events</h1>
          <h5 className="text111 event-box ">
          We organize numerous events to impart knowledge to students and provide 
          them with an appropriate platform to showcase their skills.
          </h5>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            spaceBetween={26}
            breakpoints={{
            
              320: {
                width: 311,
                slidesPerView: 1,
              },
              768: {
                width: 700,
                slidesPerView: 2,
              },
              1024: {
                width: 900,
                slidesPerView: 3,
              },
              1440: {
                width: 1274,
                slidesPerView: 4,
              },
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <EventCard />
            </SwiperSlide>
            <SwiperSlide>
              <EventCard />
            </SwiperSlide>
            <SwiperSlide>
              <EventCard />
            </SwiperSlide>
            <SwiperSlide>
              <EventCard />
            </SwiperSlide>
            <SwiperSlide>
              <EventCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Events;
