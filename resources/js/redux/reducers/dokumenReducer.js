import { createSlice } from "@reduxjs/toolkit";

export const dokumenSlice = createSlice({
  name: "dokumen",

  initialState: {
    form: {
      open: false,
      title: "Tambah Dokumen",
      type: "create",
      data: {
        id: "",
        kantor_id: "",
        tanggal: "",
        jenis_dokumen: "",
        keterangan: "",
        file: "",
      },
    },
  },

  reducers: {
    openCreateForm: (state) => {
      state.form.open = true;
      state.form.type = "create";
      state.form.title = "Tambah Dokumen";
      state.form.data = {
        id: "",
        kantor_id: "",
        tanggal: "",
        jenis_dokumen: "",
        keterangan: "",
        file: "",
      };
    },

    openEditForm: (state) => {
      state.form.open = true;
      state.form.type = "update";
      state.form.title = "Edit Dokumen";
      state.form.data = {
        id: action.payload.id,
        kantor_id: action.payload.kantor_id,
        tanggal: action.payload.tanggal,
        jenis_dokumen: action.payload.jenis_dokumen,
        keterangan: action.payload.keterangan,
        file: "",
      };
    },

    closeForm: (state) => {
      state.form.open = false;
    },
  },
});

export const { openCreateForm, openEditForm, closeForm } = dokumenSlice.actions;

export default dokumenSlice.reducer;
