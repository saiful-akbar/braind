import { createSlice } from "@reduxjs/toolkit";

export const penerimaanSlice = createSlice({
  name: "penerimaan",

  initialState: {
    form: {
      type: "create",
      title: "Tambah Penerimaan",
      open: false,
      data: {
        id: "",
        kantor_id: "",
        target_bea_masuk: "",
        realisasi_bea_masuk: "",
        target_bea_keluar: "",
        realisasi_bea_keluar: "",
        target_cukai: "",
        realisasi_cukai: "",
        tanggal_input: "",
      },
    },

    delete: {
      type: "remove",
      title: "Hapus Penerimaan",
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
      state.form.title = "Tambah Penerimaan";
      state.form.open = true;
      state.form.data = {
        id: "",
        kantor_id: "",
        target_bea_masuk: "",
        realisasi_bea_masuk: "",
        target_bea_keluar: "",
        realisasi_bea_keluar: "",
        target_cukai: "",
        realisasi_cukai: "",
        tanggal_input: "",
      };
    },

    openEditForm: (state, action) => {
      state.form.type = "edit";
      state.form.title = "Edit Penerimaan";
      state.form.open = true;
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        target_bea_masuk: action.payload.target_bea_masuk,
        realisasi_bea_masuk: action.payload.realisasi_bea_masuk,
        target_bea_keluar: action.payload.target_bea_keluar,
        realisasi_bea_keluar: action.payload.realisasi_bea_keluar,
        target_cukai: action.payload.target_cukai,
        realisasi_cukai: action.payload.realisasi_cukai,
        tanggal_input: action.payload.tanggal_input,
      };
    },

    closeForm: (state) => {
      state.form.open = false;
    },

    openRemoveConfirmation: (state, action) => {
      state.delete.type = "remove";
      state.delete.title = "Hapus Penerimaan";
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
} = penerimaanSlice.actions;

export default penerimaanSlice.reducer;
