import React, { useEffect, useState } from "react";
import "./CampusDetails.css";
import { useParams } from "react-router-dom";
import CategoryBar from "../../../components/CategoryBar/CategoryBar";
import { controller, getCampusById } from "../../../services/APIConfig";

export default function CampusDetails({ path }) {
  const { collegeId } = useParams();
  const [campus, setCampus] = useState(
    sessionStorage.getItem(`${collegeId} campus`)
      ? JSON.parse(sessionStorage.getItem(`${collegeId} campus`))
      : {}
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (campus === {}) {
      getCampusById(setCampus, collegeId);
      console.log("data fetched");
    }
    console.log(campus);
    return () => {
      controller.abort();
    };
  }, [collegeId]);

  const [current, setCurrent] = useState(1);

  const courseDetails = [
    {
      _id: 1,
      name: "B.E/B.Tech",
      longName: "B.Tech in Computer Science and Engineering",
      duration: "4 years",
      fees: "₹ 1,00,000",
      seats: "100",
      link: "https://react-icons.github.io/react-icons",
    },
    {
      _id: 2,
      name: "B.E/B.Tech",
      longName: "B.Tech in Computer Science",
      duration: "4 years",
      fees: "₹ 1,00,000",
      seats: "100",
      link: "www.google.com",
    },
    {
      _id: 3,
      name: "B.E/B.Tech",
      longName: "B.Tech in Computer Science",
      duration: "4 years",
      fees: "₹ 1,00,000",
      seats: "100",
      link: "www.google.com",
    },
    {
      _id: 4,
      name: "B.E/B.Tech",
      longName: "B.Tech in Computer Science",
      duration: "4 years",
      fees: "₹ 1,00,000",
      seats: "100",
      link: "www.google.com",
    },
    {
      _id: 5,
      name: "B.E/B.Tech",
      longName: "B.Tech in Computer Science",
      duration: "4 years",
      fees: "₹ 1,00,000",
      seats: "100",
      link: "www.google.com",
    },
  ];

  return (
    <div className="campus-details-page">
      {/* <div className="category-bar-container"> */}
      <CategoryBar
        className="category-bar"
        categories={[
          { id: 1, title: "Overview" },
          { id: 2, title: "Admissions" },
          { id: 3, title: "Placements" },
          { id: 4, title: "Reviews" },
          { id: 5, title: "QnA" },
        ]}
        current={current}
        setCurrent={setCurrent}
      />
      {/* </div> */}
      <div className="about">
        <div className="heading">About College</div>
        <div className="description">{campus.aboutUs}</div>
      </div>
      <div className="course-details">
        <div className="heading">Courses & Fees</div>
        <div className="subheading">Explore Courses</div>
        <div className="courses">
          {courseDetails.map((course) => (
            <div key={course._id} className="course">
              {course.name}
            </div>
          ))}
        </div>
        <div className="subheading">Explore Fees Structure</div>
        <div className="course-structure__container">
          {courseDetails.map((course) => (
            <div key={course._id} className="course-structure">
              <div className="row-1">
                <div className="title">{course.longName}</div>
                <a href={course.link} target="_blank">
                  <div className="brochure">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 9.66797V12.5569C14 12.9399 13.8478 13.3073 13.5769 13.5782C13.306 13.8491 12.9386 14.0013 12.5556 14.0013H2.44444C2.06135 14.0013 1.69395 13.8491 1.42307 13.5782C1.15218 13.3073 1 12.9399 1 12.5569V9.66797"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.88867 6.05469L7.49978 9.6658L11.1109 6.05469"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.5 9.66667V1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Brochure
                  </div>
                </a>
              </div>
              <div className="row-2">
                <div>Duration: {course.duration}</div>
                <div>Fees: {course.fees}</div>
                <div>Seats: {course.seats}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cutoff">
        <div className="heading">Cut-offs</div>
        <div className="selection">
          <div>
            <div className="subheading">Domain</div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Engineering and Architecture
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="subheading">Years</div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                4 Years
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="heading">Cutoff for academic year 2021</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Domain</th>
              <th scope="col">Opening Rank</th>
              <th scope="col">Closing Rank</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">B.Tech in Electrical Engineering</td>
              <td>123</td>
              <td>650</td>
            </tr>
            <tr>
              <td scope="row">B.Tech in Electrical Engineering</td>
              <td>135</td>
              <td>648</td>
            </tr>
            <tr>
              <td scope="row">B.Tech in Electrical Engineering</td>
              <td>265</td>
              <td>654</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
