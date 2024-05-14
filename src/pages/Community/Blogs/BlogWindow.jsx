import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { getProjectById, getBlogById } from "../../../services/APIConfig";
import Loading from "../../../components/Loader/Loading";
import "./BlogWindow.css";
export default function BlogWindow() {
  const { id, blogId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({});
  const [project, setProject] = useState({});
  const [handleHeight] = useOutletContext();

  if (!!!blogId) {
    return;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogById(setProjectData, blogId);

    return () => {
      setProjectData({});
    };
  }, [blogId]);

  useEffect(() => {
    if (projectData?.data?.data) {
      document.title = `${projectData?.data?.data?.title} | Blogs | engineerHUB`;
    }
    setProject(projectData?.data?.data || {});
  }, [projectData]);

  useEffect(() => {
    if (Object.keys(project).length !== 0) {
      handleHeight();
    }
  }, [project]);

  // const [blog, setBlog] = useState({});
  // const { isCollapsed } = useSidebar();

  // useEffect(() => {
  //   if (isCollapsed === false) setIsBlogOpen(false);
  // }, [isCollapsed]);
  // useEffect(() => {
  //   getBlogById(setBlog, blogId);
  // }, [blogId]);
  // return () => {
  //   setProjectData({});
  // };

  // useEffect(() => {
  //   document.getElementById("blog-description-box").innerHTML =
  //     project?.postArea;
  // }, [project]);

  // const renderProjectWindow = (
  //   <>
  //     {!!project?.projectImage && (
  //       <div className="poster">
  //         <img
  //           onLoad={() => handleHeight()}
  //           src={project?.projectImage}
  //           alt="poster"
  //         />
  //       </div>
  //     )}
  //     <p className="title heading">{project?.projectName}</p>
  //     <p className="sub-heading">{project?.description}</p>
  //     <p className="heading">Tags</p>
  //     <ul className="sub-heading">
  //       {project?.techStack?.map((tag) => {
  //         return <li key={tag}>{tag}</li>;
  //       })}
  //     </ul>
  //     {!!project?.prerequisites?.length && (
  //       <>
  //         <p className="heading">Prerequisites</p>
  //         <ul className="sub-heading">
  //           {project?.prerequisites?.map((prerequisite) => {
  //             return <li key={prerequisite}>{prerequisite}</li>;
  //           })}
  //         </ul>
  //       </>
  //     )}
  //     {!!project?.softwareUsed?.length && (
  //       <>
  //         <p className="heading">Software Used</p>
  //         <ul className="sub-heading">
  //           {project?.softwareUsed?.map((software) => {
  //             return <li key={software}>{software}</li>;
  //           })}
  //         </ul>
  //       </>
  //     )}
  //     {!!project?.hardwareUsed?.length && (
  //       <>
  //         <p className="heading">Hardware Used</p>
  //         <ul className="sub-heading">
  //           {project?.hardwareUsed?.map((hardware) => {
  //             return <li key={hardware}>{hardware}</li>;
  //           })}
  //         </ul>
  //       </>
  //     )}
  //     {!!project?.applyLink && (
  //       <a
  //         target="_blank"
  //         href={`${project?.applyLink}`}
  //         rel="noopener noreferrer"
  //       >
  //         <button>View more</button>
  //       </a>
  //     )}
  //   </>
  // );

  return (
    <div id="blog-window" className="blog-window">
      <div className="project__window__title blog__window__title">
        <div className="detail">
          <div className="title">{project?.title}</div>
        </div>
        {/* <div onClick={() => setIsBlogOpen(false)} className="link">
          <RxCross1 />
        </div> */}
      </div>
      {/*
       {project?.postIcon && <div
        style={{
          backgroundImage: `url(${project?.postIcon})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "15rem",
          backgroundColor: "var(--main-background-color)",
          border: "1px solid lightgrey",
          borderRadius: ".5rem",
        }}
        className="project_window__poster"
      ></div>}
        */}
      {project?.postIcon && (
        <img
          style={{
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto",
            display: "block",
            maxHeight: "736px",
            backgroundColor: "var(--main-background-color)",
            border: "1px solid lightgrey",
            borderRadius: ".5rem",
          }}
          src={project?.postIcon}
          alt="poster icon for a blog"
        />
      )}
      <div className="project__window__description">
        <div
          id="blog-description-box"
          className="description"
          dangerouslySetInnerHTML={{
            __html: project?.postArea,
          }}
        ></div>
      </div>
      <div className="blog__window__details">
        {project?.creatorId && (
          <div className="author">{`by ${project.creatorId.name}`}</div>
        )}
        {/* <div className="date">
          {project?.createdAt &&
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(date)}
        </div> */}
      </div>
    </div>
  );
}
