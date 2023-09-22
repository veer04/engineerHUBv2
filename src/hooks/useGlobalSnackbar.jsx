import { useContext } from "react";
import { GlobalSnackbarContext } from "../contexts/GlobalSnackbarContext";

export default function useGlobalSnackbar() {
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarSeverity,
    setSnackbarSeverity,
    snackbarMessage,
    setSnackbarMessage,
    snackbarDuration,
    setSnackbarDuration,
  } = useContext(GlobalSnackbarContext);

  return {
    snackbarOpen,
    setSnackbarOpen,
    snackbarSeverity,
    setSnackbarSeverity,
    snackbarMessage,
    setSnackbarMessage,
    snackbarDuration,
    setSnackbarDuration,
  };
}
