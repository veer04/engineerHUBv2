import React, { useEffect } from "react";
import "./ParticularAlumni.css";
import AlumniLocalCard from "../../../components/AlumniLocalCard/AlumniLocalCard";
import { Bucket_URL } from "../../../services/APIUtils";

export default function ParticularAlumni() {
  const bucket = `${Bucket_URL}frontend/campus/particularcampus/particularalma/`;
  const instagramPng = `${bucket}instagram.png`;
  const twitterPng = `${bucket}twitter.png`;
  const linkedinPng = `${bucket}linkedin.png`;
  //function to find out current height of details-container

  // useEffect(() => {
  //   const findHeight = () => {
  //     const detailsContainer = document.querySelector(".details-container");
  //     const height = detailsContainer.offsetHeight;
  //     return height;
  //   };
  // }, []);
  return (
    <div className="particular-alumni-page">
      <div className="alumni-list">
        <AlumniLocalCard />
        <AlumniLocalCard />
        <AlumniLocalCard />
        <AlumniLocalCard />
      </div>
      <div className="details-container">
        <div className="section info-container">
          <div className="batch-lg-container">
            <div className="batch">
              Batch <span>- 2015</span>
            </div>
            <div className="socials">
              <img src={instagramPng} alt="instagram" />
              <img src={twitterPng} alt="twitter" />
              <img src={linkedinPng} alt="linkedin" />
            </div>
          </div>
          <div className="personal-info">
            <div
              style={{
                backgroundImage: `url(${bucket}instagram.png)`,
              }}
              className="image"
            ></div>
            <div className="info">
              <div className="name">Karan Veer Singh</div>
              <div className="designation">Company, Job Position</div>
              <div className="batch-md">
                Batch <span>- 2015</span>
              </div>
            </div>
            {/* <div className="options-container">
              <button className="message">Message</button>
            </div> */}
          </div>
        </div>
        <div className="section socials-container">
          <div className="title">Socials</div>
          <div className="socials">
            <img src={instagramPng} alt="instagram" />
            <img src={twitterPng} alt="twitter" />
            <img src={linkedinPng} alt="linkedin" />
          </div>
        </div>

        <div className="section about-container">
          <div className="title">About Me</div>
          <div className="about">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consectetur, quisquam. Neque ratione eligendi atque dicta nam
            aperiam officia quidem excepturi, fugit, obcaecati adipisci sapiente
            nemo. Suscipit, animi nihil repellendus dolor perferendis ipsam
            similique tempore. Accusantium veritatis ullam repudiandae
            distinctio ad dolorum, id ab minus beatae magnam nobis harum impedit
            qui.
          </div>
        </div>
        <div className="section connect-container">
          <div className="title">Connect with Mentor</div>
          <div className="connect">
            <div className="connect-card">
              <div className="title">1-on-1 Mentorship</div>
              <div className="info">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
                doloremque.
              </div>
            </div>
            <div className="connect-card">
              <div className="title">Resume Review</div>
              <div className="info">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
                doloremque.
              </div>
            </div>
            <div className="connect-card">
              <div className="title">Webinars</div>
              <div className="info">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
                doloremque.
              </div>
            </div>
            <div className="connect-card">
              <div className="title">Courses</div>
              <div className="info">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi,
                doloremque.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
