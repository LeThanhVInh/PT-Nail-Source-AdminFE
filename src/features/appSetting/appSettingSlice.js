import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkModeOn: localStorage.getItem("DarkMode")
    ? JSON.parse(localStorage.getItem("DarkMode"))
    : false,
};

export const appSetting = createSlice({
  name: "appSetting",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    switchDarkMode: (state) => {
      state.isDarkModeOn = !state.isDarkModeOn;
      // console.log(state.isDarkModeOn);
      localStorage.setItem("DarkMode", JSON.stringify(state.isDarkModeOn));
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, switchDarkMode } =
  appSetting.actions;

export default appSetting.reducer;
