import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Typography
} from '@mui/material';
import React from 'react';

export default function ConfirmDelete(props) {
  const { open, handleClose, onDelete, device } = props;
  const handleDelete = () => {
    onDelete(device?.id);
    handleClose(false);
  };
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
        Delete device
      </DialogTitle>
      <DialogContent>
        Do you really want to delete {device?.name}?
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
