import { FaEye } from "react-icons/fa";
import "./NotesCard.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NotesCard({ data }) {
  // const downloadFile = () => {
  //   fetch(data?.pdfLink, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/pdf",
  //     },
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(new Blob([blob]));

  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.download = data?.title;

  //       document.body.appendChild(link);

  //       link.click();

  //       link.parentNode.removeChild(link);
  //     });
  // };

  return (
    <article className="notes-card">
      <div className="upper-container">
        <div
          className="poster"
          style={{
            backgroundImage: `url(${data?.notesImage})`,
          }}
        >
          <div className="views">
            <FaEye /> {data?.views}
          </div>
        </div>
        <span className="title text-crop-2" title={data.title}>
          {data.title}
        </span>
      </div>
      <div className="lower-container">
        <div className="buttons">
          <a href={data.pdfLink} target="_blank">
            <button
              //  onClick={() => downloadFile()}
              className="download-btn"
            >
              <MdOutlineFileDownload /> Download
            </button>
          </a>
          <Link to={data._id}>
            <button className="read-btn">Read</button>
          </Link>
        </div>
        <div className="insights">
          {/* If pages are present */}
          {true && <span>22 Pages</span>}
          {/* If pages and size both are present */}
          {true && true && <span>•</span>}
          {/* If size is present */}
          {true && <span>2.2 MB</span>}
        </div>
      </div>
    </article>
  );
}
