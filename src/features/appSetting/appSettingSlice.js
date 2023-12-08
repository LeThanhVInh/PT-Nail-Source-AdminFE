import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkModeOn: false,
  value: 0,
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
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = appSetting.actions;

export default appSetting.reducer;
