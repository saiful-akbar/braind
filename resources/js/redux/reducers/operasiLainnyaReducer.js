import { createSlice } from "@reduxjs/toolkit";

export const operasiLainnyaSlice = createSlice({
  name: "operasiLainnya",

  initialState: {
    form: {
      type: "create",
      title: "Tambah Operasi",
      open: false,
      data: {
        id: "",
        kantor_id: "",
        jenis_operasi: "",
        merek: "",
        tipe: "",
        lokasi_penempatan: "",
        kondisi: "",
        catatan: "",
        tanggal_input: null,
      },
    },

    delete: {
      type: "remove",
      title: "Hapus Operasi",
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
      state.form.title = "Tambah Oprasi";
      state.form.open = true;
      state.form.data = {
        id: "",
        kantor_id: "",
        jenis_operasi: "",
        merek: "",
        tipe: "",
        lokasi_penempatan: "",
        kondisi: "",
        catatan: "",
        tanggal_input: null,
      };
    },

    openEditForm: (state, action) => {
      state.form.type = "edit";
      state.form.title = "Edit Oprasi";
      state.form.open = true;
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        jenis_operasi: action.payload.jenis_operasi,
        merek: action.payload.merek,
        tipe: action.payload.tipr,
        lokasi_penempatan: action.payload.lokasi_penempatan,
        kondisi: action.payload.kondisi,
        catatan: action.payload.catatan,
        tanggal_input: action.payload.tanggal_input,
      };
    },

    closeForm: (state) => {
      state.form.open = false;
    },

    openRemoveConfirmation: (state, action) => {
      state.delete.type = "remove";
      state.delete.title = "Hapus Operasi";
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
} = operasiLainnyaSlice.actions;

export default operasiLainnyaSlice.reducer;
