import { createSlice } from "@reduxjs/toolkit";

const sbpSlice = createSlice({
  name: "sbp",

  /**
   * Default state
   */
  initialState: {
    open: false,
    type: "create",
    data: {
      jumlah: "",
      tindak_lanjut: "",
      tanggal_input: null,
    },
  },

  /**
   * Reducers
   */
  reducers: {
    createSbp: (state) => {
      state.open = true;
      state.type = "create";
      state.data = {
        jumlah: "",
        tindak_lanjut: "",
        tanggal_input: null,
      };
    },

    updateSbp: (state, action) => {
      state.open = true;
      state.type = "update";
      state.data = {
        jumlah: action.payload.jumlah,
        tindak_lanjut: action.payload.tindak_lanjut,
        tanggal_input: action.payload.tanggal_input,
      };
    },

    closeSbpForm: (state) => {
      state.open = false;
    },
  },
});

export const { createSbp, updateSbp, closeSbpForm } = sbpSlice.actions;
export default sbpSlice.reducer;
