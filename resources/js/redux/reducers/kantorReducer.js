import { createSlice } from "@reduxjs/toolkit";

export const kantorSlice = createSlice({
  name: "kantor",
  initialState: {
    form: {
      type: "create",
      open: false,
      data: {
        id: "",
        nama: "",
      },
    },
    import: {
      open: false,
    },
  },

  reducers: {
    createKantor: (state) => {
      state.form = {
        type: "create",
        open: true,
        data: {
          id: "",
          nama: "",
        },
      };
    },
    updateKantor: (state, action) => {
      state.form = {
        type: "update",
        open: true,
        data: {
          id: action.payload.id,
          nama: action.payload.nama,
        },
      };
    },
    closeFormKantor: (state) => {
      state.form.open = false;
    },
    openModalImportKantor: (state) => {
      state.import.open = true;
    },
    closeModalImportKantor: (state) => {
      state.import.open = false;
    },
  },
});

export const {
  createKantor,
  updateKantor,
  closeFormKantor,
  openModalImportKantor,
  closeModalImportKantor,
} = kantorSlice.actions;

export default kantorSlice.reducer;
