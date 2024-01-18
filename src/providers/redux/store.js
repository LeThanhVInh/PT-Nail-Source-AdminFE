import { configureStore } from '@reduxjs/toolkit';
import appSettingReducer from '../features/appSetting/appSettingSlice';
import userSettingReducer from '../features/appSetting/userSettingSlice';

export const store = configureStore({
  reducer: {
    appSetting: appSettingReducer,
    userSetting: userSettingReducer,
  },
});
