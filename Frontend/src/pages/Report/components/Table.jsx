import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { deviceType } from '../../../constants/device';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Box, Typography } from '@mui/material';
import Card from '../../../components/Card';
dayjs.extend(customParseFormat);
import watering from '../../../assets/animation/watering.json';
import Lottie from 'react-lottie';

const WateringIcon = {
  loop: true,
  autoplay: true,
  animationData: watering,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Table = (props) => {
  const { deviceList } = props;
  const [row, setRow] = useState([]);
  const [freeDevice, setFreeDevice] = useState(0);
  const [totalDevice, setTotalDevice] = useState(0);

  useEffect(() => {
    const rows = deviceList
      .filter((device) => device.type === deviceType.water)
      .map((device) => {
        let schedules = 'Free';

        if (device.schedules && device.schedules.length > 0) {
          schedules = device.schedules
            .map(([schedule, duration]) => `${schedule} for ${duration}s`)
            .join('\n');
        }

        return {
          id: device.id,
          device: device.name,
          username: device.adaUsername,
          apikey: `${device.apiKey.slice(0, 10)}****`,
          feedID: device.feedID,
          schedule: schedules
        };
      });
    setRow(rows);
    setTotalDevice(rows.length);
    setFreeDevice(rows.filter((row) => row.schedule === 'Free').length);
  }, [deviceList]);

  const columns = [
    {
      field: 'device',
      headerName: 'Device',
      width: 250
    },
    {
      field: 'username',
      headerName: 'Adafruit user',
      width: 220
    },
    {
      field: 'apikey',
      headerName: 'Api key',
      width: 200
    },
    {
      field: 'feedID',
      headerName: 'Feed ID',
      width: 220
    },
    {
      field: 'schedule',
      headerName: 'Schedule',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'pre-line' }}>{params.value}</div>
      )
    }
  ];

  return (
    <Card>
      <Box display="flex" alignItems="center" mb={3} columnGap={1}>
        <Typography fontWeight={700} fontSize={22} color="#5C8374">
          Pump status
        </Typography>
        <Box height={80} width={80}>
          <Lottie options={WateringIcon} />
        </Box>
        <Box>
          <Typography width={150} fontWeight={700} ml={8} mb={2}>
            Total devices: {totalDevice}
          </Typography>
          <Typography width={150} fontWeight={700} ml={8} color="gray">
            Free devices: {freeDevice}
          </Typography>
        </Box>
      </Box>
      <DataGrid
        rows={row}
        columns={columns}
        disableColumnMenu
        hideFooterSelectedRowCount
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4
            }
          }
        }}
        getRowHeight={() => 'auto'}
        sx={{
          minHeight: 208,
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
            py: '15px'
          },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
            py: '22px'
          },
          '.MuiDataGrid-columnHeaderTitle': { fontWeight: 700 }
        }}
      />
    </Card>
  );
};

export default Table;
