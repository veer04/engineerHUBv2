import React from "react";
import "./ourmentors.css";
import { Bucket_URL } from "../../../../services/APIUtils";
import MentorCard from "./MentorCard/MentorCard";

const MentorData = [
  {
    position: "Mentor",
    name: "Rishabh Singh",
    desc: "Experienced leaders, our mentors nurture the next generation with personalized guidance.",
    totalSession: "10 +",
    totalSessionHours: "50 hr+",
    studentsMentored: "5 +",
    linkedinLink: "https://www.linkedin.com/in/rishabhsingh11/",
    mentorImage: `${Bucket_URL}Mentors/3.png`,
  },
  {
    position: "Mentor",
    name: "Kunwar Vidya Niwas",
    desc: "Our mentors are passionate professionals dedicated to guiding students in their career journeys.",
    totalSession: "25 + ",
    totalSessionHours: "115 hr+",
    studentsMentored: "15 +",
    linkedinLink: "https://www.linkedin.com/in/kunwar-vidya-niwas-22b523202/",
    mentorImage: `${Bucket_URL}Mentors/2.png`,
  },
  {
    position: "Mentor",
    name: "Rishabh Singh",
    desc: "Experienced leaders, our mentors nurture the next generation with personalized guidance.",
    totalSession: "20 +",
    totalSessionHours: "85 hr+",
    studentsMentored: "12 +",
    linkedinLink: "https://www.linkedin.com/in/karan~veer~singh/",
    mentorImage: `${Bucket_URL}Mentors/1.png`,
  },
];

const OurMentors = () => {
  return (
    <div className="our-mentors-main">
      <h4 className="h4-our-mentor">Our Mentors</h4>

      <div className="main-comp-card-grid">
        {MentorData &&
          MentorData.map((mentor, index) => (
            <MentorCard data={mentor} index={index} />
          ))}
      </div>
    </div>
  );
};

export default OurMentors;
