import { createSlice } from "@reduxjs/toolkit";

const postModalSlice = createSlice({
  name: "postModal",
  initialState: {
    showPostModal: false,
  },

  reducers: {
    openPostModal: (state, action) => {
      state.showPostModal = true;
    },

    closePostModal: (state, action) => {
      state.showPostModal = false;
    },
  },
});

export const { openPostModal, closePostModal } = postModalSlice.actions;
export default postModalSlice.reducer;
