import React, { useState, useEffect } from "react";
import "./Hosting.css";
import { Bucket_URL } from "../../services/APIUtils";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useNavbar from "../../hooks/use-navbar";
import { getUserRole, isUserLoggedIn } from "../../features/User/UserDetails";
import { redirectToAuth } from "../../features/redirectToAuth";
import { SEO } from "../../components/SEO/SEO.jsx";
export default function Hosting() {
  const handleCardClick = (event) => {
    sessionStorage.setItem("event", event);

    let value;
    switch (event) {
      case "Cultural":
        value = "Cultural";
        break;
      case "Technical":
        value = "Technical";
        break;
      case "Webinar":
        value = "Webinar";
        break;
      case "Hackathon":
        value = "Hackathon";
        break;
      case "Job":
        value = "Job";
        break;
      case "Internship":
        value = "Internship";
        break;
      default:
        value = "";
    }
    sessionStorage.setItem("event", event);
  };

  const { setSelectedPageNavbar } = useNavbar();
  useEffect(() => {
    setSelectedPageNavbar("host");
  }, [setSelectedPageNavbar]);
  const navigate = useNavigate();
  const bucket = `${Bucket_URL}frontend/hosting/`;

  const [val, setVal] = useState(0);
  const [token, setToken] = useState("");
  function getCookie(name) {
    // Get the value of a cookie by name
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    setToken(getCookie("access_token"));
    if (token) setVal(1);
  });
  // const navigationOrganization = (type) => {
  //   if (val === 1) {
  //     const decoded = jwt_decode(token);
  //     console.log(decoded);
  //     console.log(decoded.role);
  //     const storedValue = localStorage.getItem("event");
  //     if (decoded.role === "Organization") {
  //       navigate(`/host/${type}`);
  //     } else {
  //       if (type === "job" || type === "internship")
  //         window.alert("Not authorized to host job/internship opportunities");
  //       else if (type === "project")
  //         window.alert("Not authorized to host projects");
  //       else window.alert("Not authorized to perform this action");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // const navigationClub = () => {
  //   if (val === 1) {
  //     const decoded = jwt_decode(token);
  //     console.log(decoded);
  //     console.log(decoded.role);
  //     const storedValue = localStorage.getItem("event");
  //     if (decoded.role === "Club") {
  //       navigate("/host/event");
  //     } else {
  //       window.alert("Not authorized to host events!!!");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // };
  // const navigationFunction = () => {
  //   if (val === 1) {
  //     const decoded = jwt_decode(token);
  //     console.log(decoded);
  //     console.log(decoded.role);
  //     if (
  //       decoded.role === "Organization" ||
  //       decoded.role === "Alumni" ||
  //       decoded.role === "Club"
  //     ) {
  //       navigate("/host/event");
  //     } else {
  //       window.alert("Not authorized to host events!!!");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // };

  function handleClick(hosting) {
    //check if user is logged in
    if (!isUserLoggedIn()) {
      redirectToAuth("/login");
      return;
    }
    //check the type of hosting then its role
    if (hosting === "event") {
      if (getUserRole() === "User") {
        window.alert("You are not authorized to host events");
        return;
      }
      navigate("/host/event");
    }
    if (hosting === "job") {
      if (getUserRole() === "User" || getUserRole() === "Club") {
        window.alert(
          "You are not authorized to host job/internship opportunities"
        );
        return;
      }
      navigate("/host/job");
    }
    if (hosting === "internship") {
      if (getUserRole() === "User" || getUserRole() === "Club") {
        window.alert(
          "You are not authorized to host job/internship opportunities"
        );
        return;
      }
      navigate("/host/internship");
    }
    if (hosting === "project") {
      if (getUserRole() === "User" || getUserRole() === "Club") {
        window.alert("You are not authorized to host projects");
        return;
      }
      navigate("/host/project");
    }
  }

  return (
    <SEO
      title="Host Jobs, Events & Challenges | engineerHUB"
      description="Use engineerHUB to host jobs, internships, hackathons, and campus events with instant access to vetted candidates and community amplification."
      keywords={[
        "host jobs",
        "campus hiring",
        "hackathon hosting",
        "employer branding",
        "engineerhub events",
      ]}
    >
      <div className="hosting-page">
      <h1 className="heading-3">Host an Opportunity</h1>
      <h2 className="subheading-1">
        Get one-click rated candidates and participants for the challenges.
      </h2>
      <div className="box-container">
        <div className="heading">
          For <span>Engaging</span> your target audience
        </div>
        <div className="cards ">
          {/* <Link to="/host/event"> */}
          <div
            onClick={() => navigate("/host/cultural-event")}
            style={{
              backgroundImage: `url(${bucket}cultural_event.png)`,
            }}
            className="card"
          >
            <div className="heading">Cultural Event</div>
            <div className="subheading">
              Create Event <BsArrowRight />
            </div>
          </div>
          {/* </Link> */}
          {/* <Link to="/host/event"> */}
          <div
            onClick={() => navigate("/host/technical-event")}
            style={{
              backgroundImage: `url(${bucket}technical_event.png)`,
            }}
            className="card"
          >
            <div className="heading">Technical Event</div>
            <div className="subheading">
              Create Event <BsArrowRight />
            </div>
          </div>
          {/* </Link> */}
          {/* <Link to="/host/event"> */}
          <div
            onClick={() => navigate("/host/hackathon")}
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
          {/* </Link>
          <Link to="/host/event"> */}
          <div
            onClick={() => navigate("/host/webinar")}
            style={{
              backgroundImage: `url(${bucket}webinar.png)`,
            }}
            className="card"
          >
            <div className="heading">Webinar</div>
            <div className="subheading">
              Create Event <BsArrowRight />
            </div>
          </div>
          {/* </Link> */}
        </div>
      </div>
      <div className="box-container">
        <div className="heading">
          Create <span>Jobs</span> for the right talent
        </div>
        <div className="cards">
          {/* <Link to="/host/event"> */}
          <div
            onClick={() => handleClick("job")}
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
          <Link to="/host/event"> */}
          <div
            onClick={() => handleClick("internship")}
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
            onClick={() => navigate("/host/project")}
            style={{
              backgroundImage: `url(${bucket}project.png)`,
            }}
            className="card"
          >
            <div className="heading">Projects</div>
            <div className="subheading">
              Host Projects <BsArrowRight />
            </div>
          </div>
          <div
            onClick={() => navigate("/host/event-hiring")}
            style={{
              backgroundImage: `url(${bucket}hackathon.png)`,
            }}
            className="card"
          >
            <div className="heading">Event Hiring</div>
            <div className="subheading">
              Create Event <BsArrowRight />
            </div>
          </div>
          {/* </Link>
          <Link to="/host/event"> */}
          {/* <div
            onClick={navigationOrganization}
            style={{
              backgroundImage: `url(${bucket}challenges.png)`,
            }}
            className="card"
          >
            <div className="heading">Challenges</div>
            <div className="subheading">
              Create Jobs <BsArrowRight />
            </div>
          </div> */}
          {/* </Link> */}
        </div>
      </div>
      </div>
    </SEO>
  );
}
