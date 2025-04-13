import { configureStore } from "@reduxjs/toolkit";
import resumeToggleReducer from "./slices/resumeToggleSlice";
import postModalReducer from "./slices/postModalSlice";

export const store = configureStore({
  reducer: {
    resumeToggle: resumeToggleReducer,
    postModal: postModalReducer,
  },
});

export default store;
