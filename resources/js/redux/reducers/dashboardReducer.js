import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    topFiveCompanies: {
      year: new Date().getFullYear(),
    },
  },

  reducers: {
    setYearTopFiveCompanies: (state, actions) => {
      state.topFiveCompanies.year = actions.payload;
    },
  },
});

export const { setYearTopFiveCompanies } = dashboardSlice.actions;

export default dashboardSlice.reducer;
