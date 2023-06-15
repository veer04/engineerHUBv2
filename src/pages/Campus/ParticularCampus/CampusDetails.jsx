import React, { useEffect, useState } from "react";
import "./CampusDetails.css";
import { useParams } from "react-router-dom";
import CategoryBar from "../../../components/CategoryBar/CategoryBar";
import { controller, getCampusById } from "../../../services/APIConfig";
import useNavbar from "../../../hooks/use-navbar";

export default function CampusDetails({ path }) {
  const { setSelectedPageNavbar } = useNavbar();

  const { collegeId } = useParams();
  const [campus, setCampus] = useState(
    sessionStorage.getItem(`${collegeId} campus`)
      ? JSON.parse(sessionStorage.getItem(`${collegeId} campus`))
      : {}
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (campus === null) {
      getCampusById(setCampus, collegeId);
    }
    setSelectedPageNavbar("campus");

    return () => {
      controller.abort();
    };
  }, [collegeId]);

  const [current, setCurrent] = useState(1);

  //function to filter courses name from campus data
  const filterCourses = (campus) => {
    let courses = [];
    if (campus.feesCourses) {
      campus.feesCourses.forEach((course) => {
        //add only unique courses
        if (!courses.includes(course.courseField))
          courses.push(course.courseField);
      });
    }
    return courses;
  };

  const downloadSvg = (
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
  );

  return (
    <div className="campus-details-page">
      {/* <div className="category-bar-container"> */}
      {/* <CategoryBar
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
      /> */}
      {/* </div> */}
      <div className="about">
        <div className="heading">About College</div>
        <div className="description">{campus.aboutUs}</div>
      </div>
      <div className="course-details">
        <div className="heading">Courses & Fees</div>
        <div className="subheading">Explore Courses</div>
        <div className="courses">
          {filterCourses(campus).map((course) => (
            <div key={course} className="course">
              {course}
            </div>
          ))}
        </div>
        <div className="subheading">Explore Fees Structure</div>
        <div className="course-structure__container">
          {campus &&
            campus.feesCourses.map((course) => (
              <div key={course._id} className="course-structure">
                <div className="row-1">
                  <div className="title">
                    {course.branch} in {course.courseField}
                  </div>
                  <a href={course.Brochure} target="_blank">
                    <div className="brochure">{downloadSvg}Brochure</div>
                  </a>
                </div>
                <div className="row-2">
                  <div>Duration: {course.courseDuration}</div>
                  <div>Fees: {course.totalFees}</div>
                  <div>Seats: {course.availableSeat}</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <div className="cutoff">
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
                Select Domain
              </button>
              <ul className="dropdown-menu">
                {filterCourses(campus).map((course) => (
                  <li key={course}>
                    <a className="dropdown-item" href="#">
                      {course}
                    </a>
                  </li>
                ))}
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
      </div> */}
    </div>
  );
}
