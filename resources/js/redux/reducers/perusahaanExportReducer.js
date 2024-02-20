import { createSlice } from "@reduxjs/toolkit";

export const perusahaanExportSlice = createSlice({
  name: "perusahaanExport",

  initialState: {
    form: {
      type: "create",
      title: "Tambah Perusahaan",
      open: false,
      data: {
        id: "",
        kantor_id: "",
        nama_perusahaan: "",
        npwp: "",
        peb: "",
        bruto: "",
        netto: "",
        devisa: "",
        bea_keluar: "",
        jumlah_liter: "",
        jumlah_cukai: "",
        tanggal_input: "",
      },
    },
  },

  reducers: {
    openCreateForm: (state) => {
      state.form.type = "create";
      state.form.title = "Tambah Perusahaan";
      state.form.open = true;
      state.form.data = {
        id: "",
        kantor_id: "",
        nama_perusahaan: "",
        npwp: "",
        peb: "",
        bruto: "",
        netto: "",
        devisa: "",
        bea_keluar: "",
        jumlah_liter: "",
        jumlah_cukai: "",
        tanggal_input: "",
      };
    },

    openEditForm: (state, action) => {
      state.form.type = "edit";
      state.form.title = "Edit Perusahaan";
      state.form.open = true;
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        nama_perusahaan: action.payload.nama_perusahaan,
        npwp: action.payload.npwp,
        peb: action.payload.peb,
        bruto: action.payload.bruto,
        netto: action.payload.netto,
        devisa: action.payload.devisa,
        bea_keluar: action.payload.bea_keluar,
        jumlah_liter: action.payload.jumlah_liter,
        jumlah_cukai: action.payload.jumlah_cukai,
        tanggal_input: action.payload.tanggal_input,
      };
    },

    closeForm: (state) => {
      state.form.open = false;
    },
  },
});

export const { openCreateForm, openEditForm, closeForm } =
  perusahaanExportSlice.actions;

export default perusahaanExportSlice.reducer;
