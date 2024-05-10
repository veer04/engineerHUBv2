import { useState } from "react";
import { FaEye } from "react-icons/fa";
import "./NotesCard.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";
import defaultPoster from "../../assets/defaultPoster";

export default function NotesCard({ data }) {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const {
    setSnackbarOpen,
    setSnackbarMessage,
    setSnackbarSeverity,
    setSnackbarDuration,
  } = useGlobalSnackbar();

  const download = async () => {
    if (status === "loading") return;
    setStatus("loading");
    await axios({
      url: `${API_URL}api/v1/downloadPdf/${data?._id}`,
      method: "GET",
      responseType: "blob", // important
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        ); // you can use this to show user percentage of file downloaded
        setProgress(percentCompleted);
      },
    })
      // axios
      //   .get(`${API_URL}api/v1/downloadPdf/${data?._id}`, {
      //     responseType: "blob",
      //   })
      .then((response) => {
        setProgress(100);
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${data.title}.pdf`);
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
        setProgress(0);
      });
  };

  const formattedSize = (size) => {
    //size is already in kilobytes
    const units = ["B","KB", "MB", "GB", "TB"];
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
            backgroundImage: `url(${
              !!data?.image ? data?.image : defaultPoster
            })`,
          }}
        >
          {Boolean(data?.views) && (
            <div className="views">
              <FaEye /> {data?.views}
            </div>
          )}
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
            {status === "loading" && <>{progress}%</>}
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
            {Boolean(data?.pdfPages) && <span>{data?.pdfPages} Pages</span>}
            {/* If pages and size both are present */}
            {Boolean(data?.pdfPages) && Boolean(data?.pdfSize) && (
              <span>•</span>
            )}
            {/* If size is present */}
            {Boolean(data?.pdfSize) && (
              <span>{formattedSize(data?.pdfSize ? data?.pdfSize : 0)}</span>
            )}
          </div>
          {/* If download is present */}
          {Boolean(data?.downloads) && (
            <span className="downloads">
              <MdOutlineFileDownload />
              {data?.downloads}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
