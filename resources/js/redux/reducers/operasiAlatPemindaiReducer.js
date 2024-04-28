import { createSlice } from "@reduxjs/toolkit";

export const operasiAlatPemindaiSlice = createSlice({
  name: "operasiAlatPemindai",

  initialState: {
    form: {
      type: "create",
      title: "Tambah Operasi",
      open: false,
      data: {
        id: "",
        kantor_id: "",
        pemindai: "",
        nama_alat: "",
        ukuran: "",
        merek: "",
        tipe: "",
        nomor_seri: "",
        tampilan: "",
        tahun_perolehan: "",
        kondisi: "",
        lokasi_penempatan: "",
        jam_operasi: "",
        jam_pemindaian: "",
        jumlah_pemindaian: "",
        hasil_keluaran: "",
        catatan: "",
        tanggal_input: null,
        cetak: true,
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
        pemindai: "",
        nama_alat: "",
        ukuran: "",
        merek: "",
        tipe: "",
        nomor_seri: "",
        tampilan: "",
        tahun_perolehan: "",
        kondisi: "",
        lokasi_penempatan: "",
        jam_operasi: "",
        jam_pemindaian: "",
        jumlah_pemindaian: "",
        hasil_keluaran: "",
        catatan: "",
        tanggal_input: null,
        cetak: true,
      };
    },

    openEditForm: (state, action) => {
      state.form.type = "edit";
      state.form.title = "Edit Oprasi";
      state.form.open = true;
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        pemindai: action.payload.pemindai,
        nama_alat: action.payload.nama_alat,
        ukuran: action.payload.ukuran,
        merek: action.payload.merek,
        tipe: action.payload.tipe,
        nomor_seri: action.payload.nomor_seri,
        tampilan: action.payload.tampilan,
        tahun_perolehan: action.payload.tahun_perolehan,
        kondisi: action.payload.kondisi,
        lokasi_penempatan: action.payload.lokasi_penempatan,
        jam_operasi: action.payload.jam_operasi,
        jam_pemindaian: action.payload.jam_pemindaian,
        jumlah_pemindaian: action.payload.jumlah_pemindaian,
        hasil_keluaran: action.payload.hasil_keluaran,
        catatan: action.payload.catatan,
        tanggal_input: action.payload.tanggal_input,
        cetak: action.payload.cetak,
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
} = operasiAlatPemindaiSlice.actions;

export default operasiAlatPemindaiSlice.reducer;
