import { configureStore } from "@reduxjs/toolkit";
import appSettingReducer from "../features/appSetting/appSettingSlice";

export const store = configureStore({
  reducer: {
    appSetting: appSettingReducer,
  },
});
