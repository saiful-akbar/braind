import { configureStore } from "@reduxjs/toolkit";
import appearanceReducer from "./reducers/appearanceReducer";

const store = configureStore({
  reducer: {
    appearance: appearanceReducer,
  },
});

export default store;
