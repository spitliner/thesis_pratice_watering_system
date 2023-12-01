import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function Chart() {
  const data = [
    { week: '1', consumption: 3000 },
    { week: '2', consumption: 3800 },
    { week: '3', consumption: 2500 },
    { week: '4', consumption: 4000 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="consumption" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chart;
