import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    open: false,
    appearance: "light",
  },
  reducers: {
    openSettings: (state, action) => {
      state.open = action.payload;
    },
    setAppearance: (state, action) => {
      state.appearance = action.payload === "dark" ? "dark" : "light";
    },
  },
});

export const { openSettings, setAppearance } = settingsSlice.actions;
export default settingsSlice.reducer;
