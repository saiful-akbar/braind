import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  
  initialState: {
    open: false,
    appearance: "light",
  },

  reducers: {

    /**
     * Method untuk membuka dialog settings
     */
    openSettings: (state, action) => {
      state.open = action.payload;
    },

    /**
     * Method untuk merubah tampilan (tema)
     */
    setAppearance: (state, action) => {
      state.appearance = action.payload === "dark" ? "dark" : "light";
    },
  },
});

export const { openSettings, setAppearance } = settingsSlice.actions;
export default settingsSlice.reducer;
