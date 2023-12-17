import { createSlice } from "@reduxjs/toolkit";

const commoditySlice = createSlice({
  name: "commodity",

  /**
   * Nilai default.
   */
  initialState: {
    open: false,
    type: "create",
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
      state.type = "create";
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
      state.type = "update";
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
