import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/autoplay";

import EventCard from "./EventCard";

export const eventStaticData = [
  {
    eventTitle1: "Coding",
    eventTitle2: "Contests",
    eventDescription:
      "Various Coding Contests are organised to help students evaluate their coding skills and test their abilities.We help you achieve the most remarkable results. We offer various materials covering fundamentals ",
    lastDate: "22/08/2023",
    cardImage: `.${__dirname}Images/coding.jpg`,
  },
  {
    eventTitle1: "Workshops",
    eventTitle2: " ",
    eventDescription:
      "We organise various workshops to guide students by giving them a basic framework of technical subjects by skilled mentors . We offer various materials covering fundamentals & advanced topics",
    lastDate: "22/11/2022",
    cardImage: `.${__dirname}Images/courses.png`,
  },
  {
    eventTitle1: "Weekend with ",
    eventTitle2: "Us",
    eventDescription:
      "A weekly event named `Weekend with us` Is organised to give a live interactive session by mentors/ professionals to give an overview of the placements & train the students accordingly.",
    lastDate: "22/02/2023",
    cardImage: `.${__dirname}Images/weekend.png`,
  },
];

function Events() {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    let subscribed = true;
    const getEventDetails = async () => {
      const response = await axios.get(`${API_URL}api/v1/event`);
      setEventData(response.data);
    };

    if (subscribed) {
      getEventDetails();
    }
    return () => {
      subscribed = false;
    };
  }, []);

  return (
    <>
      <div className="content">
        <div className="container">
          <h1 className="text1 txt">Events</h1>
          <h5 className="text111 event-box ">
            We organize numerous events to impart knowledge to students and
            provide them with an appropriate platform to showcase their skills.
          </h5>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 1000 }}
            spaceBetween={26}
            breakpoints={{
              768: {
                width: 700,
                slidesPerView: 2,
              },
              1024: {
                width: 930,
                slidesPerView: 3,
              },
              1440: {
                width: 1274,
                slidesPerView: 4,
              },
            }}
            onSwiper={(swiper) => {}}
            onSlideChange={() => {}}
          >
            {eventData.map((c, i) => (
              <SwiperSlide key={`${i}b`}>
                <EventCard
                  key={`${i}b`}
                  tagline={c.tagline}
                  posterUrl={c.posterUrl}
                  description={c.description}
                  eventDate={c.eventDate}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Events;
