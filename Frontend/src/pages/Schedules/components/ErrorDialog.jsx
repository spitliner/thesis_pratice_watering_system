import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';

export default function ErrorDialog(props) {
  const { open, onClose } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={onClose}
      style={{ justifyContent: 'center' }}
    >
      <Alert open={open} severity="error" sx={{ width: 400 }}>
        <AlertTitle>Time between each schedule must {'>'} 300s !</AlertTitle>
      </Alert>
    </Snackbar>
  );
}
