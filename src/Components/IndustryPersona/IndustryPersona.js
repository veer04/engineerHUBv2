import React from "react";
import IdpCard from "./IdpCard"
import {
  HEADMEMBER_LID1,
  HEADMEMBER_LID2,
  HEADMEMBER_LID3,
} from "../../config/StaticLinks";

const industryMembers = [
  {
    Profession: "SDE",
    Name: "Arun Kumar",
    Company: " @Ola",
    
    LinkedIn: HEADMEMBER_LID1,
    cardImage: `.${__dirname}Images/arun.jpg`,
  },
  {
    Profession: "SDE 2",
    Name: "Muskan Kalra",
    Company: " @Walmart",

    LinkedIn: HEADMEMBER_LID3,
    cardImage: `.${__dirname}Images/muskan.jpg`,
  },
  {
    Profession: "Software Engineer",
    Name: "Monika Rathore",
    Company: " @Microsoft",

    LinkedIn: HEADMEMBER_LID2,
    cardImage: `.${__dirname}Images/monika.jpg`,
  },
];
const IndustryPersona = () => {
  return (

<div className="mentor-container">
<div className="heading">{"engineerhub is equipped with skilled industrialists: "}</div>
<div className="texthire">{"Industry Personalities"}</div>
<div className="card-section">
  {industryMembers.map((member) => {
    return (
      <IdpCard
        mentorImage={member.cardImage}
        Profession={member.Profession}
        Name={member.Name}
        Company={member.Company}
       
        LinkedIn={member.LinkedIn}
      />
    );
  })}
</div>
</div>
  );
};

export default IndustryPersona;
