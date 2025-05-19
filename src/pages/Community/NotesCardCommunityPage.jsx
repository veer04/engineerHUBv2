import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NotesCardCommunityPage.css";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import { MdOutlineFileDownload } from "react-icons/md";
import defaultPoster from "../../assets/defaultPoster";

export default function NotesCard({ note }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);

  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  const handleReadOnline = () => {
    const safeTitle = encodeURIComponent(note?.title?.trim() || "untitled");
    navigate(`/community/notes/${safeTitle}/${note._id}`);
  };

  const handleDownload = async () => {
    if (status === "loading") return;
    setStatus("loading");

    await axios({
      url: `${API_URL}api/v1/downloadPdf/${note?._id}`,
      method: "GET",
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    })
      .then((response) => {
        setProgress(100);
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${note.title}.pdf`);
        link.click();
        setStatus("downloaded");
        setProgress(0);
      })
      .catch((err) => {
        setStatus("failed");
        setSnackbarMessage(
          <>
            <span>Download failed</span>
            {err?.response?.data?.message && (
              <>
                <br />
                <span>Error: {err?.response?.data?.message}</span>
              </>
            )}
          </>
        );
        setSnackbarSeverity("error");
        setSnackbarDuration(5000);
        setSnackbarOpen(true);
        console.error(err);
        setProgress(0);
      });
  };

  return (
    <div className="note-card">
      <img
        src={note?.image || defaultPoster}
        alt="Note Thumbnail"
        className="note-img"
      />
      <p className="note-title">{note?.title}</p>
      <div className="btn-group">
        <button onClick={handleDownload} className="btn-download">
          {status === "idle" && (
            <>
              <MdOutlineFileDownload /> Download
            </>
          )}
          {status === "loading" && <>{progress}%</>}
          {status === "downloaded" && <>Downloaded</>}
          {status === "failed" && (
            <>
              <MdOutlineFileDownload /> Retry
            </>
          )}
        </button>
        <a
          href={note?.pdfLink}
          className="btn-read"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read
        </a>
      </div>
      <div className="note-meta">
        {Boolean(note?.pdfPages) && <span>{note?.pdfPages} Pages</span>}
        {Boolean(note?.pdfPages) && Boolean(note?.pdfSize) && <span>•</span>}
        {Boolean(note?.pdfSize) && (
          <span>{(note?.pdfSize / (1024 * 1024)).toFixed(2)} MB</span>
        )}
        {Boolean(note?.downloads) && (
          <>
            <span>•</span>
            <span>{note?.downloads} Downloads</span>
          </>
        )}
      </div>
    </div>
  );
}

{
  /*import { useNavigate, useParams } from "react-router-dom";
import "./NotesCardCommunityPage.css";

export default function NotesCard({ note }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleReadOnline = () => {
    const safeTitle = encodeURIComponent(note?.title?.trim() || "untitled");
    navigate(`/community/notes/${safeTitle}/${note._id}`);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = note?.pdfLink;
    link.setAttribute("download", `${note?.title || "note"}.pdf`); // optional custom filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="note-card">
      <img
        src={note?.image || "/default-note.jpg"}
        alt="Note Thumbnail"
        className="note-img"
      />
      <p className="note-title">{note?.title}</p>
      <div className="btn-group">
        <button onClick={handleDownload} className="btn-download">
          Download
        </button>
        <a href={note?.pdfLink} className="btn-read" target="_blank" rel="noopener noreferrer">
          Read
        </a>
      </div>
      <div className="note-meta">
        <span>{note?.pdfPages} Pages</span>
        <span>{(note?.pdfSize / (1024 * 1024)).toFixed(2)} MB</span>
        <span>{note?.downloads} Downloads</span>
      </div>
    </div>
  );
}
*/
}
