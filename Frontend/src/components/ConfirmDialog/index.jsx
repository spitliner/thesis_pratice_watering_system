import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import React from 'react';

export default function ConfirmDialog(props) {
  const { open, handleClose, onDelete, device, title } = props;
  const handleDelete = () => {
    onDelete(device?.id);
    handleClose(false);
  };
  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
        Delete {title}
      </DialogTitle>
      <DialogContent>
        Do you really want to delete {device?.name}?
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'grey.500' }}
          onClick={() => handleClose(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
