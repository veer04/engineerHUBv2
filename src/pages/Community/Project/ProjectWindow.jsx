import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { getProjectById } from "../../../services/APIConfig";
import Loading from "../../../components/Loader/Loading";

export default function ProjectWindow() {
  const { id, projectId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({});
  const [project, setProject] = useState({});
  const [handleHeight] = useOutletContext();

  if (!!!projectId) {
    return;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getProjectById(setProjectData, projectId);

    return () => {
      setProjectData({});
    };
  }, [projectId]);

  useEffect(() => {
    setProject(projectData?.data?.data || {});
  }, [projectData]);

  useEffect(() => {
    if (Object.keys(project).length !== 0) {
      handleHeight();
    }
  }, [project]);

  const renderProjectWindow = (
    <>
      {!!project?.projectImage && (
        <div className="poster">
          <img
            onLoad={() => handleHeight()}
            src={project?.projectImage}
            alt="poster"
          />
        </div>
      )}
      <p className="title heading">{project?.projectName}</p>
      <p className="sub-heading">{project?.description}</p>
      <p className="heading">Tags</p>
      <ul className="sub-heading">
        {project?.techStack?.map((tag) => {
          return <li key={tag}>{tag}</li>;
        })}
      </ul>
      {!!project?.prerequisites?.length && (
        <>
          <p className="heading">Prerequisites</p>
          <ul className="sub-heading">
            {project?.prerequisites?.map((prerequisite) => {
              return <li key={prerequisite}>{prerequisite}</li>;
            })}
          </ul>
        </>
      )}
      {!!project?.softwareUsed?.length && (
        <>
          <p className="heading">Software Used</p>
          <ul className="sub-heading">
            {project?.softwareUsed?.map((software) => {
              return <li key={software}>{software}</li>;
            })}
          </ul>
        </>
      )}
      {!!project?.hardwareUsed?.length && (
        <>
          <p className="heading">Hardware Used</p>
          <ul className="sub-heading">
            {project?.hardwareUsed?.map((hardware) => {
              return <li key={hardware}>{hardware}</li>;
            })}
          </ul>
        </>
      )}
      {!!project?.applyLink && (
        <a
          target="_blank"
          href={`${project?.applyLink}`}
          rel="noopener noreferrer"
        >
          <button>View more</button>
        </a>
      )}
    </>
  );

  return (
    <div id="project-window" className="project-window">
      <div
        onClick={() =>
          navigate(`/community/projects/${encodeURIComponent(id)}`)
        }
        className="cancel"
      >
        <RxCross1 />
      </div>
      {Object.keys(projectData).length === 0 && (
        <div
          style={{ height: "50vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Loading />
        </div>
      )}
      {Object.keys(projectData).length !== 0 && (
        <>
          {projectData?.status === 200 ? (
            renderProjectWindow
          ) : (
            <div
              style={{ height: "50vh" }}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <h4>No data found</h4>
              <span>It may have been moved or removed</span>
              <span
                style={{ color: "grey", fontSize: ".75rem" }}
              >{`ProjectId: ${projectId}`}</span>
              <span
                style={{ color: "grey", fontSize: ".75rem" }}
              >{`error code: ${projectData?.response.status}`}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
