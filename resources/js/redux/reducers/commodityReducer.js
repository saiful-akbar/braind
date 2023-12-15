import { createSlice } from "@reduxjs/toolkit";

const commoditySlice = createSlice({
  name: "commodity",

  /**
   * Nilai default.
   */
  initialState: {
    open: false,
    type: "add",
    data: {
      id: "",
      name: "",
    },
  },

  reducers: {
    /**
     * membuka modal untuk menambah data commodity
     */
    addCommodity: (state) => {
      state.open = true;
      state.data = {
        id: "",
        name: "",
      };
    },

    /**
     * membuka modal untuk edit commodity
     */
    editCommodity: (state, action) => {
      const { id, name } = action.payload;
      state.open = true;
      state.data = {
        id,
        name,
      };
    },

    /**
     * menutup modal commodity
     */
    closeFormCommodity: (state) => {
      state.open = false;
    },
  },
});

export const { addCommodity, editCommodity, closeFormCommodity } =
  commoditySlice.actions;

export default commoditySlice.reducer;
