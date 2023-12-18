import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useQueryDevice from '../../Device/hooks/useQueryDevice';
import { deviceType } from '../../../constants/device';

const Table = (props) => {
  const { deviceList } = props;
  const [row, setRow] = useState([]);

  useEffect(() => {
    const rows = [];
    for (let i in deviceList) {
      // if (deviceList[i].type === deviceType.water)
      rows.push({
        id: deviceList[i].id,
        device: deviceList[i].id,
        username: deviceList[i].adaUsername,
        apikey: deviceList[i].apiKey,
        schedule:
          deviceList[i].schedules?.length > 0
            ? deviceList[i].schedules[0][0]
            : 'Free'
        // status: 'On'
      });
    }
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
      width: 250
    },
    {
      field: 'apikey',
      headerName: 'Api key',
      width: 300
    },
    {
      field: 'schedule',
      headerName: 'Schedule',
      width: 300
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
