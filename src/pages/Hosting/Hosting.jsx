import React, { useState, useEffect } from "react";
import "./Hosting.css";
import { Bucket_URL } from "../../services/APIUtils";
import { BsArrowRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useNavbar from "../../hooks/use-navbar";
export default function Hosting() {
  const handleCardClick = (event) => {
    localStorage.setItem("event", event);

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
    localStorage.setItem("event", event);
  };

  const { setSelectedPageNavbar } = useNavbar();
  useEffect(() => {
    setSelectedPageNavbar("hosting");
  }, []);
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
  const navigationOrganization = (type) => {
    if (val === 1) {
      const decoded = jwt_decode(token);
      console.log(decoded);
      console.log(decoded.role);
      const storedValue = localStorage.getItem("event");
      if (decoded.role === "Organization") {
        navigate(`/host/${type}`);
      } else {
        window.alert("Not Authorized to Host events!!!");
      }
    } else {
      navigate("/login");
    }
  };

  const navigationClub = () => {
    if (val === 1) {
      const decoded = jwt_decode(token);
      console.log(decoded);
      console.log(decoded.role);
      const storedValue = localStorage.getItem("event");
      if (decoded.role === "Club") {
        navigate("/hostevent");
      } else {
        window.alert("Not Authorized to Host events!!!");
      }
    } else {
      navigate("/login");
    }
  };
  const navigationFunction = () => {
    if (val === 1) {
      const decoded = jwt_decode(token);
      console.log(decoded);
      console.log(decoded.role);
      if (
        decoded.role === "Organization" ||
        decoded.role === "Alumni" ||
        decoded.role === "Club"
      ) {
        navigate("/hostevent");
      } else {
        window.alert("Not Authorized to Host events!!!");
      }
    } else {
      navigate("/login");
    }
  };

  return (
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
          {/* <Link to="/hostevent"> */}
          <div
            onClick={navigationClub}
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
          {/* <Link to="/hostevent"> */}
          <div
            onClick={navigationClub}
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
          {/* <Link to="/hostevent"> */}
          <div
            onClick={navigationFunction}
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
          <Link to="/hostevent"> */}
          <div
            onClick={navigationFunction}
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
          {/* <Link to="/hostevent"> */}
          <div
            onClick={() => navigationOrganization("job")}
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
            onClick={() => navigationOrganization("internship")}
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
            onClick={() => navigationOrganization("project")}
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
          {/* </Link>
          <Link to="/hostevent"> */}
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
  );
}
