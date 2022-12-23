import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const CustomSnackbar = ({ message, open, setOpen, severity }) => {
  const { vertical, horizontal } = { vertical: "top", horizontal: "right" };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          severity={severity}
          sx={{ width: "100%", color: "#013c4c" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
