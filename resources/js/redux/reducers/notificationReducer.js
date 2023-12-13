import { createSlice } from "@reduxjs/toolkit";

/**
 * State awal
 */
export const initialState = {
  open: false,
  status: "",
  message: "",
  key: new Date().getTime(),
};

/**
 * Create sclice
 */
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    openNotification: (state, action) => {
      state.open = true;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.key = new Date().getTime();
    },
    closeNotification: (state) => {
      state.open = false;
      state.status = "";
      state.message = "";
      state.key = new Date().getTime();
    },
  },
});

/**
 * Actions
 */
export const { openNotification, closeNotification } =
  notificationSlice.actions;

/**
 * Reducer
 */
export default notificationSlice.reducer;