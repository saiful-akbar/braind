import { createSlice } from "@reduxjs/toolkit";

export const penindakanSlice = createSlice({
  name: "penindakan",

  initialState: {
    form: {
      type: "create",
      title: "Tambah Penindakan",
      open: false,
      data: {
        id: "",
        kantor_id: "",
        kppbc: "",
        nomor_sbp: "",
        tanggal_sbp: "",
        kode_komoditi: "",
        jumlah: "",
        uraian: "",
        perkiraan_nilai_barang: "",
        potensi_kurang_bayar: "",
        tindak_lanjut: "",
        tanggal_input: null,
      },
    },

    delete: {
      type: "remove",
      title: "Hapus penindakan",
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
      state.form.title = "Tambah penindakan";
      state.form.open = true;
      state.form.data = {
        id: "",
        kantor_id: "",
        kppbc: "",
        nomor_sbp: "",
        tanggal_sbp: "",
        kode_komoditi: "",
        jumlah: "",
        uraian: "",
        perkiraan_nilai_barang: "",
        potensi_kurang_bayar: "",
        tindak_lanjut: "",
        tanggal_input: null,
      };
    },

    openEditForm: (state, action) => {
      state.form.type = "edit";
      state.form.title = "Edit penindakan";
      state.form.open = true;
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        kppbc: action.payload.kppbc,
        nomor_sbp: action.payload.nomor_sbp,
        tanggal_sbp: action.payload.tanggal_sbp,
        kode_komoditi: action.payload.kode_komoditi,
        jumlah: action.payload.jumlah,
        uraian: action.payload.uraian,
        perkiraan_nilai_barang: action.payload.perkiraan_nilai_barang,
        potensi_kurang_bayar: action.payload.potensi_kurang_bayar,
        tindak_lanjut: action.payload.tindak_lanjut ?? "",
        tanggal_input: action.payload.tanggal_input,
      };
    },

    closeForm: (state) => {
      state.form.open = false;
    },

    openRemoveConfirmation: (state, action) => {
      state.delete.type = "remove";
      state.delete.title = "Hapus Penindakan";
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
} = penindakanSlice.actions;

export default penindakanSlice.reducer;
