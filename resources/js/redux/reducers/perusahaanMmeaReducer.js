import { createSlice } from "@reduxjs/toolkit";

export const perusahaanMmeaSlice = createSlice({
  name: "perusahaanMmea",

  initialState: {
    form: {
      open: false,
      type: "create",
      title: "Tambah Perusahaan",
      data: {
        id: "",
        kantor_id: "",
        nama_perusahaan: "",
        nppbkc: "",
        jumlah_dokumen: "",
        jumlah_liter: "",
        jumlah_cukai: "",
        tanggal_input: null,
      },
    },

    delete: {
      type: "remove",
      title: "Hapus Perusahaan",
      id: null,
    },

    restore: {
      title: "Pulihkan Perusahaan",
      id: null,
    },

    importExcel: {
      open: false,
    },
  },

  reducers: {
    openCreateForm: (state) => {
      state.form.open = true;
      state.form.type = "create";
      state.form.title = "Tambah Perusahaan";
    },

    openEditForm: (state, action) => {
      state.form.open = true;
      state.form.type = "update";
      state.form.title = "Edit Perusahaan";
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        nama_perusahaan: action.payload.nama_perusahaan,
        nppbkc: action.payload.nppbkc,
        jumlah_dokumen: action.payload.jumlah_dokumen,
        jumlah_liter: action.payload.jumlah_liter,
        jumlah_cukai: action.payload.jumlah_cukai,
        tanggal_input: action.payload.tanggal_input,
      };
    },

    closeForm: (state) => {
      state.form.open = false;
    },

    openRemoveConfirmation: (state, action) => {
      state.delete.type = "remove";
      state.delete.title = "Hapus Perusahaan";
      state.delete.id = action.payload;
    },

    openDestroyConfirmation: (state, action) => {
      state.delete.type = "destroy";
      state.delete.title = "Hapus Perusahaan Selamanya";
      state.delete.id = action.payload;
    },

    closeDeleteConfirmation: (state) => {
      state.delete.id = null;
    },

    openRestoreConfirmation: (state, action) => {
      state.restore.id = action.payload;
    },

    closeRestoreConfirmation: (state) => {
      state.restore.id = null;
    },

    openFormImportExcel: (state) => {
      state.importExcel.open = true;
    },

    closeFormImportExcel: (state) => {
      state.importExcel.open = false;
    },
  },
});

export const {
  openCreateForm,
  openEditForm,
  closeForm,
  openRemoveConfirmation,
  openDestroyConfirmation,
  closeDeleteConfirmation,
  openRestoreConfirmation,
  closeRestoreConfirmation,
  openFormImportExcel,
  closeFormImportExcel,
} = perusahaanMmeaSlice.actions;

export default perusahaanMmeaSlice.reducer;
