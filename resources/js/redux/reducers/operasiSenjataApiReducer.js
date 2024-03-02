import { createSlice } from "@reduxjs/toolkit";

export const operasiSenjataApiSlice = createSlice({
  name: "operasiSenjataApi",

  initialState: {
    form: {
      type: "create",
      title: "Tambah Operasi",
      open: false,
      data: {
        id: "",
        kantor_id: "",
        jenis_kaliber: "",
        nomor_senjata: "",
        nama_pemegang_senjata: "",
        pangkat_pemegang_senjata: "",
        jabatan_pemegang_senjata: "",
        nomor_buku_pas: "",
        masa_berlaku: "",
        kondisi: "",
        jumlah_amunisi: "",
        catatan: "",
        tanggal_input: "",
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
        jenis_kaliber: "",
        nomor_senjata: "",
        nama_pemegang_senjata: "",
        pangkat_pemegang_senjata: "",
        jabatan_pemegang_senjata: "",
        nomor_buku_pas: "",
        masa_berlaku: "",
        kondisi: "",
        jumlah_amunisi: "",
        catatan: "",
        tanggal_input: "",
      };
    },

    openEditForm: (state, action) => {
      state.form.type = "edit";
      state.form.title = "Edit Oprasi";
      state.form.open = true;
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        jenis_kaliber: action.payload.jenis_kaliber,
        nomor_senjata: action.payload.nomor_senjata,
        nama_pemegang_senjata: action.payload.nama_pemegang_senjata,
        pangkat_pemegang_senjata: action.payload.pangkat_pemegang_senjata,
        jabatan_pemegang_senjata: action.payload.jabatan_pemegang_senjata,
        nomor_buku_pas: action.payload.nomor_buku_pas,
        masa_berlaku: action.payload.masa_berlaku,
        kondisi: action.payload.kondisi,
        jumlah_amunisi: action.payload.jumlah_amunisi,
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
} = operasiSenjataApiSlice.actions;

export default operasiSenjataApiSlice.reducer;
