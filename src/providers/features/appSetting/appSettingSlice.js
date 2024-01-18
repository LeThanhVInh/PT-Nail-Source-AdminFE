import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkModeOn: localStorage.getItem('DarkMode') ? JSON.parse(localStorage.getItem('DarkMode')) : false,
  mainTheme: localStorage.getItem('MainTheme') ? JSON.parse(localStorage.getItem('MainTheme')) : 'light-theme',
};

export const appSetting = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    switchDarkMode: (state) => {
      state.isDarkModeOn = !state.isDarkModeOn;
      localStorage.setItem('DarkMode', JSON.stringify(state.isDarkModeOn));
    },
    changeMainTheme: (state, action) => {
      state.isDarkModeOn = false;
      state.mainTheme = action.payload;
      localStorage.setItem('MainTheme', JSON.stringify(state.mainTheme));
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchDarkMode, changeMainTheme } = appSetting.actions;

export default appSetting.reducer;
