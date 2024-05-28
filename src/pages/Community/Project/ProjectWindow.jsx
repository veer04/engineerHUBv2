import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { getProjectById } from "../../../services/APIConfig";
import Loading from "../../../components/Loader/Loading";
import { Link } from "react-router-dom";

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
    if (projectData?.data?.data) {
      document.title = `${projectData?.data?.data?.projectName} | Projects | engineerHUB`;
    }
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
      <p
        className="sub-heading"
        dangerouslySetInnerHTML={{
          __html: project?.description,
        }}
      ></p>
      {!!project?.techStack?.length && (
        <>
          <p className="heading">Tags</p>
          <ul className="sub-heading">
            {project?.techStack?.map((tag) => {
              return (
                <li className="li" key={tag}>
                  {tag}
                </li>
              );
            })}
          </ul>
        </>
      )}
      {!!project?.prerequisites?.length && (
        <>
          <p className="heading">Prerequisites</p>
          <ul className="sub-heading">
            {project?.prerequisites?.map((prerequisite) => {
              return (
                <li className="li" key={prerequisite}>
                  {prerequisite}
                </li>
              );
            })}
          </ul>
        </>
      )}
      {!!project?.softwareUsed?.length && (
        <>
          <p className="heading">Software Used</p>
          <ul className="sub-heading">
            {project?.softwareUsed?.map((software) => {
              return (
                <li className="li" key={software}>
                  {software}
                </li>
              );
            })}
          </ul>
        </>
      )}
      {!!project?.hardwareUsed?.length && (
        <>
          <p className="heading">Hardware Used</p>
          <ul className="sub-heading">
            {project?.hardwareUsed?.map((hardware) => {
              return (
                <li className="li" key={hardware}>
                  {hardware}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <div className="project-btn-container">
        <a
          href="https://chat.whatsapp.com/EUNhE4tFic58nC67X0Fh6W"
          className="apply"
        >
          <button>Discuss</button>
        </a>
        {!!project?.applyLink ? (
          <a
            target="_blank"
            href={`${project?.applyLink}`}
            rel="noopener noreferrer"
          >
            <button>View more</button>
          </a>
        ) : project?.isExpired ? (
          <button className="project-btn-expired">Expired</button>
        ) : (
          <Link
            to={`/community/projects/${encodeURIComponent(
              id
            )}/${projectId}/submit`}
            className="apply"
          >
            <button>Submit</button>
          </Link>
        )}
      </div>
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
