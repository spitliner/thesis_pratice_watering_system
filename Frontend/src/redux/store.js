import { configureStore } from '@reduxjs/toolkit';
import avatarSlice from '../pages/Profile/avatarSlice';

export const store = configureStore({
  reducer: {
    avatar: avatarSlice,
  }
});
