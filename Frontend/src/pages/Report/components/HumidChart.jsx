import React from 'react';
import Chart from './Chart';
import { deviceRange } from '../../../constants/device';

const HumidChart = (props) => {
  return (
    <Chart
      {...props}
      dataKey="humidity"
      label="Humidity"
      color="#7E30E1"
      unit="%"
      range={deviceRange.humidRange}
    />
  );
};

export default HumidChart;
