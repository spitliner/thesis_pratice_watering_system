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
      range={[30, 85]}
    />
  );
};

export default HumidChart;
