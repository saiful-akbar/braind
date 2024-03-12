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
        tanggal_input: null,
      },
    },

    delete: {
      type: "remove",
      title: "Hapus Perusahaan",
      open: false,
      id: null,
    },

    restore: {
      title: "Pulihkan",
      open: false,
      id: null,
    },

    import: {
      open: false,
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
        tanggal_input: null,
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

    openRemoveConfirmation: (state, action) => {
      state.delete.type = "remove";
      state.delete.title = "Hapus Perusahaan";
      state.delete.open = true;
      state.delete.id = action.payload;
    },

    openDestroyConfirmation: (state, action) => {
      state.delete.type = "destroy";
      state.delete.title = "Hapus Selamanya";
      state.delete.open = true;
      state.delete.id = action.payload;
    },

    closeDeleteConfirmation: (state) => {
      state.delete.open = false;
      state.delete.id = null;
    },

    openRestoreConfirmation: (state, action) => {
      state.restore.open = true;
      state.restore.id = action.payload;
    },

    closeRestoreConfirmation: (state) => {
      state.restore.open = false;
      state.restore.id = null;
    },

    openFormlImport: (state) => {
      state.import.open = true;
    },

    closeFormlImport: (state) => {
      state.import.open = false;
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
  openFormlImport,
  closeFormlImport,
} = perusahaanExportSlice.actions;

export default perusahaanExportSlice.reducer;
