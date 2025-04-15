import { configureStore } from "@reduxjs/toolkit";
import resumeToggleReducer from "./slices/resumeToggleSlice"; // Import the reducer

export const store = configureStore({
  reducer: {
    resumeToggle: resumeToggleReducer, // Ensure it is properly added here
  },
});

export default store;
