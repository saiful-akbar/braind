import { createSlice } from "@reduxjs/toolkit";

export const reportSlice = createSlice({
  name: "report",

  initialState: {
    form: {
      open: false,
      title: "",
      route: "",
    },
  },

  reducers: {
    openForm: (state, action) => {
      state.form.open = true;
      state.form.title = action.payload.title;
      state.form.route = action.payload.route;
    },

    closeForm: (state) => {
      state.form.open = false;
    },
  },
});

export const { openForm, closeForm } = reportSlice.actions;

export default reportSlice.reducer;
