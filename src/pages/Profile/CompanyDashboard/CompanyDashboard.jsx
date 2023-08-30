import { useState } from "react";
import "./CompanyDashboard.css";
import "../Dashboard.css";
import { Instagram } from "@mui/icons-material";
import { BsArrowRight } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import coverImage from "./cover-image.png";
import banner from "./banner.png";
import default_profile_icon from "./default_profile_icon.png";
import { getUserImage } from "../../../features/User/UserDetails";
import { Bucket_URL } from "../../../services/APIUtils";
import JobCard from "../../../components/JobCard/JobCard";
import { useNavigate } from "react-router-dom";
import defaultPoster from "../../../assets/defaultPoster";

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const [viewMore, setViewMore] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [activityChoice, setActivityChoice] = useState("jobs");
  const [isBannerPresent, setIsBannerPresent] = useState(true);
  const [isLogoPresent, setIsLogoPresent] = useState(true);
  const [isDescriptionPresent, setIsDescriptionPresent] = useState(true);
  const [isJobsPresent, setIsJobsPresent] = useState(true);
  const logo = defaultPoster; // later fetch from api
  const bucket = `${Bucket_URL}frontend/hosting/`;

  const jobDetails = [
    {
      logo: logo,
      isServiceOn: true,
      title: "Business Development Sales Representative",
      location: "Delhi, India",
      time: "3 Days ago",
      views: 1000,
    },
    {
      logo: logo,
      isServiceOn: true,
      title: "Business Development Sales Representative",
      location: "Delhi, India",
      time: "3 Days ago",
      views: 1000,
    },
    {
      logo: logo,
      isServiceOn: true,
      title: "Business Development Sales Representative",
      location: "Delhi, India",
      time: "3 Days ago",
      views: 1000,
    },
    {
      logo: logo,
      isServiceOn: true,
      title: "Business Development Sales Representative",
      location: "Delhi, India",
      time: "3 Days ago",
      views: 1000,
    },
    {
      logo: logo,
      isServiceOn: true,
      title: "Business Development Sales Representative",
      location: "Delhi, India",
      time: "3 Days ago",
      views: 1000,
    },
    {
      logo: logo,
      isServiceOn: true,
      title: "Business Development Sales Representative",
      location: "Delhi, India",
      time: "3 Days ago",
      views: 1000,
    },
    {
      logo: logo,
      isServiceOn: true,
      title: "Business Development Sales Representative",
      location: "Delhi, India",
      time: "3 Days ago",
      views: 1000,
    },
    {
      logo: logo,
      isServiceOn: true,
      title: "Business Development Sales Representative",
      location: "Delhi, India",
      time: "3 Days ago",
      views: 1000,
    },
  ];

  const eyeSvg = (
    <svg
      width="19"
      height="14"
      viewBox="0 0 19 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 6.97656C1 6.97656 3.98828 1 9.21777 1C14.4473 1 17.4355 6.97656 17.4355 6.97656C17.4355 6.97656 14.4473 12.9531 9.21777 12.9531C3.98828 12.9531 1 6.97656 1 6.97656Z"
        stroke="black"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9C10.1046 9 11 8.10457 11 7C11 5.89543 10.1046 5 9 5C7.89543 5 7 5.89543 7 7C7 8.10457 7.89543 9 9 9Z"
        stroke="black"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const arrowSvg = (
    <svg
      width="26"
      height="16"
      viewBox="0 0 26 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8L25 8"
        stroke="#8A8A8A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 1L25 8L18 15"
        stroke="#8A8A8A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const scrollLeft = () => {
    const carousel = document.querySelector(".carousel");
    carousel.scrollLeft -= 200;
  };
  const scrollRight = () => {
    const carousel = document.querySelector(".carousel");
    carousel.scrollLeft += 200;
  };

  return (
    <div className="profile-dashboard">
      <h1 className="title">Profile</h1>
      <h2 className="subheading">
        Lorem ipsum dolor sit amet consectetur. Mattis aliquam sodales faucibus
        platea feugiat odio.
      </h2>
      <section className="details-container">
        <div className="cover">
          {isBannerPresent && (
            <img className="cover-image" src={coverImage} alt="Cover Image" />
          )}
          {!isBannerPresent && (
            <div className="no-cover-overlay empty-container">
              <MdAddCircle />
              <p>Click here to add your Banner Image.</p>
            </div>
          )}
          {isBannerPresent && (
            <button className="edit-option">
              <FiEdit />
            </button>
          )}
          <div className="logo">
            {isLogoPresent && <img src={logo} alt="Profile Picture" />}
            {!isLogoPresent && (
              <img src={default_profile_icon} alt="Profile Picture" />
            )}
          </div>
        </div>
        <div className="details">
          <div className="upper-container">
            <div className="left-container">
              <div>
                <h1 className="text-crop-1 overflow-hidden">Google</h1>
                <h2 className="text-crop-1 overflow-hidden">
                  Changing the world with AI
                </h2>
                <div>
                  <h3 className="text-crop-1 overflow-hidden">
                    Software Development
                  </h3>
                  <h3>•</h3>
                  <h3 className="text-crop-1 overflow-hidden">India</h3>
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
              <button className="edit-btn">Edit Profile</button>
            </div>
          </div>
          <div className="lower-container">
            <p className="heading">ABOUT US</p>
            {isDescriptionPresent && (
              <span
                className={`content ${
                  viewMore ? "no-text-crop" : "text-crop-4"
                } `}
              >
                Lorem ipsum dolor sit amet consectetur. Faucibus sed nibh
                adipiscing odio hendrerit lectus. Orci pellentesque aliquet
                vitae convallis a ornare nunc blandit suspendisse. Nisi augue
                risus tellus vel lacus commodo etiam mattis vitae. Pellentesque
                massa adipiscing nisl blandit. Faucibus vehicula magna lorem in
                est massa. Etiam eu tristique fringilla mi pharetra non a enim
                eget. Tincidunt urna vulputate egestas pretium loremLorem ipsum
                dolor sit amet consectetur. Faucibus sed nibh adipiscing odio
                hendrerit lectus. Orci pellentesque aliquet vitae convallis a
                ornare nunc blandit suspendisse. Nisi augue risus tellus vel
                lacus commodo etiam mattis vitae. Pellentesque massa adipiscing
                nisl blandit. Faucibus vehicula magna lorem in est massa. Etiam
                eu tristique fringilla mi pharetra non a enim eget. Tincidunt
                urna vulputate egestas pretium lorem
              </span>
            )}
            {!isDescriptionPresent && (
              <p className="no-description">
                Click here to add your Description.
              </p>
            )}
            {isDescriptionPresent && !viewMore && (
              <div onClick={() => setViewMore(true)} className="view-more">
                View More
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="recent-activities">
        <p className="heading">RECENT ACTIVITIES</p>
        <div className="tags-container">
          <button
            onClick={() => setActivityChoice("jobs")}
            className={`tag ${activityChoice === "jobs" ? "--is-active" : ""}`}
          >
            Jobs
          </button>
          <button
            onClick={() => setActivityChoice("internships")}
            className={`tag ${
              activityChoice === "internships" ? "--is-active" : ""
            }`}
          >
            Internships
          </button>
          <button
            onClick={() => setActivityChoice("hackathons")}
            className={`tag ${
              activityChoice === "hackathons" ? "--is-active" : ""
            }`}
          >
            Hackathons
          </button>
          <button
            onClick={() => setActivityChoice("projects")}
            className={`tag ${
              activityChoice === "projects" ? "--is-active" : ""
            }`}
          >
            Projects
          </button>
        </div>
        <div className="carousel-container">
          {isJobsPresent && !showAllJobs && (
            <button onClick={scrollLeft} className="arrow arrow-left">
              <AiOutlineLeft />
            </button>
          )}
          {isJobsPresent && (
            <div className={`${showAllJobs ? "carousel-grid" : "carousel"}`}>
              {jobDetails.map((jobDetail, index) => (
                <JobCard key={index} {...jobDetail} />
              ))}
            </div>
          )}
          {!isJobsPresent && (
            <div className="no-jobs empty-container">
              <MdAddCircle />
              <p>No Jobs to Show</p>
            </div>
          )}
          {isJobsPresent && !showAllJobs && (
            <button onClick={scrollRight} className="arrow arrow-right">
              <AiOutlineRight />
            </button>
          )}
        </div>
        {isJobsPresent && !showAllJobs && (
          <div className="btn-container">
            <button
              onClick={() => setShowAllJobs(true)}
              className="all-jobs-btn"
            >
              Show all jobs <BsArrowRight />
            </button>
          </div>
        )}
      </section>
      <section className="recruit-container">
        <p className="heading">RECRUIT THE BEST FOR YOU</p>
        <div className="cards">
          <div
            // onClick={() => navigationOrganization("job")}
            style={{
              backgroundImage: `url(${bucket}jobs.png)`,
            }}
            className="card"
          >
            <div className="heading">Jobs</div>
            <div className="subheading">
              Create Jobs <BsArrowRight />
            </div>
          </div>
          {/* </Link>
          <Link to="/hostevent"> */}
          <div
            // onClick={() => navigationOrganization("internship")}
            style={{
              backgroundImage: `url(${bucket}internships.png)`,
            }}
            className="card"
          >
            <div className="heading">Internships</div>
            <div className="subheading">
              Create Jobs <BsArrowRight />
            </div>
          </div>
          <div
            // onClick={navigationFunction}
            style={{
              backgroundImage: `url(${bucket}hackathon.png)`,
            }}
            className="card"
          >
            <div className="heading">Hackathon</div>
            <div className="subheading">
              Create Event <BsArrowRight />
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          backgroundImage: `url(${banner})`,
        }}
        className="promotion-container"
      >
        <div className="left-container">
          <p>Sponsor your event to make your reach</p>
          <button>Connect with us</button>
        </div>
        <div className="right-container">
          <JobCard {...jobDetails[0]} />
          <div className="blur"></div>
          <div onClick={() => navigate("/under-maintenance")} className="boost">
            Boost your Event !!
          </div>
          <div className="boosted-stats-container">
            <span className="time">3 Days ago</span>
            <span className="views">
              {eyeSvg} {jobDetails[0]?.views * 5} views
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
