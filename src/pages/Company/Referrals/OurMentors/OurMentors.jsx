import React from "react";
import "./ourmentors.css";
import { Bucket_URL } from "../../../../services/APIUtils";
import MentorCard from "./MentorCard/MentorCard";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../PromoteServices/emblaCarousalArrowButton";

const MentorData = [
  {
    position: "Mentor",
    name: "Kunwar Vidya Niwas",
    desc: " Founding Member @engineerHUB ,helping Engineers craft impact-driven resumes, provide referrals , and unlock real interview opportunities-practical, strategic, and results-focused.",
    totalSession: "345 +  ",
    totalSessionHours: " 650 +",
    studentsMentored: "800 +",
    linkedinLink: "https://www.linkedin.com/in/yogeshyogendra-26bbb518a/",
    mentorImage: `${Bucket_URL}Mentors/kunwar1.png`,
    companyLogo: `${Bucket_URL}EHub_Logo.jpeg`,
  },
  {
    position: "Mentor",
    name: "Yogesh Yogendra ",
    desc: "Currently, working as  SDE-1 @ Amazon, I have worked as an Educator with Unacademy, Codechef,and Newton School and taught more than 50,000+ students.",
    totalSession: " 60 +",
    totalSessionHours: "35 +",
    studentsMentored: "20 +",
    linkedinLink: "https://www.linkedin.com/in/rishabhsingh11/",
    mentorImage: `${Bucket_URL}Mentors/yogesh_image1.png`,
    companyLogo: `${Bucket_URL}Mentors/amazon1.png`,
  },
  {
    position: "Mentor",
    name: "Rishabh Singh",
    desc: "Co-founder @engineerHUB ,helped 800+ companies with their candidate hiring .",
    totalSession: "220 +",
    totalSessionHours: "296 +",
    studentsMentored: "175 +",
    linkedinLink: "https://www.linkedin.com/in/rishabhsingh11/",
    mentorImage: `${Bucket_URL}Mentors/rishabh1.png`,
    companyLogo: `${Bucket_URL}EHub_Logo.jpeg`,
  },
  {
    position: "Mentor",
    name: "Shafi Khan",
    desc: "Currently, working as  SDE-2 @Dezerv ,A techie with a zeal for guiding developers to solve real-world problems!,I have a keen interest in developing products that can make a beneficial impact on the world!",
    totalSession: "10 +",
    totalSessionHours: " 24 +",
    studentsMentored: "9 +",
    linkedinLink: "https://www.linkedin.com/in/shafi-khan-/",
    mentorImage: `${Bucket_URL}Mentors/shafi1.png`,
    companyLogo: `${Bucket_URL}Mentors/deserve.png`,
  },
];

const OurMentors = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 1,
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="our-mentors-main">
      <h4 className="h4-our-mentor">Our Instructor</h4>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container1">
          {MentorData &&
            MentorData.map((mentor, index) => (
              <div className="embla__slide" key={mentor.name}>
                <MentorCard data={mentor} index={index} />
              </div>
            ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            gap: 20,
          }}
        >
          <div>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          </div>

          <div>
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMentors;
