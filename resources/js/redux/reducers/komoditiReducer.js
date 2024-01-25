import { createSlice } from "@reduxjs/toolkit";

const komoditiSlice = createSlice({
  name: "komoditi",

  initialState: {
    form: {
      open: false,
      type: "create",
      data: {
        id: "",
        kode: "",
      },
    },
    import: {
      open: false,
    },
  },

  reducers: {
    createKomoditi: (state) => {
      state.form.open = true;
      state.form.type = "create";
      state.form.data = {
        id: "",
        kode: "",
      };
    },

    updateKomoditi: (state, action) => {
      state.form.open = true;
      state.form.type = "update";
      state.form.data = {
        id: action.payload.id,
        kode: action.payload.kode,
      };
    },

    closeFormKomoditi: (state) => {
      state.form.open = false;
    },

    openModalImportKomoditi: (state) => {
      state.import.open = true;
    },

    closeModalImportKomoditi: (state) => {
      state.import.open = false;
    },
  },
});

export const {
  createKomoditi,
  updateKomoditi,
  closeFormKomoditi,
  openModalImportKomoditi,
  closeModalImportKomoditi,
} = komoditiSlice.actions;
export default komoditiSlice.reducer;
