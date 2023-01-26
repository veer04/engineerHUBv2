import { useContext } from "react";
import "./CourseWrapper.css";
import Full from "./Full";
import { CourseContext } from "../../context/CourseContext";
// import { coursesData } from "../HomeCourses/Courses";

const CourseWrapper = ({ closeModal }) => {
  const { courseData } = useContext(CourseContext);

  return (
    <div className="container-hiring">
      <div className="heading">Explore Courses</div>
      <div className="texthire">
        engineerhub aims to provide several free courses to students to provide
        necessary material with utmost ease.
      </div>
      <div
        style={{ margin: "0px 35px 40px" }}
        className="d-flex row justify-content-evenly courses-cont"
      >
        {courseData.map((c, i) => {
          return (
            <Full
              key={i}
              id={i * 2}
              state={c}
              cardImage={c.posterUrl}
              courseTitle1={c.title}
              courseDescription={c.about.slice(0,327)}
              lastDate={c.updatedAt.slice(0, 10)}
              features={c.features}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseWrapper;
