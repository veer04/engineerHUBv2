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

  return (
    <div>
      <button onClick={() => {
        postHiringDetails()
      }}>Post Hiring Details</button>
    </div>
  );
};

export default TestAPI;
