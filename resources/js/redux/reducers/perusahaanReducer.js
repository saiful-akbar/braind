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
      data: {
        id: "",
        nama: "",
      },
    },

    delete: {
      type: "remove",
      id: null,
      processing: false,
      title: "Hapus perusahaan",
    },

    restore: {
      id: null,
      processing: false,
      title: "Pulihkan perusahaan",
    },

    import: {
      open: false,
    },
  },

  reducers: {
    createPerusahaan: (state) => {
      state.form = {
        type: "create",
        open: true,
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
        data: {
          id,
          nama,
        },
      };
    },

    closeFormPerusahaan: (state) => {
      state.form.open = false;
    },

    openDeleteConfirmation: (state, action) => {
      const { id, type } = action.payload;

      state.delete.id = id;
      state.delete.type = type;

      if (type === "remove") {
        state.delete.title = "Hapus perusahaan";
      } else {
        state.delete.title = "Hapus selamanya";
      }
    },

    closeDeleteConfirmation: (state) => {
      state.delete.id = null;
    },

    deleting: (state, action) => {
      state.delete.processing = action.payload;
    },

    openRestoreConfirmation: (state, action) => {
      state.restore.id = action.payload;
      state.restore.processing = false;
    },

    closeRestoreConfirmation: (state) => {
      state.restore.id = null;
    },

    restoring: (state, action) => {
      state.restore.processing = action.payload;
    },

    openModalFormlImportPerusahaan: (state) => {
      state.import.open = true;
    },

    closeModalFormlImportPerusahaan: (state) => {
      state.import.open = false;
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
  openDeleteConfirmation,
  closeDeleteConfirmation,
  deleting,
  openRestoreConfirmation,
  closeRestoreConfirmation,
  restoring,
  openModalFormlImportPerusahaan,
  closeModalFormlImportPerusahaan,
} = perusahaanSlice.actions;

/**
 * Reducer
 */
export default perusahaanSlice.reducer;
