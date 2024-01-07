import React from 'react';
import Chart from './Chart';
import { deviceRange } from '../../../constants/device';

const TempChart = (props) => {
  return (
    <Chart
      {...props}
      dataKey="temperature"
      label="Temperature"
      color="#F94C10"
      unit="°C"
      range={deviceRange.tempRange}
    />
  );
};

export default TempChart;
