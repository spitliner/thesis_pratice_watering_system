import { configureStore } from '@reduxjs/toolkit';
import avatarSlice from '../pages/Profile/avatarSlice';
import deviceListSlice from '../pages/Report/deviceListSlice';

export const store = configureStore({
  reducer: {
    avatar: avatarSlice,
    deviceList: deviceListSlice
  }
});
