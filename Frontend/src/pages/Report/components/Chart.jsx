import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import dayjs from 'dayjs';
import useQueryDeviceById from '../hooks/useQueryDeviceById';
import Card from '../../../components/Card';
import temp from '../../../assets/animation/temp.json';
import humid from '../../../assets/animation/humid.json';
import Lottie from 'react-lottie';

const TempIcon = {
  loop: true,
  autoplay: true,
  animationData: temp,
  rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
};
const HumidIcon = {
  loop: true,
  autoplay: true,
  animationData: humid,
  rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
};

const Down = () => {
  return (
    <img
      width="16"
      height="16"
      src="https://img.icons8.com/color/48/down--v1.png"
      alt="down--v1"
    />
  );
};
const Up = () => {
  return (
    <img
      width="16"
      height="16"
      src="https://img.icons8.com/ios-glyphs/30/FA5252/up--v1.png"
      alt="up--v1"
    />
  );
};

const Chart = (props) => {
  const { date, deviceID, dataKey, label, color, unit, icon } = props;
  const { data } = useQueryDeviceById(deviceID);
  const [chartData, setChartData] = useState([]);
  const [chartValues, setChartValues] = useState({
    max: 0,
    min: 0,
    current: 0,
    prev: null
  });

  const selectedDateList = useMemo(() => {
    return data?.feed?.filter(
      (item) =>
        dayjs(date).format('DD/MM/YYYY') ===
        dayjs(item.time).format('DD/MM/YYYY')
    );
  }, [data?.feed, date]);

  useEffect(() => {
    if (!selectedDateList) return;

    const reversedChartData = selectedDateList
      .map((data) => ({
        time: dayjs(data.time).format('HH:mm'),
        [dataKey]: data.data
      }))
      .reverse();

    setChartData(reversedChartData);

    let { max, min, current, prev } = reversedChartData.reduce(
      (values, currentItem) => {
        const currentValue = currentItem[dataKey];
        return {
          max: Math.max(currentValue, values.max),
          min: Math.min(currentValue, values.min),
          current: currentValue
        };
      },
      { max: -999, min: 999, current: -1 }
    );
    max = max > -999 ? max : null;
    min = min < 999 ? min : null;
    current = current > -1 ? current : null;
    prev =
      reversedChartData?.length > 2
        ? reversedChartData[reversedChartData?.length - 2][dataKey]
        : null;
    setChartValues({ max, min, current, prev });
  }, [selectedDateList, dataKey]);

  if (!data) {
    return (
      <Typography fontSize={18} fontWeight={700} color="error">
        No {label.toLowerCase()} device
      </Typography>
    );
  }

  return (
    <Card>
      <Box display="flex" alignItems="center" mb={5} columnGap={2}>
        <Typography fontSize={22} fontWeight={700} color={color} width={130}>
          {label}
        </Typography>
        <Box height={80} width={80}>
          <Lottie options={label === 'Temperature' ? TempIcon : HumidIcon} />
        </Box>
        <Box display="flex" flexDirection="row" ml={8}>
          <Box width={150} display="flex" alignItems="center">
            <Typography fontWeight={700}>
              Current:{' '}
              {(chartValues.current && chartValues.current + unit) || 'No data'}
            </Typography>
            {chartValues.prev &&
              (chartValues.current > chartValues.prev ? <Up /> : <Down />)}
          </Box>
          <Typography width={150} fontWeight={700} color={color}>
            Highest: {(chartValues.max && chartValues.max + unit) || 'No data'}
          </Typography>
          <Typography width={150} fontWeight={700} color="#00DFA2">
            Lowest: {(chartValues.min && chartValues.min + unit) || 'No data'}
          </Typography>
        </Box>
      </Box>
      {chartData?.length <= 0 ? (
        <Box
          width={500}
          height={260}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            fontSize={20}
            fontWeight={700}
            color="gray"
            fontStyle="italic"
          >
            No data
          </Typography>
        </Box>
      ) : (
        <AreaChart
          width={1100}
          height={260}
          data={chartData}
          margin={{ left: 25, right: 10, bottom: 25, top: 10 }}
        >
          <defs>
            <linearGradient id={dataKey} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            label={{ value: 'Time', position: 'insideBottom', offset: -20 }}
            tickSize={10}
            interval={9}
          />
          <YAxis unit={unit} tickSize={10} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            fillOpacity={1}
            fill={`url(#${dataKey})`}
          />
        </AreaChart>
      )}
    </Card>
  );
};

export default Chart;
