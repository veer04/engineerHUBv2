import { createSlice } from "@reduxjs/toolkit";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("resumeToggleState");
    return serializedState ? JSON.parse(serializedState) : { isVisible: true };
  } catch (err) {
    console.error("Failed to load state:", err);
    return { isVisible: true };
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem("resumeToggleState", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
};

export const resumeToggleSlice = createSlice({
  name: "resumeToggle",
  initialState: loadState(),
  reducers: {
    toggleResume: (state, action) => {
      state.isVisible = action.payload.isVisible;
      saveState(state); // Save to localStorage whenever state changes
    },
  },
});

export const { toggleResume } = resumeToggleSlice.actions;
export default resumeToggleSlice.reducer;
