import { createSlice } from "@reduxjs/toolkit";

const perusahaanHtHptlSlice = createSlice({
  name: "perusahaanHtHptl",

  initialState: {
    open: false,
    type: "create",
    data: {
      id: "",
      kantor_id: "",
      nama_perusahaan: "",
      nppbkc: "",
      jumlah_ck: "",
      jenis_bkc: "",
      jumlah: "",
      jumlah_cukai: "",
    },
  },

  reducers: {
    createPerusahaanHtHptl: (state) => {
      state.open = true;
      state.type = "create";
      state.data = {
        id: "",
        kantor_id: "",
        nama_perusahaan: "",
        nppbkc: "",
        jumlah_ck: "",
        jenis_bkc: "",
        jumlah: "",
        jumlah_cukai: "",
      };
    },

    updatePerusahaanHtHptl: (state, action) => {
      state.open = true;
      state.type = "update";
      state.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        nama_perusahaan: action.payload.nama_perusahaan,
        nppbkc: action.payload.nppbkc,
        jumlah_ck: action.payload.jumlah_ck,
        jenis_bkc: action.payload.jenis_bkc,
        jumlah: action.payload.jumlah,
        jumlah_cukai: action.payload.jumlah_cukai,
      };
    },

    closeModalPerusahaanHtHptl: (state) => {
      state.open = false;
    },
  },
});

export const {
  createPerusahaanHtHptl,
  updatePerusahaanHtHptl,
  closeModalPerusahaanHtHptl,
} = perusahaanHtHptlSlice.actions;

export default perusahaanHtHptlSlice.reducer;
