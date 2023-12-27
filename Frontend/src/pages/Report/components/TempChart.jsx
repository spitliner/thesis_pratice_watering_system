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

// const TempChart = (props) => {
//   const { date, deviceID } = props;
//   const { data: tempData } = useQueryDeviceById(deviceID);
//   console.log('temp: ', tempData);
//   const [dataList, setDataList] = useState([]);

//   useEffect(() => {
//     if (date) {
//       const selectedDateList = tempData?.feed.filter((item) => {
//         return (
//           dayjs(date).format('DD/MM/YYYY') ===
//           dayjs(item.time).format('DD/MM/YYYY')
//         );
//       });
//       const chartData = selectedDateList?.map((_, index) => ({
//         time: dayjs(selectedDateList[index].time).format('HH:mm'),
//         temperature: selectedDateList[index].data
//       }));
//       chartData?.reverse();
//       setDataList(chartData);
//     }
//   }, [tempData, date]);

//   if (!tempData)
//     return (
//       <Typography fontSize={18} fontWeight={700} color="error">
//         No temperature device
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
//       <Typography fontSize={22} fontWeight={700} color="#9A031E">
//         Temperature
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
//             tickMaxStep={100 * 60}
//           />
//           <YAxis
//             label={{
//               value: 'Temperature (°C)',
//               angle: -90,
//               position: 'insideLeft',
//               dy: 50,
//               offset: -5
//             }}
//           />
//           <Tooltip />
//           <Line dataKey="temperature" stroke="#9A031E" />
//         </LineChart>
//       )}
//     </Box>
//   );
// };

// export default TempChart;

// TempChart.js
import React from 'react';
import Chart from './Chart';

const TempChart = (props) => {
  return (
    <Chart
      {...props}
      dataKey="temperature"
      label="Temperature"
      color="#9A031E"
    />
  );
};

export default TempChart;
