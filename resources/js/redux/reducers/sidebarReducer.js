import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    width: 260,
    mobile: {
      open: false,
    },
  },
  reducers: {
    openMobileSidebar: (state, action) => {
      state.mobile.open = action.payload;
    },
  },
});

export const { openMobileSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
