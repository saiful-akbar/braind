import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./reducers/sidebarReducer";
import settingsReducer from "./reducers/settingsReducer";
import notificationReducer from "./reducers/notificationReducer";
import komoditiReducer from "./reducers/komoditiReducer";
import sbpReducer from "./reducers/sbpReducer";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    settings: settingsReducer,
    notification: notificationReducer,
    komoditi: komoditiReducer,
    sbp: sbpReducer,
  },
});

export default store;
