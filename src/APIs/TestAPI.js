import React from "react";
import axios from "axios";

const TestAPI = () => {
  const postHiringDetails = async () => {
    try {
      const res = await axios.post(
        `https://ehubbackend.herokuapp.com/api/v1/hiring`,
        {
          position: "Frontedn developer",
          description:
            "We are looking for passionate developers in React and Node",
          location: "Remote",
          lastDate: "12-09-2022",
          experience: "0-2 years",
          eligibility: "From Technical Background",
          techStack: "React",
        }
      );

      console.log(res);
    } catch (err) {
      console.log("Post Request Failed 💥");
    }
  };

  const postResourceDetails = async () => {
    const res = await axios.post(
      `https://ehubbackend.herokuapp.com/api/v1/resource`,
      {
        resourceName: "Top Websites for DSA",
        resourceLink: "https://google.com/",
      }
    );
  };

  const postEventDetails = async () => {
    const res = await axios.post(
      `https://ehubbackend.herokuapp.com/api/v1/event`,

      {
        mentorName: "Rahul",
        mentorImage:
          "https://www.kapwing.com/resources/how-to-get-an-image-url-from-picture/",
        eventName: "Organising Hackathon",
        eventCode: "21f73",
        description: "Join us today ",
        eventDate: "22-05-2022",
        position: "SDE",
        company: "Microsoft",
        posterUrl:
          "https://wwow.kapwinfrg.com/resources/how-to-get-an-image-url-from-picture/",
      }
    );
  };

  return (
    <div>
      <button
        onClick={() => {
          postHiringDetails();
        }}
      >
        Post Hiring Details
      </button>
    </div>
  );
};

export default TestAPI;
