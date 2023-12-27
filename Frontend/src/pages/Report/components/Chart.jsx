import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import dayjs from 'dayjs';
import useQueryDeviceById from '../hooks/useQueryDeviceById';

const Chart = ({ date, deviceID, dataKey, label, color }) => {
  const { data } = useQueryDeviceById(deviceID);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (date) {
      const selectedDateList = data?.feed.filter((item) => {
        return (
          dayjs(date).format('DD/MM/YYYY') ===
          dayjs(item.time).format('DD/MM/YYYY')
        );
      });
      const chartData = selectedDateList?.map((_, index) => ({
        time: dayjs(selectedDateList[index].time).format('HH:mm'),
        [dataKey]: selectedDateList[index].data
      }));
      chartData?.reverse();
      setDataList(chartData);
    }
  }, [data?.feed, date]);

  if (!data)
    return (
      <Typography fontSize={18} fontWeight={700} color="error">
        No {label.toLowerCase()} device
      </Typography>
    );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography fontSize={22} fontWeight={700} color={color}>
        {label}
      </Typography>
      {dataList?.length <= 0 ? (
        <Box
          width={500}
          height={260}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            fontSize={15}
            fontWeight={700}
            color="gray"
            fontStyle="italic"
          >
            No data
          </Typography>
        </Box>
      ) : (
        <LineChart
          width={500}
          height={300}
          data={dataList}
          margin={{ left: 25, right: 10, bottom: 25, top: 10 }}
        >
          <XAxis
            dataKey="time"
            label={{ value: 'Time', position: 'insideBottom', offset: -15 }}
            tickMaxStep={100 * 60}
          />
          <YAxis
            label={{
              value: `${label} (${dataKey === 'humidity' ? '%' : '°C'})`,
              angle: -90,
              position: 'insideLeft',
              dy: 50,
              offset: -5
            }}
          />
          <Tooltip />
          <Line dataKey={dataKey} stroke={color} />
        </LineChart>
      )}
    </Box>
  );
};

export default Chart;
