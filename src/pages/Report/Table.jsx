import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = () => {
  const rows = [
    {
      id: 1,
      device: "KV01",
      status: "GOOD",
      time: "17:30",
      water: "2000ml",
    },
    {
      id: 2,
      device: "KV02",
      status: "GOOD",
      time: "17:30",
      water: "2000ml",
    },
    {
      id: 3,
      device: "KV03",
      status: "ERROR",
      time: "12:30",
      water: "300ml",
    },
    {
      id: 4,
      device: "KV04",
      status: "GOOD",
      time: "17:30",
      water: "1000ml",
    },
  ];
  const columns = [
    {
      field: "device",
      headerName: "Device",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
    },
    {
      field: "time",
      headerName: "Last operating time",
      width: 250,
    },
    {
      field: "water",
      headerName: "Water comsumed",
      width: 250,
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableColumnMenu
      hideFooterSelectedRowCount
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 4,
          },
        },
      }}
      getRowHeight={() => "auto"}
      sx={{
        minHeight: 208,
        "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "8px" },
        "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
          py: "15px",
        },
        "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
          py: "22px",
        },
        ".MuiDataGrid-columnHeaderTitle": { fontWeight: 700 },
      }}
    />
  );
};

export default Table;
