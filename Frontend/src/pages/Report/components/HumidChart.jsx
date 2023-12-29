import React from 'react';
import Chart from './Chart';

const HumidChart = (props) => {
  const icon = (
    <img
      width="40"
      height="40"
      src="https://img.icons8.com/officel/40/hygrometer.png"
      alt="hygrometer"
    />
  );
  return (
    <Chart
      {...props}
      dataKey="humidity"
      label="Humidity"
      color="#7E30E1"
      unit="%"
    />
  );
};

export default HumidChart;
