import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  AlertTitle,
  Snackbar,
  InputAdornment,
  Grid
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SuspenseLoader from '../../../components/SuspenseLoader';
import useMutateDeviceById from '../hooks/useMutateDeviceById';

const schema = yup.object().shape({
  lowerThreshold: yup.number().required('Lower threshold is required'),
  upperThreshold: yup
    .number()
    .required('Upper threshold is required')
    .moreThan(
      yup.ref('lowerThreshold'),
      'Upper threshold must be greater than lower threshold'
    )
});

export default function ChangeThrehold(props) {
  const { open, handleClose, device } = props;
  const { onSaveDataById } = useMutateDeviceById();

  const [isloading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const submitForm = async (data) => {
    onSaveDataById([
      device.id,
      'limit',
      { limit: [Number(data.lowerThreshold), Number(data.upperThreshold)] }
    ]);
    handleClose();
  };

  useEffect(() => {
    reset({
      lowerThreshold: device?.limit[0],
      upperThreshold: device?.limit[1]
    });
  }, [device]);

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ textAlign: 'center', fontWeight: 700, fontSize: '1.3rem' }}
        >
          Change Thresholds
        </DialogTitle>
        <form onSubmit={handleSubmit(submitForm)}>
          <DialogContent
            sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Controller
                  name="lowerThreshold"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="lowerThreshold"
                      type="number"
                      label="Lower threshold"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputProps={{
                        inputProps: { min: 0 }
                      }}
                      helperText={errors.lowerThreshold?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="upperThreshold"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="upperThreshold"
                      type="number"
                      label="Upper threshold"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputProps={{
                        inputProps: { min: 0 }
                      }}
                      helperText={errors.upperThreshold?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          {isloading ? (
            <SuspenseLoader />
          ) : (
            <DialogActions>
              <Button variant="contained" type="submit" sx={{ width: 80 }}>
                Save
              </Button>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{ backgroundColor: 'grey.500', width: 80 }}
              >
                Cancel
              </Button>
            </DialogActions>
          )}
        </form>

        {/* <Snackbar
          open={errorMessage.deviceName}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseError}
        >
          <Alert
            open={errorMessage.deviceName}
            severity="error"
            sx={{ width: 300 }}
          >
            <AlertTitle>Device name already in use !</AlertTitle>
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorMessage.feedID}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseError}
        >
          <Alert
            open={errorMessage.feedID}
            severity="error"
            sx={{ width: 300 }}
          >
            <AlertTitle>Feed ID is duplicated!</AlertTitle>
          </Alert>
        </Snackbar> */}
      </Dialog>
    </>
  );
}
