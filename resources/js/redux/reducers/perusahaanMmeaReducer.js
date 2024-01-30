import { createSlice } from "@reduxjs/toolkit";

export const perusahaanMmeaSlice = createSlice({
  name: "perusahaanMmea",

  initialState: {
    form: {
      open: false,
      type: "create",
      data: {
        id: "",
        kantor_id: "",
        nama_perusahaan: "",
        nppbkc: "",
        jumlah_dokumen: "",
        jumlah_liter: "",
        jumlah_cukai: "",
        tanggal_input: "",
      },
    },
  },

  reducers: {
    createPerusahaanMmea: (state) => {
      state.form.open = true;
      state.form.type = "create";
    },

    updatePerusahaanMmea: (state, action) => {
      state.form.open = true;
      state.form.type = "update";
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        nama_perusahaan: action.payload.nama_perusahaan,
        nppbkc: action.payload.nppbkc,
        jumlah_dokumen: action.payload.jumlah_dokumen,
        jumlah_liter: action.payload.jumlah_liter,
        jumlah_cukai: action.payload.jumlah_liter,
        tanggal_input: action.payload.tanggal_input,
      };
    },

    closeFormPerusahaanMmea: (state) => {
      state.form.open = false;
    },
  },
});

export const {
  createPerusahaanMmea,
  updatePerusahaanMmea,
  closeFormPerusahaanMmea,
} = perusahaanMmeaSlice.actions;

export default perusahaanMmeaSlice.reducer;
