import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useGlobalSnackbar from "../../hooks/useGlobalSnackbar";

export default function GlobalSnackbar() {
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarSeverity,
    snackbarMessage,
    snackbarDuration = 2000,
  } = useGlobalSnackbar();

  const { vertical, horizontal } = { vertical: "top", horizontal: "right" };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: "100%", color: "#013c4c" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
