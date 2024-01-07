export const deviceType = {
  humid: 'Humidity',
  temp: 'Temperture',
  water: 'Watering'
};

export const deviceTypeOption = Object.keys(deviceType).map((key) => ({
  value: deviceType[key],
  label: deviceType[key]
}));

export const deviceRange = {
  tempRange: [20, 35],
  humidRange: [30, 85]
};
