import { createSlice } from "@reduxjs/toolkit";

export const sbpSlice = createSlice({
  name: "sbp",

  initialState: {
    form: {
      open: false,
      type: "create",
      data: {
        id: "",
        kantor_id: "",
        jumlah: "",
        tindak_lanjut: "",
        tanggal_input: null,
      },
    },

    import: {
      open: false,
    },
  },

  reducers: {
    createSbp: (state) => {
      state.form = {
        open: true,
        type: "create",
        data: {
          id: "",
          kantor_id: "",
          jumlah: "",
          tindak_lanjut: "",
          tanggal_input: null,
        },
      };
    },

    updateSbp: (state, action) => {
      state.form = {
        open: true,
        type: "update",
        data: {
          id: action.payload.id,
          kantor_id: action.payload.kantor_id,
          jumlah: action.payload.jumlah,
          tindak_lanjut: action.payload.tindak_lanjut,
          tanggal_input: action.payload.tanggal_input,
        },
      };
    },

    closeFormSbp: (state) => {
      state.form.open = false;
    },

    openFormImportSbp: (state) => {
      state.import.open = true;
    },

    closeFormImportSbp: (state) => {
      state.import.open = false;
    },
  },
});

export const {
  createSbp,
  updateSbp,
  closeFormSbp,
  openFormImportSbp,
  closeFormImportSbp,
} = sbpSlice.actions;

export default sbpSlice.reducer;
