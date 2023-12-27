import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useQueryDevice from '../../Device/hooks/useQueryDevice';
import { deviceType } from '../../../constants/device';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const Table = (props) => {
  const { deviceList } = props;
  const [row, setRow] = useState([]);

  useEffect(() => {
    const rows = deviceList
      .filter((device) => device.type === deviceType.water)
      .map((device) => {
        let schedules = 'Free';

        if (device.schedules && device.schedules.length > 0) {
          device.schedules.sort((a, b) =>
            dayjs(a[0], 'HH:mm').diff(dayjs(b[0], 'HH:mm'), 'second')
          );
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
        border: '1px solid #666666',
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
  );
};

export default Table;
