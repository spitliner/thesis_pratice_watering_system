// import { Box, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend
// } from 'recharts';
// import dayjs from 'dayjs';
// import useQueryDeviceById from '../hooks/useQueryDeviceById';

// const HumidChart = (props) => {
//   const { date, deviceID } = props;
//   const { data: humidData } = useQueryDeviceById(deviceID);
//   console.log('humid: ', humidData);
//   const [dataList, setDataList] = useState([]);

//   useEffect(() => {
//     if (date) {
//       const selectedDateList = humidData?.feed.filter((item) => {
//         return (
//           dayjs(date).format('DD/MM/YYYY') ===
//           dayjs(item.time).format('DD/MM/YYYY')
//         );
//       });
//       const chartData = selectedDateList?.map((_, index) => ({
//         time: dayjs(selectedDateList[index].time).format('HH:mm'),
//         humidity: selectedDateList[index].data
//       }));
//       chartData?.reverse();
//       setDataList(chartData);
//     }
//   }, [humidData, date]);

//   if (!humidData)
//     return (
//       <Typography fontSize={18} fontWeight={700} color="error">
//         No humidity device
//       </Typography>
//     );

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center'
//       }}
//     >
//       <Typography fontSize={22} fontWeight={700} color="#7E30E1">
//         Humidity
//       </Typography>
//       {dataList?.length <= 0 ? (
//         <Box
//           width={500}
//           height={260}
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Typography
//             fontSize={15}
//             fontWeight={700}
//             color="gray"
//             fontStyle="italic"
//           >
//             No data
//           </Typography>
//         </Box>
//       ) : (
//         <LineChart
//           width={500}
//           height={260}
//           data={dataList}
//           margin={{ left: 25, right: 10, bottom: 25, top: 10 }}
//         >
//           <XAxis
//             dataKey="time"
//             label={{ value: 'Time', position: 'insideBottom', offset: -15 }}
//           />
//           <YAxis
//             label={{
//               value: 'Humidity (%)',
//               angle: -90,
//               position: 'insideLeft',
//               dy: 50,
//               offset: -5
//             }}
//           />
//           <Tooltip />
//           <Line dataKey="humidity" fill="#7E30E1" />
//         </LineChart>
//       )}
//     </Box>
//   );
// };

// export default HumidChart;

// HumidChart.js
import React from 'react';
import Chart from './Chart';

const HumidChart = (props) => {
  return (
    <Chart {...props} dataKey="humidity" label="Humidity" color="#7E30E1" />
  );
};

export default HumidChart;
