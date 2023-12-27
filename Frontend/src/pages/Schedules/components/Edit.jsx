import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  Grid,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useMutateDeviceById from '../hooks/useMutateDeviceById';
import { InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { validSchedule } from '../../../utils';
dayjs.extend(customParseFormat);

function Edit(props) {
  const { device, onClose } = props;
  const { onSaveDataById } = useMutateDeviceById();
  const [schedule, setSchedule] = useState([...device.schedules]);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleCancel = () => {
    onClose();
  };

  const handleTimeChange = (event, index) => {
    const updatedSchedules = [...schedule];
    updatedSchedules[index][0] = event.target.value;
    console.log('update time', index);
    setSchedule(updatedSchedules);
  };

  const handleDurationChange = (event, index) => {
    const updatedSchedules = [...schedule];
    updatedSchedules[index][1] = event.target.value;
    console.log('update duration', index);

    setSchedule(updatedSchedules);
  };

  const handleRemove = (index) => {
    const updatedSchedules = [...schedule];
    updatedSchedules.splice(index, 1);
    setSchedule(updatedSchedules);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validSchedule(schedule);
    setErrorMessage(!isValid);
    if (!isValid) return;

    onSaveDataById([
      device.id,
      'schedules',
      {
        schedules: schedule
      }
    ]);
    setTimeout(onClose, 1000);
    // onClose();
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            alignItems: 'center',
            mt: 4
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" rowGap={3}>
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                {device.name}
              </Typography>

              {schedule.map((_, index) => (
                <Box
                  key={index}
                  flexDirection="row"
                  display="flex"
                  alignItems="center"
                >
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        type="time"
                        label="Start time"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={schedule[index][0]}
                        onChange={(event) => handleTimeChange(event, index)}
                        sx={{ mb: 2 }}
                        required
                      />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        type="number"
                        label="Duration time"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={schedule[index][1]}
                        onChange={(event) => handleDurationChange(event, index)}
                        InputProps={{
                          inputProps: { min: 0 },
                          endAdornment: (
                            <InputAdornment position="end">
                              seconds
                            </InputAdornment>
                          )
                        }}
                        required
                      />
                    </Grid>
                  </Grid>
                  <IconButton onClick={() => handleRemove(index)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                </Box>
              ))}

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#aed581',
                    width: '45%',
                    mt: 2
                  }}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  sx={{
                    width: '45%',
                    mt: 2
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
      <Snackbar
        open={errorMessage}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setErrorMessage(false)}
        style={{ justifyContent: 'center' }}
      >
        <Alert open={errorMessage} severity="error" sx={{ width: 400 }}>
          <AlertTitle>Time between schedules must {'>'} 300s !</AlertTitle>
        </Alert>
      </Snackbar>
    </>
  );
}

export default Edit;
