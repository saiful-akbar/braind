import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./reducers/loadingReducer";
import sidebarReducer from "./reducers/sidebarReducer";
import settingsReducer from "./reducers/settingsReducer";
import notificationReducer from "./reducers/notificationReducer";
import kantorReducer from "./reducers/kantorReducer";
import komoditiReducer from "./reducers/komoditiReducer";
import sbpReducer from "./reducers/sbpReducer";
import perusahaanHtHptlReducer from "./reducers/perusahaanHtHptlReducer";
import perusahaanMmeaReducer from "./reducers/perusahaanMmeaReducer";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    loading: loadingReducer,
    settings: settingsReducer,
    notification: notificationReducer,
    kantor: kantorReducer,
    komoditi: komoditiReducer,
    sbp: sbpReducer,
    perusahaanHtHptl: perusahaanHtHptlReducer,
    perusahaanMmea: perusahaanMmeaReducer,
  },
});

export default store;
