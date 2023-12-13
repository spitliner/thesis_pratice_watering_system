import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { fetchHistoricWeatherData } from '../../../common/weatherAPI';
import dayjs from 'dayjs';

const Charts = (props) => {
  const [chartData, setChartData] = useState(null);
  const [dataList, setDataList] = useState([]);

  const getData = async () => {
    const data = await fetchHistoricWeatherData({
      start_date: props?.date?.format('YYYY-MM-DD'),
      end_date: props?.date?.format('YYYY-MM-DD'),
      hourly: 'temperature_2m,rain'
    });
    setChartData(data.hourly);
  };

  useEffect(() => {
    getData();
  }, [props]);

  useEffect(() => {
    let tmpList = [];
    for (let i = 0; i < chartData?.time?.length; i++) {
      const dataObject = {
        time: dayjs(chartData?.time[i])?.format('HH'),
        temperature: chartData?.temperature_2m[i],
        rain: chartData?.rain[i]
      };
      tmpList.push(dataObject);
    }
    setDataList(tmpList);
  }, [chartData]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: 5
      }}
    >
      {/* Line Chart */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h3>Temperture</h3>
        <LineChart
          width={480}
          height={260}
          data={dataList}
          margin={{ left: 25, right: 10, bottom: 25, top: 10 }}
        >
          <XAxis
            dataKey="time"
            label={{ value: 'Hour', position: 'insideBottom', offset: -15 }}
          />
          <YAxis
            label={{
              value: 'Temperture (°C)',
              angle: -90,
              position: 'insideLeft',
              dy: 50,
              offset: -5
            }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#EF4040" />
        </LineChart>
      </Box>

      {/* Bar Chart */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h3>Rainfall</h3>
        <BarChart
          width={480}
          height={260}
          data={dataList}
          margin={{ left: 25, right: 10, bottom: 25, top: 10 }}
        >
          <XAxis
            dataKey="time"
            label={{ value: 'Hour', position: 'insideBottom', offset: -15 }}
          />
          <YAxis
            label={{
              value: 'Rainfall (mm)',
              angle: -90,
              position: 'insideLeft',
              dy: 50,
              offset: -5
            }}
          />
          <Tooltip />
          <Bar dataKey="rain" fill="#5FBDFF" />
        </BarChart>
      </Box>
    </Box>
  );
};

export default Charts;
