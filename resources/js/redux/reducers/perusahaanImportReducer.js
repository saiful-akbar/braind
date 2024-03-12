import { createSlice } from "@reduxjs/toolkit";

export const perusahaanImportSlice = createSlice({
  name: "perusahaanImport",

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
        pib: "",
        pembayaran_bea_masuk: "",
        netto: "",
        bruto: "",
        total_pembayaran: "",
        bea_masuk: "",
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
        pib: "",
        pembayaran_bea_masuk: "",
        netto: "",
        bruto: "",
        total_pembayaran: "",
        bea_masuk: "",
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
        pib: action.payload.pib,
        pembayaran_bea_masuk: action.payload.pembayaran_bea_masuk,
        netto: action.payload.netto,
        bruto: action.payload.bruto,
        total_pembayaran: action.payload.total_pembayaran,
        bea_masuk: action.payload.bea_masuk,
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
} = perusahaanImportSlice.actions;

export default perusahaanImportSlice.reducer;
