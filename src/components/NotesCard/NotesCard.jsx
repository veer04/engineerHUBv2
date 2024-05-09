import { useState } from "react";
import { FaEye } from "react-icons/fa";
import "./NotesCard.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";

export default function NotesCard({ data }) {
  const [status, setStatus] = useState("idle");
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  const download = () => {
    if (status === "loading") return;
    setStatus("loading");
    axios
      .get(`${API_URL}api/v1/downloadPdf/${data?._id}s`, {
        responseType: "blob",
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "file.pdf");
        link.click();
        setStatus("downloaded");
      })
      .catch((err) => {
        setStatus("failed");
        setSnackbarMessage(
          <>
            <span>Download failed</span>
            {err?.response?.data?.message && (
              <>
                {" "}
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
      });
  };

  const formattedSize = (size) => {
    //size is already in kilobytes
    const units = ["KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    while (size > 1024) {
      size = size / 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

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
          {/* <a href={data.pdfLink} target="_blank"> */}
          <button onClick={() => download()} className="download-btn">
            {status === "idle" && (
              <>
                <MdOutlineFileDownload /> Download
              </>
            )}
            {status === "loading" && <>Downloading...</>}
            {status === "downloaded" && <>Downloaded</>}
            {status === "failed" && (
              <>
                <MdOutlineFileDownload /> Download
              </>
            )}
          </button>
          {/* </a> */}
          <Link to={data._id}>
            <button className="read-btn">Read</button>
          </Link>
        </div>
        <div className="info-container">
          <div className="insights">
            {/* If pages are present */}
            {!!data?.pdfPages && <span>{data?.pdfPages} Pages</span>}
            {/* If pages and size both are present */}
            {!!data?.pdfPages && !!data?.pdfSize && <span>•</span>}
            {/* If size is present */}
            {!!data?.pdfSize && (
              <span>{formattedSize(data?.pdfSize ? data?.pdfSize : 0)}</span>
            )}
          </div>
          <span className="downloads">
            <MdOutlineFileDownload />
            50
          </span>
        </div>
      </div>
    </article>
  );
}
