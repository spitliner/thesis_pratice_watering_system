import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  AlertTitle,
  Snackbar
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import SelectInput from '../../../components/SelectInput';
import useCheckAndSave from '../hooks/useCheckAndSave';
import { deviceTypeOption } from '../../../constants/device';

export default function CreateForm(props) {
  const { open, handleClose, defaultDevice } = props;
  const { onCheckAndSave } = useCheckAndSave();
  const [errorMessage, setErrorMessage] = useState({
    api: false,
    name: false
  });
  const form = useForm();
  const { register, handleSubmit, control } = form;

  const submitForm = (data) => {
    onCheckAndSave(data);
    setTimeout(() => {
      const deviceNameError = localStorage.getItem('deviceNameError');
      const apiError = localStorage.getItem('apiKeyError');
      if (deviceNameError === null && apiError === null) handleClose();
      else {
        setErrorMessage({
          api: apiError !== null,
          name: deviceNameError !== null
        });
      }
    }, 1000);
  };

  const handleCloseError = () => {
    setErrorMessage({ api: false, name: false });
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ textAlign: 'center', fontWeight: 700, fontSize: '1.3rem' }}
        >
          Add new device
        </DialogTitle>
        <form onSubmit={handleSubmit(submitForm)}>
          <DialogContent
            sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              id="feedID"
              name="feedID"
              size="small"
              fullWidth
              label="Feed ID"
              {...register('feedID')}
              control
              required
            />
            <TextField
              id="name"
              name="name"
              size="small"
              fullWidth
              label="Name"
              {...register('name')}
              control
              required
            />
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <SelectInput
                  id="type"
                  label="Device type"
                  fullWidth
                  options={deviceTypeOption}
                  {...field}
                  required
                />
              )}
              defaultValue={defaultDevice}
              required
            />
            <TextField
              id="adaUsername"
              name="adaUsername"
              size="small"
              fullWidth
              label="Adafruit user name"
              {...register('adaUsername')}
              control
              required
            />
            <TextField
              id="apiKey"
              name="apiKey"
              size="small"
              fullWidth
              label="Adafruit key"
              {...register('apiKey')}
              control
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>

        <Snackbar
          open={errorMessage.name}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseError}
        >
          <Alert open={errorMessage.name} severity="error" sx={{ width: 300 }}>
            <AlertTitle>Device ID already in use !</AlertTitle>
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorMessage.api}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseError}
        >
          <Alert open={errorMessage.api} severity="error" sx={{ width: 300 }}>
            <AlertTitle>Feed ID is duplicated!</AlertTitle>
          </Alert>
        </Snackbar>
      </Dialog>
    </>
  );
}
