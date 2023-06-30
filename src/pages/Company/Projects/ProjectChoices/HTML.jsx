import React, { useEffect, useState } from "react";
import ProjectCards from "../ProjectCards";
import "./HTML.css";
import { Bucket_URL } from "../../../../services/APIUtils";
import {
  controller ,
  getProjectData,

} from "../../../../services/APIConfig";
import { useParams } from "react-router-dom";
const HTML = () => {
  const bucket = `${Bucket_URL}frontend/company/`;
  const bucket2=`${Bucket_URL}frontend/global/`;
  // const projectId=useParams;
  const [project,setProject]= useState([]);
  useEffect(()=>
  {
    getProjectData(setProject);
   
    return ()=>{
      controller.abort();
    }
  },[project]);
  // const HTMLEntries = [
  //   {
  //     name: "Need a Professional Web Developer",
  //     img: `${bucket}hiringP.jpg`,
  //     desc: "We are seeking a talented web developer with extensive experience in website redesign to join our team. The successful candidate will be responsible for improving the look, feel, and functionality of our website to enhance user experience and increase website traffic.",
  //     organization: {
  //       name: "Buddypaws",
  //       logo: `${bucket}Buddypaws.png`,
  //       submissions: 100,
  //     },
  //     software: [],
  //     // prerequisites: [
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     // ],
  //     tags: ["JavaScript", "PHP", "HTML", "CSSWordPress", "WordPress Design", "Web Hosting","Web DesignSQL", "JQuery"],
  //     link: "https://www.remotehub.com/jobs/details/need-a-professional-web-developer-to-redesign-64515711edae3a425f4d4678",
  //     info: {
  //       salary: "$300 - $500 per project",
  //       availability: "2",
  //     },
  //     projectId: 1234,
  //   },
  //   {
  //     name: "java developer freelancer",
  //     img: `${bucket}hiringJavadev.jpg`,
  //     desc: "I am looking for experienced Java developers to work on a new web development project. The project will require the development of a completely new codebase. The ideal candidate will have experience in web development using Java and be able to work on this project for more than 3 months. The project will require the following skills Proficiency in Java programming language Experience in web development using Java Familiarity with web frameworks such as Spring, spring boot and micro services Knowledge of HTML, CSS, and JavaScript, Understanding of database systems such as MySQL or Oracle",
  //     organization: {
  //       name: "Praveen Thota",
  //       logo: `${bucket}Praveen.jpg`,
  //       submissions: 100,
  //     },
  //     software: ["Software Used", "Software Used"],
  //     // prerequisites: [
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     // ],
  //     tags: ["JavaScript" , "Java" , "CSS ", "React.js"],
  //     link: "https://www.remotehub.com/jobs/details/need-a-professional-web-developer-to-redesign-64515711edae3a425f4d46788",
  //     info: {
  //       salary: "5000",
  //       availability: "2",
  //     },
  //     projectId: 1234,
  //   },
  //   {
  //     name: "Personalized Internet Ads Assessor",
  //     img: `${bucket}hiringTelus.jpg`,
  //     desc: "Calling all Urdu speakers in India! Experience the ultimate fusion of flexibility and excitement with TELUS International AI Data Solutions. Join us as a Personalized Internet Ads Assessors and unlock the perfect work-life balance you've been dreaming of.Who is suitable for this work? We are looking for dynamic people who have strong communication skills and use the Internet daily. This is a freelance, independent contractor position. You will have the flexibility and freedom to work from your own home, working your own hours.",
  //     organization: {
  //       name: "Telus International",
  //       logo: `${bucket}Tellus.jpg`,
  //       submissions: 100,
  //     },
  //     software: ["Software Used", "Software Used"],
  //     // prerequisites: [
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     // ],
  //     tags: ["Machine Learning", "Artificial Intelligence", "Information Technology"],
  //     link: "https://www.remotehub.com/jobs/details/work-from-anywhere-option-personalized-648b095dedae3a3e32513c08",
  //     info: {
  //       salary: "5000",
  //       availability: "2",
  //     },
  //     projectId: 1234,
  //   },
  //   {
  //     name: "Customer Support Representative",
  //     img: `${bucket}CSRhiring.jpg`,
  //     desc: "We are looking for proactive, service-oriented people for full-time customer support positions. If you are comfortable interacting with customers by computer and pay close attention to details, then you may be a great fit for this role.",
  //     organization: {
  //       name: "Magic Inc.",
  //       logo: `${bucket}Magic.png`,
  //       submissions: 100,
  //     },
  //     software: ["Software Used", "Software Used"],
  //     // prerequisites: [
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     // ],
  //     tags: ["Customer Service" , "Customer Support" , "Communications" , "English"],
  //     link: "https://www.remotehub.com/jobs/details/customer-support-representative-6479a506edae3a0f0b42af3d",
  //     info: {
  //       salary: "5000",
  //       availability: "2",
  //     },
  //     projectId: 1234,
  //   },
  //   {
  //     name: "Game developer",
  //     img: `${bucket}gameDevHiring.jpg`,
  //     desc: "Hey, need to  create game on HTML5 CSS JS with 3 levels and background and speed change at every level User will get 3 coupons basis on the level they pass this game will be shown during the advertisements  for this we need a freelancer who can create a web app", organization: {
  //       name: "QAgile Services",
  //       logo: `${bucket}Qa.jpg`,
  //       submissions: 100,
  //     },
  //     software: ["Software Used", "Software Used"],
  //     // prerequisites: [
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     // ],
  //     tags: ["HTML", "CSS","JAVASCRIPT"],
  //     link: "https://www.remotehub.com/jobs/details/html-css-javascript-game-developer-64899691edae3a0a2928f79d",
  //     info: {
  //       salary: "$100 - $1,000 per project",
  //       availability: "2",
  //     },
  //     projectId: 1234,
  //   },
  //   {
  //     name: "Rig/Animation Artist",
  //     img: `${bucket}CRhiring.jpg`,
  //     desc: "Rigging characters, props, and environment assets for use in animation and visual effects Collaborating with animators, modelers, and other artists to ensure rigs meet production standards and creative goals Developing and implementing efficient rigging workflows and techniques Troubleshooting and problem-solving rigging issues throughout production  Creating and maintaining clear and comprehensive documentation of rigging processes and assets Staying up-to-date with industry trends and techniques in rigging and animation technology Managing and organizing rigging assets and files to ensure smooth production pipeline",
  //     organization: {
  //       name: "StylePhotos CA",
  //       logo: `${bucket}StylePhotos.jpg`,
  //       submissions: 100,
  //     },
  //     software: ["Software Used", "Software Used"],
  //     // prerequisites: [
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     //   "lorem ipsum dolor sit amet consectetur",
  //     // ],
  //     tags: ["MAYA", "3D-design"],
  //     link: "https://www.remotehub.com/jobs/details/riganimation-artist-647a1beaedae3a284d276af2",
  //     info: {
  //       salary: "5000",
  //       availability: "2",
  //     },
  //     projectId: 1234,
  //   },
  // ];
  return (
    <div className="HTML">
      {project?.map((entry, index) => {
        return <ProjectCards data={entry} key={index} />;
      })}
    </div>
  );
};

export default HTML;
