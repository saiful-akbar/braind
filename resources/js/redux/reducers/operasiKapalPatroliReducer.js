import { createSlice } from "@reduxjs/toolkit";

export const operasiKapalPatroliSlice = createSlice({
  name: "operasiKapalPatroli",

  initialState: {
    form: {
      type: "create",
      title: "Tambah Operasi",
      open: false,
      data: {
        id: "",
        kantor_id: "",
        nomor_lambung: "",
        kondisi: "",
        nomor_spb: "",
        tanggal_spb: "",
        penerbit_spb: "",
        jumlah_hari: "",
        catatan: "",
        tanggal_input: null,
        jenis_kapal: "",
        merk_tipe_mesin: "",
        jumlah_mesin: "",
        tahun_pembuatan: "",
        tahun_rehab: "",
        kondisi_badan_kapal: "",
        kondisi_mesin_kapal: "",
        status_pengoperasian: "Aktif",
        kondisi_aktif: true,
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
        nomor_lambung: "",
        kondisi: "",
        nomor_spb: "",
        tanggal_spb: "",
        penerbit_spb: "",
        jumlah_hari: "",
        catatan: "",
        tanggal_input: null,
        jenis_kapal: "",
        merk_tipe_mesin: "",
        jumlah_mesin: "",
        tahun_pembuatan: "",
        tahun_rehab: "",
        kondisi_badan_kapal: "",
        kondisi_mesin_kapal: "",
        status_pengoperasian: "Aktif",
        kondisi_aktif: true,
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
        nomor_lambung: action.payload.nomor_lambung,
        kondisi: action.payload.kondisi,
        nomor_spb: action.payload.nomor_spb,
        tanggal_spb: action.payload.tanggal_spb,
        penerbit_spb: action.payload.penerbit_spb,
        jumlah_hari: action.payload.jumlah_hari,
        catatan: action.payload.catatan,
        tanggal_input: action.payload.tanggal_input,
        jenis_kapal: action.payload.jenis_kapal,
        merk_tipe_mesin: action.payload.merk_tipe_mesin,
        jumlah_mesin: action.payload.jumlah_mesin,
        tahun_pembuatan: action.payload.tahun_pembuatan,
        tahun_rehab: action.payload.tahun_rehab,
        kondisi_badan_kapal: action.payload.kondisi_badan_kapal,
        kondisi_mesin_kapal: action.payload.kondisi_mesin_kapal,
        status_pengoperasian: action.payload.status_pengoperasian,
        kondisi_aktif: action.payload.kondisi_aktif,
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
} = operasiKapalPatroliSlice.actions;

export default operasiKapalPatroliSlice.reducer;
