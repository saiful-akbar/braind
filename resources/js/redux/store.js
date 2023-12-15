import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./reducers/sidebarReducer";
import settingsReducer from "./reducers/settingsReducer";
import notificationReducer from "./reducers/notificationReducer";
import commodityReducer from "./reducers/commodityReducer";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    settings: settingsReducer,
    notification: notificationReducer,
    commodity: commodityReducer,
  },
});

export default store;
