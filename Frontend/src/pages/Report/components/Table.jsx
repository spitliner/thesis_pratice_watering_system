import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useQueryDevice from '../../Device/hooks/useQueryDevice';

const Table = (props) => {
  const { deviceList } = props;
  const [row, setRow] = useState([]);

  useEffect(() => {
    const rows = [];
    for (let i in deviceList) {
      rows.push({
        id: deviceList[i].id,
        device: deviceList[i].name,
        water: 100
      });
    }
    setRow(rows);
  }, [deviceList]);
  // deviceList?.map((device) => {});
  // const rows = [
  //   {
  //     id: 1,
  //     device: 'KV01',
  //     water: '2000ml'
  //   },
  //   {
  //     id: 2,
  //     device: 'KV02',
  //     water: '2000ml'
  //   },
  //   {
  //     id: 3,
  //     device: 'KV03',
  //     water: '300ml'
  //   },
  //   {
  //     id: 4,
  //     device: 'KV04',
  //     water: '1000ml'
  //   }
  // ];
  const columns = [
    {
      field: 'device',
      headerName: 'Device',
      width: 250
    },
    {
      field: 'water',
      headerName: 'Water comsumed (ml)',
      width: 250
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
