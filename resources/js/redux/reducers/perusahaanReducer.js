import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice
 */
export const perusahaanSlice = createSlice({
  name: "perusahaan",

  initialState: {
    form: {
      type: "store",
      title: "Tambah Perusahaan",
      open: false,
      data: {
        id: "",
        nama: "",
      },
    },

    delete: {
      type: "remove",
      id: null,
      title: "Hapus perusahaan",
    },

    restore: {
      id: null,
      title: "Pulihkan perusahaan",
    },

    import: {
      open: false,
    },
  },

  reducers: {
    openCreateForm: (state) => {
      state.form = {
        type: "store",
        title: "Tambah Perusahaan",
        open: true,
        data: {
          id: "",
          nama: "",
        },
      };
    },

    openEditForm: (state, action) => {
      const { id, nama } = action.payload;
      state.form = {
        type: "update",
        title: "Edit Perusahaan",
        open: true,
        data: {
          id,
          nama,
        },
      };
    },

    closeForm: (state) => {
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

    openRestoreConfirmation: (state, action) => {
      state.restore.id = action.payload;
      state.restore.processing = false;
    },

    closeRestoreConfirmation: (state) => {
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

/**
 * Actions
 */
export const {
  openCreateForm,
  openEditForm,
  closeForm,
  openDeleteConfirmation,
  closeDeleteConfirmation,
  openRestoreConfirmation,
  closeRestoreConfirmation,
  openFormlImport,
  closeFormlImport,
} = perusahaanSlice.actions;

/**
 * Reducer
 */
export default perusahaanSlice.reducer;
