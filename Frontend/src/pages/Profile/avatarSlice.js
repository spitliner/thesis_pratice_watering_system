import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: ''
};
// create slice
export const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.url = action.payload;
    }
  }
});

export const { setAvatar } = avatarSlice.actions;
export default avatarSlice.reducer;
