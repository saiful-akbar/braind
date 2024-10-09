import { createSlice } from "@reduxjs/toolkit";

export const ekspedisiSlice = createSlice({
  name: "ekspedisi",
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
    openFormCreateEkspedisi: (state) => {
      state.form = {
        type: "create",
        open: true,
        data: {
          id: "",
          nama: "",
        },
      };
    },

    openFormEditEkspedisi: (state, action) => {
      state.form = {
        type: "edit",
        open: true,
        data: {
          id: action.payload.id,
          nama: action.payload.nama,
        },
      };
    },

    closeFormEkspedisi: (state) => {
      state.form.open = false;
    },

    openModalImportEkspedisi: (state) => {
      state.import.open = true;
    },

    closeModalImportEkspedisi: (state) => {
      state.import.open = false;
    },
  },
});

export const {
  openFormCreateEkspedisi,
  openFormEditEkspedisi,
  closeFormEkspedisi,
  openModalImportEkspedisi,
  closeModalImportEkspedisi,
} = ekspedisiSlice.actions;

export default ekspedisiSlice.reducer;
