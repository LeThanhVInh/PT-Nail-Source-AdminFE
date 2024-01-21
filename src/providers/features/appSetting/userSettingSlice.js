import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idUserToken: null,
};

export const userSetting = createSlice({
  name: 'userSetting',
  initialState,
  reducers: {
    saveIdUserToken: (state, action) => {
      state.idUserToken = action.payload;
    },
  },
});

export const { saveIdUserToken } = userSetting.actions;
export default userSetting.reducer;
