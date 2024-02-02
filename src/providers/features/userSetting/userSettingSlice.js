import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authUserData: null,
};

export const userSetting = createSlice({
  name: 'userSetting',
  initialState,
  reducers: {
    saveAuthUserData: (state, action) => {
      state.authUserData = action.payload;
    },
  },
});

export const { saveAuthUserData } = userSetting.actions;
export default userSetting.reducer;
