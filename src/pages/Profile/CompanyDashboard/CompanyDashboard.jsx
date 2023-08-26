import React from "react";
import "./CompanyDashboard.css";
import { Instagram } from "@mui/icons-material";
import { BsArrowRight } from "react-icons/bs";

export default function CompanyDashboard() {
  return (
    <div className="profile-dashboard">
      <h1 className="heading">Profile</h1>
      <h2 className="subheading">
        Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus
        platea feugiat odio.
      </h2>
      <section className="details-container">
        <div className="cover">
          <button className="edit-option">edit icon</button>
          <div className="logo"></div>
        </div>
        <div className="details">
          <div className="upper-container">
            <div className="left-container">
              <div>
                <h1>Google</h1>
                <h2>Changing the world with AI</h2>
                <div>
                  <h3>Software Development</h3>
                  <h3>{`• India`}</h3>
                </div>
              </div>
            </div>
            <div className="right-container">
              <div className="socials">
                <div>
                  <Instagram />
                </div>
                <div>
                  <Instagram />
                </div>
                <div>
                  <Instagram />
                </div>
              </div>
              <button className="edit-b">Edit Profile</button>
            </div>
          </div>
          <div className="lower-container">
            <p className="heading">ABOUT US</p>
            <span className="content">
              Lorem ipsum dolor sit amet consectetur. Faucibus sed nibh
              adipiscing odio hendrerit lectus. Orci pellentesque aliquet vitae
              convallis a ornare nunc blandit suspendisse. Nisi augue risus
              tellus vel lacus commodo etiam mattis vitae. Pellentesque massa
              adipiscing nisl blandit. Faucibus vehicula magna lorem in est
              massa. Etiam eu tristique fringilla mi pharetra non a enim eget.
              Tincidunt urna vulputate egestas pretium lorem....View more
            </span>
          </div>
        </div>
      </section>
      <section className="recent-activities">
        <p className="heading">RECENT ACTIVITIES</p>
        <div className="tags-container">
          <button className="tag">Jobs</button>
          <button className="tag">Internships</button>
          <button className="tag">Hackathons</button>
          <button className="tag">Projects</button>
        </div>
        <div className="carousel-container">
          <div className="arrow-container">
            <button className="arrow">Left</button>
          </div>
          <div className="carousel">
            <div className="job-card">
              <div className="header">
                <div className="logo"></div>
                <div className="tag-container">
                  <div className="tag">Hiring Now</div>
                </div>
              </div>
              <p className="title">Business Development Sales Representative</p>
              <p className="location">Location : Delhi, India</p>
              <button className="applicants-btn">View Applicants</button>
              <div className="stats-container">
                <span className="time">3 Days ago</span>
                <span className="views">1000 views</span>
              </div>
            </div>
            <div className="job-card">
              <div className="header">
                <div className="logo"></div>
                <div className="tag-container">
                  <div className="tag">Hiring Now</div>
                </div>
              </div>
              <p className="title">Business Development Sales Representative</p>
              <p className="location">Location : Delhi, India</p>
              <button className="applicants-btn">View Applicants</button>
              <div className="stats-container">
                <span className="time">3 Days ago</span>
                <span className="views">1000 views</span>
              </div>
            </div>
            <div className="job-card">
              <div className="header">
                <div className="logo"></div>
                <div className="tag-container">
                  <div className="tag">Hiring Now</div>
                </div>
              </div>
              <p className="title">Business Development Sales Representative</p>
              <p className="location">Location : Delhi, India</p>
              <button className="applicants-btn">View Applicants</button>
              <div className="stats-container">
                <span className="time">3 Days ago</span>
                <span className="views">1000 views</span>
              </div>
            </div>
          </div>
          <div className="arrow-container">
            <button className="arrow">Right</button>
          </div>
        </div>
        <button className="all-jobs">Show all jobs</button>
      </section>
      <section className="recruit-container">
        <div
          style={{
            // backgroundImage: `url(${bucket}cultural_event.png)`,
          }}
          className="recruit-card"
        >
          <div className="heading">Cultural Event</div>
          <div className="subheading">
            Create Event <BsArrowRight />
          </div>
        </div>
      </section>
      <section className="promotion-container">
        <div className="left-container">
          <p>Sponsor your event to make your reach</p>
          <button>Connect with us</button>
        </div>
        <div className="right-container">
          <div className="job-card">
            <div className="header">
              <div className="logo"></div>
              <div className="tag-container">
                <div className="tag">Hiring Now</div>
              </div>
            </div>
            <p className="title">Business Development Sales Representative</p>
            <p className="location">Location : Delhi, India</p>
            <button className="applicants-btn">View Applicants</button>
            <div className="stats-container">
              <span className="time">3 Days ago</span>
              <span className="views">1000 views</span>
            </div>
          </div>
          <div className="blur"></div>
          <div className="boost">Boost your Event !!</div>
          <div className="boosted-stats-container">
            <span className="time">3 Days ago</span>
            <span className="views">1000 views</span>
          </div>
        </div>
      </section>
    </div>
  );
}
