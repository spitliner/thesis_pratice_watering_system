import React, { useEffect, useState, useMemo } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Snackbar,
  Typography
} from '@mui/material';
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ReferenceLine
} from 'recharts';
import dayjs from 'dayjs';
import useQueryDeviceById from '../hooks/useQueryDeviceById';
import Card from '../../../components/Card';
import temp from '../../../assets/animation/temp.json';
import humid from '../../../assets/animation/humid.json';
import Lottie from 'react-lottie';
import Circle from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

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
  const { date, deviceID, dataKey, label, color, unit, range } = props;
  const { data } = useQueryDeviceById(deviceID);
  const [chartData, setChartData] = useState([]);
  const [chartValues, setChartValues] = useState({
    max: 0,
    min: 0,
    current: 0,
    prev: null
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [warning, setWarning] = useState(false);

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

    if (current === null) setErrorMessage(`No data for this day`);
    else if (current > range[1]) {
      setErrorMessage(`Higher than normal`);
      setWarning(true);
    } else if (current < range[0]) {
      setErrorMessage(`Lower than normal`);
      setWarning(true);
    } else {
      setWarning(false);
      setErrorMessage(null);
    }
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
          <Box display="flex" flexDirection="column">
            <Box width={200} display="flex" alignItems="center">
              <Typography fontWeight={700}>
                Current:{' '}
                {(chartValues.current && chartValues.current + unit) ||
                  'No data'}
              </Typography>
              {chartValues.prev &&
                (chartValues.current > chartValues.prev ? (
                  <Up />
                ) : chartValues.current < chartValues.prev ? (
                  <Down />
                ) : (
                  ''
                ))}
            </Box>
            <Box sx={{ display: 'flex', mt: 2 }}>
              {errorMessage ? (
                <>
                  <Typography fontWeight={700} sx={{ color: '#B80000' }}>
                    {errorMessage}
                  </Typography>
                  <Circle
                    color="error"
                    fontSize="5"
                    sx={{
                      alignSelf: 'center',
                      display: 'flex',
                      ml: 1
                    }}
                  />
                </>
              ) : (
                <>
                  <Typography fontWeight={700} sx={{ color: '#739072' }}>
                    Normal
                  </Typography>
                  <Circle
                    fontSize="51"
                    sx={{
                      alignSelf: 'center',
                      display: 'flex',
                      ml: 1,
                      color: '#FFB534'
                    }}
                  />
                </>
              )}
            </Box>
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
          <Typography fontSize={20} fontWeight={700} color="gray">
            No data
          </Typography>
        </Box>
      ) : (
        <AreaChart
          width={1100}
          height={260}
          data={chartData}
          margin={{ left: 25, right: 20, bottom: 25, top: 10 }}
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
            interval={3}
          />
          <YAxis unit={unit} tickSize={10} />
          <Tooltip />
          <ReferenceLine
            y={range[0]}
            label={range[0]}
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={range[1]}
            label={range[1]}
            stroke="red"
            strokeDasharray="3 3"
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            fillOpacity={1}
            fill={`url(#${dataKey})`}
          />
        </AreaChart>
      )}
      <Snackbar
        key={dataKey}
        open={warning}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ boxShadow: '0px 1px 6px #aae2f7' }}
      >
        <Alert open={warning} severity="error">
          <AlertTitle sx={{ display: 'flex', flexDirection: 'column' }}>
            WARNING: {dataKey} is {errorMessage?.toLowerCase()} !
            <Box>
              <Button component={Link} to="/schedules">
                Adjust watering schedule
              </Button>
              <Button sx={{ color: 'gray' }} onClick={() => setWarning(false)}>
                Dismiss
              </Button>
            </Box>
          </AlertTitle>
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Chart;
