import React from 'react';
import Chart from './Chart';

const TempChart = (props) => {
  return (
    <Chart
      {...props}
      dataKey="temperature"
      label="Temperature"
      color="#F94C10"
      unit="°C"
      range={[20, 35]}
    />
  );
};

export default TempChart;
