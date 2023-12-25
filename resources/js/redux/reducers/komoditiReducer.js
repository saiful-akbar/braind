import { createSlice } from "@reduxjs/toolkit";

const komoditiSlice = createSlice({
  name: "komoditi",

  /**
   * Nilai default.
   */
  initialState: {
    open: false,
    type: "create",
    data: {
      id: "",
      kode: "",
    },
  },

  reducers: {
    /**
     * membuka modal untuk menambah data komoditi
     */
    addKomoditi: (state) => {
      state.open = true;
      state.type = "create";
      state.data = {
        id: "",
        kode: "",
      };
    },

    /**
     * membuka modal untuk edit komoditi
     */
    editKomoditi: (state, action) => {
      const { id, kode } = action.payload;

      state.open = true;
      state.type = "update";
      state.data = { id, kode };
    },

    /**
     * menutup modal komoditi
     */
    closeFormKomoditi: (state) => {
      state.open = false;
    },
  },
});

export const { addKomoditi, editKomoditi, closeFormKomoditi } =
  komoditiSlice.actions;

export default komoditiSlice.reducer;
