import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./reducers/sidebarReducer";
import settingsReducer from "./reducers/settingsReducer";
import notificationReducer from "./reducers/notificationReducer";
import kantorReducer from "./reducers/kantorReducer";
import komoditiReducer from "./reducers/komoditiReducer";
import perusahaanHtHptlReducer from "./reducers/perusahaanHtHptlReducer";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    settings: settingsReducer,
    notification: notificationReducer,
    kantor: kantorReducer,
    komoditi: komoditiReducer,
    perusahaanHtHptl: perusahaanHtHptlReducer,
  },
});

export default store;
