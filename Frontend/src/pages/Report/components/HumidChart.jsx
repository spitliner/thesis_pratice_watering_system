import React from 'react';
import Chart from './Chart';

const HumidChart = (props) => {
  return (
    <Chart
      {...props}
      dataKey="humidity"
      label="Humidity"
      color="#7E30E1"
      unit="%"
      range={[30, 80]}
    />
  );
};

export default HumidChart;
