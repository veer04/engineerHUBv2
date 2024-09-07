import { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";

export default function DownloadButton({ data }) {
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
      url: `${API_URL}api/v1/downloadPdf`,
      method: "POST",
      data: {
        title: data?.productData[0]?.title,
        url: data?.productData[0]?.coursePdf,
      },
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
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
        link.setAttribute("download", `${data?.productData[0]?.title}.pdf`);
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

  return (
    <button
      className="join-btn download-btn body-sm-semibold"
      disabled={status === "loading"}
      onClick={() =>
        download(data?.productData[0]?.title, data?.productData[0]?.coursePdf)
      }
    >
      {status === "idle" && (
        <>
          Download <MdOutlineFileDownload style={{ fontSize: "1.25rem" }} />
        </>
      )}
      {status === "loading" && <>{progress}%</>}
      {status === "downloaded" && <>Downloaded</>}
      {status === "failed" && (
        <>
          Download <MdOutlineFileDownload style={{ fontSize: "1.25rem" }} />
        </>
      )}
    </button>
  );
}
