import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../../../components/Loader/Loading";
import axios from "axios";
import { API_URL } from "../../../services/APIUtils";

export default function NotesWindow() {
  const { id, notesId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({});
  const [project, setProject] = useState({});
  const [handleHeight] = useOutletContext();

  if (!!!notesId) {
    return;
  }

  const getNotesById = (setProject, id) => {
    axios
      .get(`${API_URL}api/v1/notes/${id}`)
      .then((res) => {
        setProject(res);
      })
      .catch((err) => {
        setProject(err);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getNotesById(setProjectData, notesId);

    return () => {
      setProjectData({});
    };
  }, [notesId]);

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
      <p className="title heading text-center px-4">{project?.title}</p>
      <iframe
        src={project?.pdfLink}
        style={{
          width: "100%",
          height: "80vh",
          border: "none",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      ></iframe>
    </>
  );

  return (
    <div
      style={{ padding: "1.5rem 0" }}
      id="project-window"
      className="project-window"
    >
      <div
        onClick={() => navigate(`/community/notes/${encodeURIComponent(id)}`)}
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
              >{`NotesId: ${notesId}`}</span>
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
