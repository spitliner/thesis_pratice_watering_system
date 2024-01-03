import React, { useEffect, useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  ReferenceLine,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import useQueryDeviceById from '../hooks/useQueryDeviceById';
import dayjs from 'dayjs';
import Card from '../../../components/Card';
import { Box, Typography } from '@mui/material';

export default function ErrorBarChart(props) {
  const { date, humidDeviceID, tempDeviceID, humidRange, tempRange } = props;
  const { data: humid } = useQueryDeviceById(humidDeviceID);
  const { data: temp } = useQueryDeviceById(tempDeviceID);
  const [chartData, setChartData] = useState([]);

  const selectedDateHumid = useMemo(() => {
    return humid?.feed?.filter(
      (item) =>
        dayjs(date).format('DD/MM/YYYY') ===
        dayjs(item.time).format('DD/MM/YYYY')
    );
  });

  const selectedDateTemp = useMemo(() => {
    return temp?.feed?.filter(
      (item) =>
        dayjs(date).format('DD/MM/YYYY') ===
        dayjs(item.time).format('DD/MM/YYYY')
    );
  });

  const selectedDateList = useMemo(() => {
    if (selectedDateHumid && selectedDateTemp) {
      return selectedDateHumid.map((item, i) => ({
        humidity: item.data,
        temperature: selectedDateTemp[i]?.data || null
      }));
    } else {
      return [];
    }
  }, [selectedDateHumid, selectedDateTemp]);

  useEffect(() => {
    if (!selectedDateList) return;
    const errorDataList = selectedDateList
      .filter(
        (item) =>
          item.humidity < humidRange[0] ||
          item.humidity > humidRange[1] ||
          item.temperature < tempRange[0] ||
          item.temperature > tempRange[1]
      )
      .sort((a, b) => a.temperature - b.temperature);
    setChartData(errorDataList);
  }, [selectedDateList.length]);
  debugger;
  console.log(chartData);
  return (
    <Card>
      <Typography fontSize={22} fontWeight={700} color="#1A5D1A" mb={5}>
        Data exceed the threshold
      </Typography>
      {chartData.length > 0 ? (
        <ScatterChart
          width={1100}
          height={300}
          margin={{ top: 50, right: 20, bottom: 30, left: 30 }}
        >
          <XAxis
            dataKey="temperature"
            name="Temperature"
            unit="°C"
            tickSize={10}
            domain={[0, 45]}
            label={{
              value: 'Temperature',
              position: 'insideBottom',
              offset: -20
            }}
            type="number"
          />
          <YAxis
            dataKey="humidity"
            name="Humidity"
            unit="%"
            tickSize={10}
            domain={[0, 100]}
            label={{
              value: 'Humidity',
              position: 'insideTopLeft',
              offset: -40,
              dx: 30
            }}
            type="number"
          />
          <Tooltip />
          <ReferenceLine
            x={tempRange[0]}
            label={`${tempRange[0]} °C`}
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            x={tempRange[1]}
            label={`${tempRange[1]} °C`}
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={humidRange[0]}
            label={`${humidRange[0]} %`}
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={humidRange[1]}
            label={`${humidRange[1]} %`}
            stroke="red"
            strokeDasharray="3 3"
          />
          <Scatter data={chartData} fill="#ff7300" />
        </ScatterChart>
      ) : (
        <Box
          width={500}
          height={260}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize={20} fontWeight={700} color="gray">
            No data
          </Typography>
        </Box>
      )}
    </Card>
  );
}
