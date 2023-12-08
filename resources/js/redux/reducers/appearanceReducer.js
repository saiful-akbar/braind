import { createSlice } from "@reduxjs/toolkit";

const appearanceSlice = createSlice({
  name: "appearance",
  initialState: {
    mode: "light",
  },
  reducers: {
    setAppearance: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setAppearance } = appearanceSlice.actions;

export default appearanceSlice.reducer;
