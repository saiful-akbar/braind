import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice
 */
export const perusahaanSlice = createSlice({
  name: "perusahaan",

  initialState: {
    form: {
      type: "create",
      open: false,
      loading: false,
      data: {
        id: "",
        nama: "",
      },
    },
  },

  reducers: {
    createPerusahaan: (state) => {
      state.form = {
        type: "create",
        open: true,
        loading: false,
        data: {
          id: "",
          nama: "",
        },
      };
    },

    updatePerusahaan: (state, action) => {
      const { id, nama } = action.payload;
      state.form = {
        type: "update",
        open: true,
        loading: false,
        data: {
          id,
          nama,
        },
      };
    },

    closeFormPerusahaan: (state) => {
      state.form.open = false;
    },

    loadingFormPerusahaan: (state, action) => {
      state.form.loading = action.payload;
    },
  },
});

/**
 * Actions
 */
export const {
  createPerusahaan,
  updatePerusahaan,
  closeFormPerusahaan,
  loadingFormPerusahaan,
} = perusahaanSlice.actions;

/**
 * Reducer
 */
export default perusahaanSlice.reducer;
