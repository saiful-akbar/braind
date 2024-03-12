import { createSlice } from "@reduxjs/toolkit";

export const pengawasanSlice = createSlice({
  name: "pengawasan",

  initialState: {
    form: {
      type: "create",
      title: "Tambah Pengawasan",
      open: false,
      data: {
        id: "",
        kantor_id: "",
        tipe: "",
        sbp: "",
        kantor: "",
        nilai_barang: "",
        total_kerugian: "",
        potensi_kerugian: "",
        tindak_lanjut: "",
        tanggal_input: null,
      },
    },

    delete: {
      type: "remove",
      title: "Hapus Pengawasan",
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

    types: ["Cukai EA", "Cukai HT", "Cukai MMEA", "Export", "Import"],
  },

  reducers: {
    openCreateForm: (state) => {
      state.form.type = "create";
      state.form.title = "Tambah Pengawasan";
      state.form.open = true;
      state.form.data = {
        id: "",
        kantor_id: "",
        tipe: "",
        sbp: "",
        kantor: "",
        nilai_barang: "",
        total_kerugian: "",
        potensi_kerugian: "",
        tindak_lanjut: "",
        tanggal_input: null,
      };
    },

    openEditForm: (state, action) => {
      state.form.type = "edit";
      state.form.title = "Edit Pengawasan";
      state.form.open = true;
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        tipe: action.payload.tipe,
        sbp: action.payload.sbp,
        kantor: action.payload.kantor,
        nilai_barang: action.payload.nilai_barang,
        total_kerugian: action.payload.total_kerugian,
        potensi_kerugian: action.payload.potensi_kerugian,
        tindak_lanjut: action.payload.tindak_lanjut,
        tanggal_input: action.payload.tanggal_input,
      };
    },

    closeForm: (state) => {
      state.form.open = false;
    },

    openRemoveConfirmation: (state, action) => {
      state.delete.type = "remove";
      state.delete.title = "Hapus Pengawasan";
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
} = pengawasanSlice.actions;

export default pengawasanSlice.reducer;
