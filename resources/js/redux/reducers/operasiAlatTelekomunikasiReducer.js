import { createSlice } from "@reduxjs/toolkit";

export const operasiAlatTelekomunikasiSlice = createSlice({
  name: "operasiAlatTelekomunikasi",

  initialState: {
    form: {
      type: "create",
      title: "Tambah Operasi",
      open: false,
      data: {
        id: "",
        kantor_id: "",
        nama_barang: "",
        kode_barang: "",
        nup: "",
        jenis_perangkat: "",
        harga_perolehan: "",
        tahun_perolehan: "",
        merek: "",
        tipe: "",
        rentang_frekuensi: "",
        teknologi_digital: "",
        kondisi: "",
        status: "",
        lokasi_penempatan: "",
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
        nama_barang: "",
        kode_barang: "",
        nup: "",
        jenis_perangkat: "",
        harga_perolehan: "",
        tahun_perolehan: "",
        merek: "",
        tipe: "",
        rentang_frekuensi: "",
        teknologi_digital: "",
        kondisi: "",
        status: "",
        lokasi_penempatan: "",
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
        nama_barang: action.payload.nama_barang,
        kode_barang: action.payload.kode_barang,
        nup: action.payload.nup,
        jenis_perangkat: action.payload.jenis_perangkat,
        harga_perolehan: action.payload.harga_perolehan,
        tahun_perolehan: action.payload.tahun_perolehan,
        merek: action.payload.merek,
        tipe: action.payload.tipe,
        rentang_frekuensi: action.payload.rentang_frekuensi,
        teknologi_digital: action.payload.teknologi_digital,
        kondisi: action.payload.kondisi,
        status: action.payload.status,
        lokasi_penempatan: action.payload.lokasi_penempatan,
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
} = operasiAlatTelekomunikasiSlice.actions;

export default operasiAlatTelekomunikasiSlice.reducer;
