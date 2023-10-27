import { createContext } from "react";
import { useState } from "react";

export const GlobalSnackbarContext = createContext();

export default function GlobalSnackbarProvider({ children }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarDuration, setSnackbarDuration] = useState(2000);

  return (
    <GlobalSnackbarContext.Provider
      value={{
        snackbarOpen,
        setSnackbarOpen,
        snackbarSeverity,
        setSnackbarSeverity,
        snackbarMessage,
        setSnackbarMessage,
        snackbarDuration,
        setSnackbarDuration,
      }}
    >
      {children}
    </GlobalSnackbarContext.Provider>
  );
}
