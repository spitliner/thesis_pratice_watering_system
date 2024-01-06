import { Box, Button } from '@mui/material';
import React from 'react';

export default function ButtonGroup(props) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#aed581',
          width: '45%'
        }}
      >
        Save
      </Button>
      <Button
        type="button"
        variant="contained"
        color="error"
        sx={{
          width: '45%'
        }}
        onClick={props.onClose}
      >
        Cancel
      </Button>
    </Box>
  );
}
