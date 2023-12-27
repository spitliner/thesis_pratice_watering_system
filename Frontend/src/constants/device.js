export const deviceType = {
  humid: 'Humidity',
  temp: 'Temperture',
  water: 'Watering'
};

export const deviceTypeOption = Object.keys(deviceType).map((key) => ({
  value: deviceType[key],
  label: deviceType[key]
}));
