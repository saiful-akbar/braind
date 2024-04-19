import { createSlice } from "@reduxjs/toolkit";

const galeriSlice = createSlice({
  name: "galeri",

  initialState: {
    form: {
      type: "create",
      open: false,
    },

    delete: {
      type: "destroy",
      title: "Hapus Galeri",
      open: false,
      id: null,
    },

    slides: [],
  },

  reducers: {
    openCreateForm: (state) => {
      state.form.type = "create";
      state.form.open = true;
    },

    closeForm: (state) => {
      state.form.open = false;
    },

    openDeleteConfirmation: (state, action) => {
      state.delete.open = true;
      state.delete.id = action.payload;
    },

    closeDeleteConfirmation: (state) => {
      state.delete.open = false;
      state.delete.id = null;
    },

    setSlides: (state, action) => {
      state.slides = action.payload;
    },
  },
});

export const {
  openCreateForm,
  closeForm,
  openDeleteConfirmation,
  closeDeleteConfirmation,
  setSlides,
} = galeriSlice.actions;

export default galeriSlice.reducer;
