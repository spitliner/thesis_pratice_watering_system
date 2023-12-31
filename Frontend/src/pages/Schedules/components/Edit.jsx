import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Grid,
  IconButton,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useMutateDeviceById from '../hooks/useMutateDeviceById';
import { InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { validSchedule } from '../../../utils';
import ErrorDialog from './ErrorMessage';
import ButtonGroup from './ButtonGroup';
dayjs.extend(customParseFormat);

function Edit(props) {
  const { device, onClose } = props;
  const { onSaveDataById } = useMutateDeviceById();
  const [schedule, setSchedule] = useState([...device.schedules]);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleTimeChange = (event, index) => {
    const updatedSchedules = [...schedule];
    // updatedSchedules[index][0] = event.target.value;
    updatedSchedules[index] = [event.target.value, updatedSchedules[index][1]];
    setSchedule(updatedSchedules);
  };

  const handleDurationChange = (event, index) => {
    const updatedSchedules = [...schedule];
    console.log(updatedSchedules[index][1], event.target.value);
    updatedSchedules[index] = [updatedSchedules[index][0], event.target.value];
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
    onClose();
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
            <Box display="flex" flexDirection="column" rowGap={2}>
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                {device.name}
              </Typography>
              <Box display="flex" flexDirection="column" rowGap={2} mt={1}>
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
                          onChange={(event) =>
                            handleDurationChange(event, index)
                          }
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
              </Box>
              <Button
                sx={{ bgcolor: '#EEF5FF' }}
                onClick={() => {
                  setSchedule((prev) => {
                    return [...prev, ['', '']];
                  });
                }}
              >
                Add new
              </Button>
              <ButtonGroup onClose={onClose} />
            </Box>
          </form>
        </Box>
      </Container>
      <ErrorDialog open={errorMessage} onClose={() => setErrorMessage(false)} />
    </>
  );
}

export default Edit;
