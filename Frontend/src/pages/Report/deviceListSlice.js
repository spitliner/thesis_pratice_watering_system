// create redux slice for device
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  temperatureDevice: [],
  humidityDevice: [],
  pumpDevice: []
};

const deviceListSlice = createSlice({
  name: 'deviceList',
  initialState,
  reducers: {
    setTempDevice: (state, action) => {
      state.temperatureDevice = action.payload;
    },
    setHumDevice: (state, action) => {
      state.humidityDevice = action.payload;
    },
    setPumpDevice: (state, action) => {
      state.pumpDevice = action.payload;
    }
  }
});

export const { setTempDevice, setHumDevice, setPumpDevice } =
  deviceListSlice.actions;
export default deviceListSlice.reducer;
