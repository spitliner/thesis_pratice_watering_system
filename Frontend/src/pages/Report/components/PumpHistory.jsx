import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import useQueryDeviceById from '../hooks/useQueryDeviceById';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { saveAs } from 'file-saver'; // Import saveAs from file-saver
import * as XLSX from 'xlsx';

export default function PumpHistory(props) {
  const { id, open, onClose, deviceName } = props;
  const { data } = useQueryDeviceById(id);
  const [row, setRow] = useState([]);
  const [date, setDate] = useState(dayjs());

  const selectedDateList = useMemo(() => {
    return data?.feed?.filter(
      (item) =>
        dayjs(date).format('DD/MM/YYYY') ===
        dayjs(item.time).format('DD/MM/YYYY')
    );
  }, [data?.feed, date]);
  console.log(selectedDateList);

  const handleDownloadExcel = () => {
    if (row.length > 0) {
      const ws = XLSX.utils.json_to_sheet(row);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      saveAs(data, `pumpHistory_${deviceName}.xlsx`);
    }
  };

  useEffect(() => {
    if (selectedDateList) {
      const rows = selectedDateList.map((device, index) => {
        return {
          id: index,
          time: dayjs(device.time).format('HH:mm:ss'),
          status: device.data
        };
      });
      setRow(rows);
    }
  }, [selectedDateList]);

  const columns = [
    {
      field: 'time',
      headerName: 'Time',
      width: 250
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 250
    }
  ];

  return (
    <Dialog open={open}>
      <DialogTitle textAlign={'center'}>
        Pump History : {deviceName}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" mb={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              maxDate={dayjs()}
              value={date}
              onChange={(val) => {
                setDate(dayjs(val));
              }}
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
        </Box>
        {row.length > 0 ? (
          <DataGrid
            rows={row}
            columns={columns}
            disableColumnMenu
            hideFooterSelectedRowCount
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 7
                }
              }
            }}
            getRowHeight={() => 'auto'}
            sx={{
              minHeight: 470,
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                py: '8px'
              },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                py: '15px'
              },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                py: '22px'
              },
              '.MuiDataGrid-columnHeaderTitle': { fontWeight: 700 }
            }}
          />
        ) : (
          <Container sx={{ minWidth: 300 }}>
            <Typography color="gray" textAlign="center">
              No data available.
            </Typography>
          </Container>
        )}
      </DialogContent>
      <DialogActions sx={{ display: 'flex', flexDirection: 'row' }}>
        <Button
          variant="contained"
          onClick={handleDownloadExcel}
          sx={{ width: 150 }}
        >
          Download Excel
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ width: 150 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
