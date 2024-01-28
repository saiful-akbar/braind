import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",

  initialState: {
    open: false,
  },

  reducers: {
    openLoading: (state) => {
      state.open = true;
    },

    closeLoading: (state) => {
      state.open = false;
    },

    toggleLoading: (state) => {
      state.open = !state.open;
    },
  },
});

export const { openLoading, closeLoading, toggleLoading } =
  loadingSlice.actions;

export default loadingSlice.reducer;
